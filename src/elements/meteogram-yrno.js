/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';

import '@polymer/paper-styles/typography.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import firebase from 'firebase/app';
import 'firebase/database';

//import * as Highcharts from 'highcharts'
//import * as HighchartsMore from 'highcharts/highcharts-more.src.js'

class MeteogramYrno extends PolymerElement {
  static get template() {
    return html `
      <style include="paper-material-styles">
        :host {
          display: block;
          padding:10px 10px 0 10px;
        }
        #meteogram {
          height:310px
        }
      </style>
      <div id="meteogram" class="paper-material" elevation="1"></div>
    `;
  }

  static get properties() {
    return {
      meteograms: {
        type: Object,
        notify: true
      },
      full: {
        type: Boolean
      }
    };
  }

  static get observers() {
    return [
      'Meteogram(meteograms.meta.lastupdate)',
    ];
  }

  ready() {
    super.ready();

  }

  constructor() {
    super();

    const highchartsjs = document.createElement('script');
    highchartsjs.setAttribute('src', 'https://cdn.jsdelivr.net/npm/highstock-release@6.0.4/highstock.min.js');
    document.head.appendChild(highchartsjs);

    var databaseRef = firebase.database().ref();
    var meteoRef = databaseRef.child("/meteogram/portoroz");

    meteoRef.on('value', function(met) {
      this.meteograms = met.val();

    }.bind(this));

  }



    Meteogram() {
      // Parallel arrays for the chart data, these are populated as the XML/JSON file
      // is loaded
      this.symbols = [];
      this.symbolNames = [];
      this.precipitations = [];
      this.windDirections = [];
      this.windDirectionNames = [];
      this.windSpeeds = [];
      this.windSpeedNames = [];
      this.temperatures = [];
      this.pressures = [];

      // Initialize
      this.xml = this.meteograms;
      this.meteogram = this.$.meteogram;

      // Run
      this.parseYrData();
    }

    /**
     * Return weather symbol sprites as laid out at http://om.yr.no/forklaring/symbol/
     */
    getSymbolSprites(symbolSize) {
      return {
        "01d": {
          x: 'clear',
          y: 'prazna'
        },
        "01n": {
          x: 'clear_n',
          y: 'prazna'
        },
        "02d": {
          x: 'mostClear',
          y: 'prazna'
        },
        "02n": {
          x: 'mostClear_n',
          y: 'prazna'
        },
        "03d": {
          x: 'modCloudy',
          y: 'prazna'
        },
        "03n": {
          x: 'modCloudy_n',
          y: 'prazna'
        },
        "04": {
          x: 'overcast',
          y: 'prazna'
        },
        "40d": {
          x: 'clear',
          y: 'lightDZ'
        },
        "40n": {
          x: 'clear_n',
          y: 'lightDZ'
        },
        "05d": {
          x: 'mostClear',
          y: 'lightRA'
        },
        "05n": {
          x: 'mostClear_n',
          y: 'lightRA'
        },

        "41d": {
          x: 'modCloudy',
          y: 'lightSHRA'
        },

        "41n": {
          x: 'modCloudy_n',
          y: 'lightSHRA'
        },

        "24d": {
          x: 'clear',
          y: 'TS'
        },
        "24n": {
          x: 'clear_n',
          y: 'TS'
        },

        "06d": {
          x: 'clear',
          y: 'modTSGR'
        },
        "06n": {
          x: 'clear_n',
          y: 'modTSGR'
        },

        "25d": {
          x: 'clear',
          y: 'modTSRA'
        },
        "25n": {
          x: 'clear_n',
          y: 'modTSRA'
        },

        "46": {
          x: 'prazna',
          y: 'lightDZ'
        },

        "09": {
          x: 'prazna',
          y: 'lightRA'
        },

        "10": {
          x: 'prazna',
          y: 'lightSHRA'
        },


        "30": {
          x: 'prazna',
          y: 'TS'
        },

        "22": {
          x: 'prazna',
          y: 'modTSGR'
        },

        "11": {
          x: 'prazna',
          y: 'modTSRA'
        },

        "12": {
          x: 'prazna',
          y: 'RASN'
        },

        "47": {
          x: 'prazna',
          y: 'modRASN'
        },

        "13": {
          x: 'prazna',
          y: 'SN'
        },

        "50": {
          x: 'prazna',
          y: 'TSSN'
        },

        "49": {
          x: 'prazna',
          y: 'lightSN'
        },

        "15": {
          x: 'FG',
          y: 'prazna'
        }

      };
    }


