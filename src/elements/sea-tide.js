/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";

/*global Highcharts*/
import 'highcharts/highstock';

/**
* @polymer
* @extends HTMLElement
*/
class SeaTide extends PolymerElement {
  static get template() {
    return html`
      <div id="graf" style="width:100%;max-width:1070px;height:400px"></div>
    `;
  }

  plim() {

    var d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    var prev = Date.parse(d) - 3600000;
    var next = prev + 172800000;

    var starter = prev - 86400000;
    var ender;
    if (screen.width < 770) {
      ender = prev + 1209600000;
    } else if (screen.width > 769) {
      ender = prev + 2592000000;
    }

    var start = starter / 100000;
    var end = ender / 100000;
    var starting = starter - 3600000;

    var request2 = new XMLHttpRequest();

    var request = new XMLHttpRequest();

    request2.open('GET', 'https://bazdara-99a47.firebaseio.com/trenutno/vodostaj.json', true);
    request2.send();


    request.onreadystatechange = function() {

      if (request.readyState == 4 && request.status == 200) {
        // Success!
        var data = JSON.parse(request.response);

        var mystring = request2.response;
        mystring = mystring.replace('"', '');
        mystring = mystring.replace('"', '');

        var datas = [];
        var datas2 = [];

        Object.keys(data).forEach(function(key) {
          datas.push(data[key].h + 10);
        });

        datas2.push(Number(mystring));

        Date.prototype.addHours = function(h) {
          this.setHours(this.getHours() + h);
          return this;
        };

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
              load: function() {
                //setTimeout(function() {
                this.xAxis[0].setExtremes(prev, next);
                //}.bind(this), 1);
              },
            },
          },

          rangeSelector: {

            buttons: [{
              type: '',
              count: 1,
              text: '48h'
            }],
            selected: 0
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
                    fontSize: '12px'
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
                    fontSize: '12px'
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
              afterSetExtremes: function(e) {
                if (e.trigger == "rangeSelectorButton" &&
                  e.rangeSelectorButton.text == "48h") {

                  // it is your button that caused this,
                  // so setExtrememes to your custom
                  // have to do in timeout to let
                  // highcharts finish processing events...
                  setTimeout(function() {
                    var chart = this;
                    chart.xAxis[0].setExtremes(prev, next);
                  }, 1);

                }
              },
            },
            plotLines: [{
              value: (new Date().addHours(2)),
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
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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
              pointStart: new Date().getTime() + 120 * 60 * 1000,
              data: datas2,
              marker: {
                radius: 5
              },
              tooltip: {
                pointFormatter: function() {
                  var point = this;
                  return 'Zdaj: <b>' + point.y + '</b> cm' + '<br/> Trenutna vrednost iz<br>mareografske postaje Koper';
                }
              }

            }

          ]

        });

      }
    }.bind(this);

    request.open('GET', 'https://bazdara-99a47.firebaseio.com/plimovanje/koper.json?orderBy=%22$key%22&startAt=%22' + start + '%22&endAt=%22' + end + '%22', true);
    request.send();

  }

  ready() {
    super.ready();

    this.plim();


    //setInterval(function() {
    //  this.plim();
    //}.bind(this), 5 * 60 * 1000);

  }
}

window.customElements.define("sea-tide", SeaTide);
