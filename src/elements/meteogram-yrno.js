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
} from "@polymer/polymer/polymer-element.js";

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";

import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";
import {afterNextRender} from "@polymer/polymer/lib/utils/render-status.js";

import firebase from "firebase/app";
import "firebase/database";

/*global Highcharts*/
import 'highcharts/highstock';

import "../shared-styles.js";

/**
 * @polymer
 * @extends HTMLElement
 */
class MeteogramYrno extends PolymerElement {
  static get template() {
    return html `
      <style include="paper-material-styles shared-styles">
        :host {
          display: block;
        }
        paper-dropdown-menu {
          z-index:2;
        }
        .over {
          overflow-x: scroll;
          padding:10px 10px 5px 10px;
        }
        .outer {
          width:830px;
          height:280px;
        }
        #meteogram {
          height:280px !important;
          width: 820px !important;
          background-color: var(--primary-background-color);
        }

        .selector {
          margin:10px 10px 0px 10px;
          padding: 0 10px;
          background-color: var(--primary-background-color);
        }
        .highcharts-container {
          height:280px !important;
          width: 820px !important;
        }
        paper-dropdown-menu {
          width: 100%;
          z-index:1
        }
        paper-item {
        --paper-item-selected: {
            background-color: var(--light-primary-color);
        };

        --paper-item-focused: {
            background-color: var(--light-primary-color);
        };

        --paper-item-focused-before: {
            background-color: var(--light-primary-color);
        };
       }
      </style>
      <app-localstorage-document key="[[town]]" data="{{meteograms}}"></app-localstorage-document>

      <div class="paper-material selector" elevation="1">
      <paper-dropdown-menu label="Vremenska napoved">
        <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="id" selected="{{townname}}">
          <paper-item class="cont" id="Piran" on-tap="onTabSelect">
            Piran
          </paper-item>
          <paper-item class="cont" id="Portorož" on-tap="onTabSelect">
            Portorož
          </paper-item>
          <paper-item class="cont" id="Izola" on-tap="onTabSelect">
            Izola
          </paper-item>
          <paper-item class="cont" id="Koper" on-tap="onTabSelect">
            Koper
          </paper-item>
          <paper-item class="cont" id="Trst" on-tap="onTabSelect">
            Trst
          </paper-item>
          <paper-item class="cont" id="Umag" on-tap="onTabSelect">
            Umag
          </paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      </div>
      <div class="over">
      <div class="outer">
      <div id="meteogram" class="paper-material" style="height:280px;" elevation="1"></div>
      </div>
      </div>
    `;
  }

  static get properties() {
    return {
      meteograms: {
        type: Object,
        notify: true,
        observer: "Meteogram"
      },
      full: {
        type: Boolean
      },
      lat: {
        type: Number,
        value: 45.5283129
      },
      lng: {
        observer: "location",
        type: Number,
        value: 13.5659228
      },
      theme: {
        type: Boolean,
        observer: "_themer",
      },
      redraw: {
        type: String
      },
    };
  }

  static get observers() {
    return ["_redraw(select, redraw)"];
  }

  _themer () {
    if (this.thm) {
      this.Meteogram();
    }
    this.thm = true;
  }

  _redraw() {

    afterNextRender(this, function() {
    if (this.select === 0) {
      if (this.sel) {
        setTimeout(
          function () {
            this.Meteogram();
          }.bind(this),20);
      }
      this.sel = true;
    }
    });
  }

  _speed(value, speed) {
    var multiplier = Math.pow(10, 1 || 0);
    var value2;
    if (speed == "kmh") {
      value2 = value * 3.6;
      return Math.round(value2 * multiplier) / multiplier;
    } else if (speed == "kn") {
      value2 = value * 1.94384449;
      return Math.round(value2 * multiplier) / multiplier;
    } else {
      return value;
    }
  }

  _speedName(speed) {
    if (speed == "kmh") {
      return "km/h";
    } else if (speed == "kn") {
      return "knots";
    } else {
      return "m/s";
    }
  }

  ready() {
    super.ready();
  }

  constructor() {
    super();

    //const highchartsjs = document.createElement("script");
    //highchartsjs.setAttribute(
    //  "src",
    //  "https://cdn.jsdelivr.net/npm/highstock-release@6.0.4/highstock.min.js"
    //);
    //document.head.appendChild(highchartsjs);

    this.databaseRef = firebase.database().ref();

    //this.location();
  }