    /**
     * Function to smooth the temperature line. The original data provides only whole degrees,
     * which makes the line graph look jagged. So we apply a running mean on it, but preserve
     * the unaltered value in the tooltip.
     */
    smoothLine(data) {
      var i = data.length,
        sum,
        value;

      while (i--) {
        data[i].value = value = data[i].y; // preserve value for tooltip

        // Set the smoothed value to the average of the closest points, but don't allow
        // it to differ more than 0.5 degrees from the given value
        sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
        data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
      }
    }

    /**
     * Callback function that is called from Highcharts on hovering each point and returns
     * HTML for the tooltip.
     */
    tooltipFormatter(tooltip) {

      // Create the header with reference to the time interval
      var index = tooltip.points[0].point.index,
        ret = '<small>' + Highcharts.dateFormat('%A, %b %e, %H:%M', tooltip.x) + '-' +
        Highcharts.dateFormat('%H:%M', tooltip.points[0].point.to) + '</small><br>';

      // Symbol text
      ret += '<b>' + this.symbolNames[index] + '</b>';

      ret += '<table>';

      // Add all series
      Highcharts.each(tooltip.points, function(point) {
        var series = point.series;
        ret += '<tr><td><span style="color:' + series.color + '">\u25CF</span> ' + series.name +
          ': </td><td style="white-space:nowrap">' + Highcharts.pick(point.point.value, point.y) +
          series.options.tooltip.valueSuffix + '</td></tr>';
      });

      // Add wind
      ret += '<tr><td style="vertical-align: top">\u25CF Wind</td><td style="white-space:nowrap">' + this.windDirectionNames[index] +
        '<br>' + this.windSpeedNames[index] + '<br>' +
        Highcharts.numberFormat(this.windSpeeds[index], 1) + ' m/s (' + Highcharts.numberFormat(this.windSpeeds[index] * 3.6, 1) + ' km/h)</td></tr>';

      // Close
      ret += '</table>';


      return ret;
    }

    /**
     * Draw the weather symbols on top of the temperature series. The symbols are sprites of a single
     * file, defined in the getSymbolSprites function above.
     */
    drawWeatherSymbols(chart) {
      var meteogram = this,
        symbolSprites = this.getSymbolSprites(32);

      for (var i = 0; i < chart.series[0].data.length; i++) {

        var point = chart.series[0].data[i];

        var sprite,
          group;

        var deljenje

        if (screen.width < 480) {
          deljenje = i % 4;
        } else if (screen.width < 770) {
          deljenje = i % 3;
        } else if (screen.width > 769) {
          deljenje = i % 2;
        }
        if (this.full) {
          deljenje = i % 2;
        }

        if (meteogram.resolution > 36e5 || deljenje === 0) {

          sprite = symbolSprites[meteogram.symbols[i]];
          if (sprite) {

            // Create a group element that is positioned and clipped at 30 pixels width and height
            this.group = chart.renderer.g('WeatherSymbols')
              .attr({
                translateX: point.plotX + chart.plotLeft - 12,
                translateY: point.plotY + chart.plotTop - 40,
                zIndex: 5
              })
              .clip(chart.renderer.clipRect(0, 0, 48, 48))
              .add();

            // Position the image inside it at the sprite position
            chart.renderer.image(
                '/images/vreme/' + sprite.x + '.png', 0, 0,
                32,
                32
              )
              .add(this.group);

            // Position the image inside it at the sprite position
            chart.renderer.image(
                '/images/vreme/pojavi/' + sprite.y + '.png', 0, 9,
                32,
                32
              )
              .add(this.group);
          }
        }
      }
    }

    /**
     * Create wind speed symbols for the Beaufort wind scale. The symbols are rotated
     * around the zero centerpoint.
     */
    windArrow(name) {
      var level,
        path;

      // The stem and the arrow head
      path = [
        'M', 0, 7, // base of arrow
        'L', -1.5, 7,
        0, 10,
        1.5, 7,
        0, 7,
        0, -10 // top
      ];

      var array = ['Calm', 'Light air', 'Light breeze', 'Gentle breeze', 'Moderate breeze',
        'Fresh breeze', 'Strong breeze', 'Near gale', 'Gale', 'Strong gale', 'Storm',
        'Violent storm', 'Hurricane'
      ];

      level = array.indexOf(name);

      if (level === 0) {
        path = [];
      }

      if (level === 2) {
        path.push('M', 0, -8, 'L', 4, -8); // short line
      } else if (level >= 3) {
        path.push(0, -10, 7, -10); // long line
      }

      if (level === 4) {
        path.push('M', 0, -7, 'L', 4, -7);
      } else if (level >= 5) {
        path.push('M', 0, -7, 'L', 7, -7);
      }

      if (level === 5) {
        path.push('M', 0, -4, 'L', 4, -4);
      } else if (level >= 6) {
        path.push('M', 0, -4, 'L', 7, -4);
      }

      if (level === 7) {
        path.push('M', 0, -1, 'L', 4, -1);
      } else if (level >= 8) {
        path.push('M', 0, -1, 'L', 7, -1);
      }

      return path;
    }

