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
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-spinner/paper-spinner.js";
import {
  afterNextRender
} from "@polymer/polymer/lib/utils/render-status.js";


/*global Highcharts*/
import 'highcharts/highstock';

/**
 * @polymer
 * @extends HTMLElement
 */
class SeaTide extends PolymerElement {
  static get template() {
    return html `
    <style>
      paper-spinner {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index:1;
      }
    </style>
    <paper-spinner active$="[[loading]]"></paper-spinner>
    <div id="graf" style="width:100%;max-width:1070px;height:400px"></div>
    `;
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      tide: {
        type: Object,
        observer: "_tide"
      },
      tiden: {
        type: String,
        observer: "_tide"
      },
      redraw: {
        type: String,
        observer: "_redraw"
      },
    };
  }

  _tide() {


    if ((this.tide !== undefined) && (this.tiden !== undefined)) {

      var d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      var prev = Date.parse(d) - 3600000;
      var next = prev + 172800000;
      var starter = prev - 86400000;
      var starting = starter - 3600000;

      // Success!
      var data = this.tide;

      var mystring = this.tiden;
      mystring = mystring.replace('"', '');
      mystring = mystring.replace('"', '');

      var datas = [];
      var datas2 = [];

      Object.keys(data).forEach(function (key) {
        datas.push(data[key].h + 10);
      });

      datas2.push(Number(mystring));

      if (this.theme) {
        Highcharts.theme = {
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

      //this.loading = false;

      var datea = new Date(0);
      var dts = datea.toLocaleString('en-GB', {
        hour: '2-digit',
        hour12: false,
        timeZone: 'Europe/Ljubljana'
      });

      // Create the chart
      new Highcharts.StockChart({
        chart: {
          zoomType: 'x',
          renderTo: this.$.graf,
          type: 'spline',
          style: {
            fontFamily: 'Roboto, sans-serif'
          },
          events: {
            render: function () {
              this.loading = false;
            }.bind(this),
            load: function () {
              //setTimeout(function() {
              this.xAxis[0].setExtremes(prev, next);
              //}.bind(this), 1);
            }
          },
        },

        rangeSelector: {
          buttons: []
        },

        credits: {
          enabled: false,
        },

        exporting: {
          enabled: true
        },

        yAxis: {
          title: null,
          max: 90,
          min: -90,
          tickInterval: 1.0,
          plotLines: [

            {
              color: '#62a8ea',
              width: 1,
              value: 60,
              dashStyle: 'solid',
              label: {
                text: 'Plima',
                style: {
                  fontSize: '12px',
                  color: (Highcharts.theme && Highcharts.theme.textColor)
                }
              },
              zIndex: 5
            }, {
              color: '#46BE8A',
              width: 1,
              value: -60,
              dashStyle: 'solid',
              label: {
                text: 'Oseka',
                style: {
                  fontSize: '12px',
                  color: (Highcharts.theme && Highcharts.theme.textColor)
                }
              },
              zIndex: 5
            },
          ]
        },

        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%e %b',
            week: '%e %b %y',
            month: '%b %y',
            year: '%Y'
          },
          events: {
            afterSetExtremes: function (e) {
              if (e.trigger == "rangeSelectorButton" &&
                e.rangeSelectorButton.text == "48h") {

                // it is your button that caused this,
                // so setExtrememes to your custom
                // have to do in timeout to let
                // highcharts finish processing events...
                var chart = this;
                chart.xAxis[0].setExtremes(prev, next);

              }
            },
          },
          plotLines: [{
            value: (new Date().getTime() + dts * 60 * 1000),
            color: '#F44336',
            width: 1,
            zIndex: 10,
            dashStyle: 'dotted',
          }]

        },

        title: null,

        series: [{
            name: 'Visina',
            type: 'areaspline',
            id: 'dataseries',
            fillColor: {
              linearGradient: {
                x1: 0.7,
                y1: 0.7,
                x2: 0.7,
                y2: 0.7
              },
              stops: [
                [0, "#42A5F5"],
                [1, "#42A5F5"]
              ]
            },
            data: datas,
            pointStart: starting,
            pointInterval: 1800000,
            tooltip: {
              valueDecimals: 1,
              valueSuffix: 'cm'
            }
          },

          {
            type: 'scatter',
            name: 'Koper',
            pointStart: new Date().getTime() + dts * 60 * 1000,
            data: datas2,
            marker: {
              radius: 6
            },
            tooltip: {
              pointFormatter: function () {
                var point = this;
                return 'Zdaj: <b>' + point.y + '</b> cm' + '<br/> Trenutna vrednost iz<br>mareografske postaje Koper';
              }
            }

          }

        ]

      });

    }

  }

  _redraw() {

    afterNextRender(this, function () {
      setTimeout(
        function () {
          this._tide();
        }.bind(this), 20);
    });
  }

}

window.customElements.define("sea-tide", SeaTide);