  onTabSelect(e) {
    var button = e.target;
    this.townname = button.id;

    this.location(true);
  }

  location(e) {
    if (e) {
      if (this.townname == "Piran") {
        this.lat = "45.528666";
        this.lng = "13.568362";
      } else if (this.townname == "Portorož") {
        this.lat = "45.512827";
        this.lng = "13.5933043";
      } else if (this.townname == "Izola") {
        this.lat = "45.533596";
        this.lng = "13.651651";
      } else if (this.townname == "Koper") {
        this.lat = "45.525243";
        this.lng = "13.582448";
      } else if (this.townname == "Trst") {
        this.lat = "45.692709";
        this.lng = "13.749297";
      } else if (this.townname == "Umag") {
        this.lat = "45.435882";
        this.lng = "13.523732";
      }
    }

    this.town = this.NearestCity(this.lat, this.lng, 0);
    this.townname = this.NearestCity(this.lat, this.lng, 3);

    var meteoRef = this.databaseRef.child("/meteogram/" + this.town);

    meteoRef.on(
      "value",
      function (met) {
        this.meteograms = met.val();
      }.bind(this)
    );
  }

  Deg2Rad(deg) {
    return (deg * Math.PI) / 180;
  }

  PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = this.Deg2Rad(lat1);
    lat2 = this.Deg2Rad(lat2);
    lon1 = this.Deg2Rad(lon1);
    lon2 = this.Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  NearestCity(latitude, longitude, cdn) {
    var mindif = 99999;
    var closest;
    var index;

    if (latitude == null) {
      latitude = 46.0569;
      longitude = 14.5058;
    }

    var cities = [
      ["portoroz", 0, 0, "Piran"],
      ["portoroz", 46.0569, 14.5058, "Piran"],
      ["portoroz", 45.524841, 13.567059, "Piran"],
      ["portoroz", 45.512827, 13.5933043, "Portorož"],
      ["portoroz", 45.473511, 13.6139783, "Portorož"],
      ["izola", 45.533596, 13.651651, "Izola"],
      ["koper", 45.546729, 13.693094, "Koper"],
      ["umag", 45.435882, 13.523732, "Umag"],
      ["trst", 45.692709, 13.749297, "Trst"]
    ];

    for (index = 0; index < cities.length; ++index) {
      var dif = this.PythagorasEquirectangular(
        latitude,
        longitude,
        cities[index][1],
        cities[index][2]
      );
      if (dif < mindif) {
        closest = index;
        mindif = dif;
      }
    }

    // echo the nearest city
    return cities[closest][cdn];
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
  getSymbolSprites() {
    return {
      "01d": {
        x: "clear",
        y: "prazna"
      },
      "01n": {
        x: "clear_n",
        y: "prazna"
      },
      "02d": {
        x: "mostClear",
        y: "prazna"
      },
      "02n": {
        x: "mostClear_n",
        y: "prazna"
      },
      "03d": {
        x: "modCloudy",
        y: "prazna"
      },
      "03n": {
        x: "modCloudy_n",
        y: "prazna"
      },
      "04": {
        x: "overcast",
        y: "prazna"
      },
      "40d": {
        x: "clear",
        y: "lightDZ"
      },
      "40n": {
        x: "clear_n",
        y: "lightDZ"
      },
      "05d": {
        x: "mostClear",
        y: "lightRA"
      },
      "05n": {
        x: "mostClear_n",
        y: "lightRA"
      },

      "41d": {
        x: "modCloudy",
        y: "lightSHRA"
      },

      "41n": {
        x: "modCloudy_n",
        y: "lightSHRA"
      },

      "24d": {
        x: "clear",
        y: "TS"
      },
      "24n": {
        x: "clear_n",
        y: "TS"
      },

      "06d": {
        x: "clear",
        y: "modTSGR"
      },
      "06n": {
        x: "clear_n",
        y: "modTSGR"
      },

      "25d": {
        x: "clear",
        y: "modTSRA"
      },
      "25n": {
        x: "clear_n",
        y: "modTSRA"
      },

      "46": {
        x: "prazna",
        y: "lightDZ"
      },

      "09": {
        x: "prazna",
        y: "lightRA"
      },

      "10": {
        x: "prazna",
        y: "lightSHRA"
      },

      "30": {
        x: "prazna",
        y: "TS"
      },

      "22": {
        x: "prazna",
        y: "modTSGR"
      },

      "11": {
        x: "prazna",
        y: "modTSRA"
      },

      "12": {
        x: "prazna",
        y: "RASN"
      },

      "47": {
        x: "prazna",
        y: "modRASN"
      },

      "13": {
        x: "prazna",
        y: "SN"
      },

      "50": {
        x: "prazna",
        y: "TSSN"
      },

      "49": {
        x: "prazna",
        y: "lightSN"
      },

      "15": {
        x: "FG",
        y: "prazna"
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
      ret =
      "<small>" +
      Highcharts.dateFormat("%A, %b %e, %H:%M", tooltip.x) +
      "-" +
      Highcharts.dateFormat("%H:%M", tooltip.points[0].point.to) +
      "</small><br>";

    // Symbol text
    ret += "<b>" + this.symbolNames[index] + "</b>";

    ret += "<table>";

    // Add all series
    Highcharts.each(tooltip.points, function (point) {
      var series = point.series;
      ret +=
        '<tr><td><span style="color:' +
        series.color +
        '">\u25CF</span> ' +
        series.name +
        ': </td><td style="white-space:nowrap">' +
        Highcharts.pick(point.point.value, point.y) +
        series.options.tooltip.valueSuffix +
        "</td></tr>";
    });

    // Add wind
    ret +=
      '<tr><td style="vertical-align: top">\u25CF Wind</td><td style="white-space:nowrap">' +
      this.windDirectionNames[index] +
      "<br>" +
      this.windSpeedNames[index] +
      "<br>" +
      Highcharts.numberFormat(this._speed(this.windSpeeds[index], this.speedunit), 1) + " " +
      this._speedName(this.speedunit) +
      "</td></tr>";

    // Close
    ret += "</table>";

    return ret;
  }

  /**
   * Draw the weather symbols on top of the temperature series. The symbols are sprites of a single
   * file, defined in the getSymbolSprites function above.
   */
  drawWeatherSymbols(chart) {
    var meteogram = this,
      symbolSprites = this.getSymbolSprites();

    for (var i = 0; i < chart.series[0].data.length; i++) {
      var point = chart.series[0].data[i];

      var sprite, group;

      var deljenje;

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
          group = chart.renderer
            .g("WeatherSymbols")
            .attr({
              translateX: point.plotX + chart.plotLeft - 12,
              translateY: point.plotY + chart.plotTop - 40,
              zIndex: 5
            })
            .clip(chart.renderer.clipRect(0, 0, 48, 48))
            .add();

          // Position the image inside it at the sprite position
          chart.renderer
            .image(
              "images/vreme/" + sprite.x + ".png",
              0,
              0,
              32,
              32
            )
            .add(group);

          // Position the image inside it at the sprite position
          chart.renderer
            .image(
              "images/vreme/pojavi/" + sprite.y + ".png",
              0,
              9,
              32,
              32
            )
            .add(group);
        }
      }
    }
  }

  /**
   * Create wind speed symbols for the Beaufort wind scale. The symbols are rotated
   * around the zero centerpoint.
   */
  windArrow(name) {
    var level, path;

    // The stem and the arrow head
    path = [
      "M",
      0,
      7, // base of arrow
      "L",
      -1.5,
      7,
      0,
      10,
      1.5,
      7,
      0,
      7,
      0,
      -10 // top
    ];

    var array = [
      "Calm",
      "Light air",
      "Light breeze",
      "Gentle breeze",
      "Moderate breeze",
      "Fresh breeze",
      "Strong breeze",
      "Near gale",
      "Gale",
      "Strong gale",
      "Storm",
      "Violent storm",
      "Hurricane"
    ];

    level = array.indexOf(name);

    if (level === 0) {
      path = [];
    }

    if (level === 2) {
      path.push("M", 0, -8, "L", 4, -8); // short line
    } else if (level >= 3) {
      path.push(0, -10, 7, -10); // long line
    }

    if (level === 4) {
      path.push("M", 0, -7, "L", 4, -7);
    } else if (level >= 5) {
      path.push("M", 0, -7, "L", 7, -7);
    }

    if (level === 5) {
      path.push("M", 0, -4, "L", 4, -4);
    } else if (level >= 6) {
      path.push("M", 0, -4, "L", 7, -4);
    }

    if (level === 7) {
      path.push("M", 0, -1, "L", 4, -1);
    } else if (level >= 8) {
      path.push("M", 0, -1, "L", 7, -1);
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

      var arrow, x, y;

      var deljenje;
      var deljenje2;

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
        y = 235;
        if (meteogram.windSpeedNames[i] === "Calm") {
          arrow = chart.renderer.circle(x, y, 10).attr({
            fill: "none"
          });
        } else {
          arrow = chart.renderer
            .path(meteogram.windArrow(meteogram.windSpeedNames[i]))
            .attr({
              rotation: parseInt(meteogram.windDirections[i], 10),
              translateX: x, // rotation center
              translateY: y // rotation center
            });
        }
        arrow
          .attr({
            stroke: Highcharts.getOptions().colors[1],
            "stroke-width": 1.5,
            zIndex: 5,
            class: "myPath"
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

    for (
      pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1
    ) {
      // Get the X position
      isLast = pos === max + 36e5;
      x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

      var deljenje;

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
      chart.renderer
        .path([
          "M",
          x,
          chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
          "L",
          x,
          chart.plotTop + chart.plotHeight + 32,
          "Z"
        ])
        .attr({
          stroke: chart.options.chart.plotBorderColor,
          "stroke-width": 1,
          class: "myPath"
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
        marginBottom: 60,
        marginRight: 25,
        marginTop: 30,
        reflow: true,
        style: {
          fontFamily: "Roboto, sans-serif"
        },
        events: {
          redraw: function () {
            this.Meteogram();
          }.bind(this)
        }
      },

      title: {
        text: null
      },

      credits: {
        text: ""
      },

      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          return meteogram.tooltipFormatter(this);
        }
      },

      xAxis: [{
          // Bottom X axis
          type: "datetime",
          tickInterval: 2 * 36e5, // two hours
          minorTickInterval: 36e5, // one hour
          tickLength: 0,
          gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0',
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          offset: 30,
          showLastLabel: true,
          labels: {
            format: "{value:%H}"
          }
        },
        {
          // Top X axis
          linkedTo: 0,
          type: "datetime",
          tickInterval: 24 * 3600 * 1000,
          labels: {
            format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: "left",
            x: 5,
            y: -5
          },
          opposite: true,
        }
      ],

      yAxis: [{
          // temperature axis
          title: {
            text: null
          },
          labels: {
            format: "{value}°",
            style: {
              fontSize: "10px"
            },
            x: -3
          },
          // Custom positioner to provide even temperature ticks from top down
          tickPositioner: function () {
            var max = Math.ceil(this.max) + 1,
              pos = max - 12, // start
              ret;

            if (pos < this.min) {
              ret = [];
              while (pos <= max) {
                ret.push((pos += 1));
              }
            } // else return undefined and go auto

            return ret;
          },
          maxPadding: 0.3,
          tickInterval: 1,
          gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0'
        },
        {
          // precipitation axis
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          tickLength: 0
        },
        {
          // Air pressure
          allowDecimals: false,
          title: {
            // Title on top of axis
            text: "hPa",
            offset: 0,
            align: "high",
            rotation: 0,
            style: {
              fontSize: "10px",
              color: "#80CBC4"
            },
            textAlign: "left",
            x: 3
          },
          labels: {
            style: {
              fontSize: "8px",
              color: "#80CBC4"
            },
            y: 2,
            x: 3
          },
          gridLineWidth: 0,
          opposite: true,
          showLastLabel: false
        }
      ],

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          pointPlacement: "between"
        }
      },

      series: [{
          name: "Temperature",
          data: this.temperatures,
          type: "spline",
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true
              }
            }
          },
          tooltip: {
            valueSuffix: "°C"
          },
          zIndex: 1,
          color: "#E57373",
          negativeColor: "#2196F3"
        },
        {
          name: "Precipitation",
          data: this.precipitations,
          type: "column",
          color: "#64B5F6",
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          borderWidth: 0,
          shadow: false,
          dataLabels: {
            enabled: true,
            formatter: function () {
              if (this.y > 0) {
                return this.y;
              }
            },
            style: {
              fontSize: "8px"
            }
          },
          tooltip: {
            valueSuffix: "mm"
          }
        },
        {
          name: "Air pressure",
          color: "#80CBC4",
          data: this.pressures,
          marker: {
            enabled: false
          },
          shadow: false,
          tooltip: {
            valueSuffix: " hPa"
          },
          dashStyle: "shortdot",
          yAxis: 2
        }
      ]
    };
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

    if (this.theme) {
      Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
          '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        chart: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          plotShadow: false,
          plotBorderColor: '#606063'
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
          }
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#333333',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#333333',
          minorGridLineColor: '#444444',
          tickColor: '#333333',
          title: {
            style: {
              color: '#A0A0A3'

            }
          }
        },
        yAxis: {
          gridLineColor: '#333333',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#333333',
          minorGridLineColor: '#444444',
          tickColor: '#333333',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: '#B0B0B3'
            },
            marker: {
              lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#444444'
          },
          candlestick: {
            lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
        },
        legend: {
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        credits: {
          style: {
            color: '#666'
          }
        },
        labels: {
          style: {
            color: '#333333'
          }
        },

        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3'
          },
          activeDataLabelStyle: {
            color: '#F0F0F3'
          }
        },

        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: '#444444',
            stroke: '#000000',
            style: {
              color: '#CCC'
            },
            states: {
              hover: {
                fill: '#333333',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              }
            }
          },
          inputBoxBorderColor: '#444444',
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
          },
          labelStyle: {
            color: 'silver'
          }
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
          },
          xAxis: {
            gridLineColor: '#444444'
          }
        },

        scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#444444',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
      };

      Highcharts.setOptions(Highcharts.theme);
    } else {
      Highcharts.theme = {
        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970',
          '#f28f43', '#77a1e5', '#c42525', '#a6c96a'
        ],
        chart: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          plotShadow: false,
          plotBorderWidth: 0,
          plotBorderColor: '#cccccc'
        },
        title: {
          style: {
            color: '#274b6d', //#3E576F',
          }
        },
        subtitle: {
          style: {
            color: '#4d759e'
          }
        },
        xAxis: {
          gridLineWidth: 0,
          lineColor: '#C0D0E0',
          tickColor: '#C0D0E0',
          minorGridLineColor: '#cccccc',
          labels: {
            style: {
              color: '#666',
              cursor: 'default',
              lineHeight: '14px'
            }
          },
          title: {
            style: {
              color: '#4d759e',
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          gridLineColor: '#cccccc',
          minorTickInterval: null,
          lineColor: '#C0D0E0',
          lineWidth: 1,
          tickWidth: 1,
          tickColor: '#C0D0E0',
          labels: {
            style: {
              color: '#666',
              cursor: 'default',
              lineHeight: '14px'
            }
          },
          title: {
            style: {
              color: '#4d759e',
              fontWeight: 'bold'
            }
          }
        },
        legend: {
          itemStyle: {
            color: '#274b6d',
          },
          itemHoverStyle: {
            color: '#000'
          },
          itemHiddenStyle: {
            color: '#CCC'
          }
        },
        labels: {
          style: {
            color: '#3E576F'
          }
        }

      };

      Highcharts.setOptions(Highcharts.theme);
    }


    this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
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
      var from = time["@attributes"].from + " UTC",
        to = time["@attributes"].to + " UTC";

      from = from.replace(/-/g, "/").replace("T", " ");
      from = Date.parse(from);
      to = to.replace(/-/g, "/").replace("T", " ");
      to = Date.parse(to);

      if (to > pointStart + 4 * 24 * 36e5) {
        return;
      }

      // If it is more than an hour between points, show all symbols
      if (i === 0) {
        meteogram.resolution = to - from;
      }

      // Populate the parallel arrays
      meteogram.symbols.push(
        time.symbol["@attributes"]["var"].match(/[0-9]{2}[dnm]?/)[0]
      );
      meteogram.symbolNames.push(time.symbol["@attributes"].name);

      meteogram.temperatures.push({
        x: from,
        y: parseInt(time.temperature["@attributes"].value),
        // custom options used in the tooltip formatter
        to: to,
        index: i
      });

      meteogram.precipitations.push({
        x: from,
        y: parseFloat(time.precipitation["@attributes"].value)
      });
      meteogram.windDirections.push(
        parseFloat(time.windDirection["@attributes"].deg)
      );
      meteogram.windDirectionNames.push(time.windDirection["@attributes"].name);
      meteogram.windSpeeds.push(parseFloat(time.windSpeed["@attributes"].mps));
      meteogram.windSpeedNames.push(time.windSpeed["@attributes"].name);

      meteogram.pressures.push({
        x: from,
        y: parseFloat(time.pressure["@attributes"].value)
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
}

window.customElements.define("meteogram-yrno", MeteogramYrno);