    /**
     * Draw the wind arrows. Each arrow path is generated by the windArrow function above.
     */
    drawWindArrows(chart) {
      var meteogram = this;

      for (var i = 0; i < chart.series[0].data.length; i++) {

        var point = chart.series[0].data[i];

        var sprite, arrow, x, y;

        var deljenje
        var deljenje2

        if (screen.width < 480) {
          deljenje = i % 4;
          deljenje2 = 11;
        } else if (screen.width < 770) {
          deljenje = i % 3;
          deljenje2 = 9;
        } else if (screen.width > 769) {
          deljenje = i % 2;
          deljenje2 = 7;
        }

        if (this.full) {
          deljenje = i % 2;
          deljenje2 = 7;
        }

        if (meteogram.resolution > 36e5 || deljenje === 0) {

          // Draw the wind arrows
          x = point.plotX + chart.plotLeft + deljenje2;
          y = 255;
          if (meteogram.windSpeedNames[i] === 'Calm') {
            arrow = chart.renderer.circle(x, y, 10).attr({
              fill: 'none'
            });
          } else {
            arrow = chart.renderer.path(
              meteogram.windArrow(meteogram.windSpeedNames[i])
            ).attr({
              rotation: parseInt(meteogram.windDirections[i], 10),
              translateX: x, // rotation center
              translateY: y // rotation center
            });
          }
          arrow.attr({
              stroke: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              'stroke-width': 1.5,
              zIndex: 5,
              class: 'myPath'
            })
            .add();

        }
      }
    }

    /**
     * Draw blocks around wind arrows, below the plot area
     */
    drawBlocksForWindArrows(chart) {
      var xAxis = chart.xAxis[0],
        x,
        pos,
        max,
        isLong,
        isLast,
        i;

      for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {

        // Get the X position
        isLast = pos === max + 36e5;
        x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        var deljenje

        // Draw the vertical dividers and ticks
        if (this.resolution > 36e5) {
          isLong = pos % this.resolution === 0;
        } else {
          if (screen.width < 480) {
            deljenje = i % 4;
          } else if (screen.width < 770) {
            deljenje = i % 3;
          } else if (screen.width > 769) {
            deljenje = i % 2;
          }
          if (this.full) {
            deljenje = i % 2;
          }
          isLong = deljenje === 0;
        }
        chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
            'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'
          ])
          .attr({
            'stroke': chart.options.chart.plotBorderColor,
            'stroke-width': 1,
            class: 'myPath'
          })
          .add();
      }
    }

    /**
     * Build and return the Highcharts options structure
     */
    getChartOptions() {
      var meteogram = this;

      return {
        chart: {
          renderTo: this.meteogram,
          marginBottom: 70,
          marginRight: 40,
          marginTop: 50,
          plotBorderWidth: 1,
          style: {
            fontFamily: 'Roboto, sans-serif'
          },
          events: {
            redraw: function() {
              this.Meteogram();
            }.bind(this)
          }
        },

        title: {
          text: null
        },

        credits: {
          text: '',

        },

        tooltip: {
          shared: true,
          useHTML: true,
          formatter: function() {
            return meteogram.tooltipFormatter(this);
          }
        },

        xAxis: [{ // Bottom X axis
          type: 'datetime',
          tickInterval: 2 * 36e5, // two hours
          minorTickInterval: 36e5, // one hour
          tickLength: 0,
          gridLineWidth: 1,
          gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0',
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          offset: 30,
          showLastLabel: true,
          labels: {
            format: '{value:%H}'
          }
        }, { // Top X axis
          linkedTo: 0,
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,
          labels: {
            format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: 'left',
            x: 3,
            y: -5
          },
          opposite: true,
          tickLength: 20,
          gridLineWidth: 1
        }],

        yAxis: [{ // temperature axis
          title: {
            text: null
          },
          labels: {
            format: '{value}°',
            style: {
              fontSize: '10px'
            },
            x: -3
          },
          plotLines: [{ // zero plane
            value: 0,
            color: '#BBBBBB',
            width: 1,
            zIndex: 2
          }],
          // Custom positioner to provide even temperature ticks from top down
          tickPositioner: function() {
            var max = Math.ceil(this.max) + 1,
              pos = max - 12, // start
              ret;

            if (pos < this.min) {
              ret = [];
              while (pos <= max) {
                ret.push(pos += 1);
              }
            } // else return undefined and go auto

            return ret;

          },
          maxPadding: 0.3,
          tickInterval: 1,
          gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0'

        }, { // precipitation axis
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          tickLength: 0

        }, { // Air pressure
          allowDecimals: false,
          title: { // Title on top of axis
            text: 'hPa',
            offset: 0,
            align: 'high',
            rotation: 0,
            style: {
              fontSize: '10px',
              color: '#333'
            },
            textAlign: 'left',
            x: 3
          },
          labels: {
            style: {
              fontSize: '8px',
              color: '#333'
            },
            y: 2,
            x: 3
          },
          gridLineWidth: 0,
          opposite: true,
          showLastLabel: false
        }],

        legend: {
          enabled: false
        },

        plotOptions: {
          series: {
            pointPlacement: 'between'
          }
        },


        series: [{
          name: 'Temperature',
          data: this.temperatures,
          type: 'spline',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true
              }
            }
          },
          tooltip: {
            valueSuffix: '°C'
          },
          zIndex: 1,
          color: '#FF3333',
          negativeColor: '#48AFE8'
        }, {
          name: 'Precipitation',
          data: this.precipitations,
          type: 'column',
          color: '#68CFE8',
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          borderWidth: 0,
          shadow: false,
          dataLabels: {
            enabled: true,
            formatter: function() {
              if (this.y > 0) {
                return this.y;
              }
            },
            style: {
              fontSize: '8px'
            }
          },
          tooltip: {
            valueSuffix: 'mm'
          }
        }, {
          name: 'Air pressure',
          color: '#333',
          data: this.pressures,
          marker: {
            enabled: false
          },
          shadow: false,
          tooltip: {
            valueSuffix: ' hPa'
          },
          dashStyle: 'shortdot',
          yAxis: 2
        }]
      }
    }

    /**
     * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
     */
    onChartLoad(chart) {

      this.drawWeatherSymbols(chart);
      this.drawWindArrows(chart);
      this.drawBlocksForWindArrows(chart);

    }

    /**
     * Create the chart. This function is called async when the data file is loaded and parsed.
     */
    createChart() {
      var meteogram = this;
      this.chart = new Highcharts.Chart(this.getChartOptions(), function(chart) {
        meteogram.onChartLoad(chart);
      });
    }

    /**
     * Handle the data. This part of the code is not Highcharts specific, but deals with yr.no's
     * specific data format
     */
    parseYrData() {

      var meteogram = this,
        xml = this.xml,
        pointStart;

      if (!xml || !xml.forecast) {
        return;
      }

      // The returned xml variable is a JavaScript representation of the provided XML,
      // generated on the server by running PHP simple_load_xml and converting it to
      // JavaScript by json_encode.
      for (var i = 0; i < xml.forecast.tabular.time.length; i++) {

        var time = xml.forecast.tabular.time[i];

        // Get the times - only Safari can't parse ISO8601 so we need to do some replacements
        var from = time['@attributes'].from + ' UTC',
          to = time['@attributes'].to + ' UTC';

        from = from.replace(/-/g, '/').replace('T', ' ');
        from = Date.parse(from);
        to = to.replace(/-/g, '/').replace('T', ' ');
        to = Date.parse(to);

        if (to > pointStart + 4 * 24 * 36e5) {
          return;
        }

        // If it is more than an hour between points, show all symbols
        if (i === 0) {
          meteogram.resolution = to - from;
        }

        // Populate the parallel arrays
        meteogram.symbols.push(time.symbol['@attributes']['var'].match(/[0-9]{2}[dnm]?/)[0]);
        meteogram.symbolNames.push(time.symbol['@attributes'].name);

        meteogram.temperatures.push({
          x: from,
          y: parseInt(time.temperature['@attributes'].value),
          // custom options used in the tooltip formatter
          to: to,
          index: i
        });

        meteogram.precipitations.push({
          x: from,
          y: parseFloat(time.precipitation['@attributes'].value)
        });
        meteogram.windDirections.push(parseFloat(time.windDirection['@attributes'].deg));
        meteogram.windDirectionNames.push(time.windDirection['@attributes'].name);
        meteogram.windSpeeds.push(parseFloat(time.windSpeed['@attributes'].mps));
        meteogram.windSpeedNames.push(time.windSpeed['@attributes'].name);

        meteogram.pressures.push({
          x: from,
          y: parseFloat(time.pressure['@attributes'].value)
        });

        if (i == 0) {
          pointStart = (from + to) / 2;
        }
      }

      // Smooth the line
      this.smoothLine(this.temperatures);

      // Create the chart when the data is loaded
      this.createChart();
    }
    //var xml = this.meteograms
    //var meteogram = new Meteogram(xml, this.$.meteogram);



}

window.customElements.define('meteogram-yrno', MeteogramYrno);
