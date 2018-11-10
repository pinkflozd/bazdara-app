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

import "canvas-gauges";

/**
* @polymer
* @extends HTMLElement
*/
class GaugeSeaWave extends PolymerElement {
  static get template() {
    return html `
    <canvas id="gaugeWave" style="height:50px;width:250px"></canvas>
    <canvas id="gaugeWave2" style="height:50px;width:250px"></canvas>
  </div>
    `;
  }

  static get properties() {
    return {
      wave: {
        type: Number,
        observer: '_waveChange'
      },
      wave2: {
        type: Number,
        observer: '_wave2Change'
      },
    };
  }

  _waveChange() {
    var gaugeWave = document.gauges.get('gaugeWave');
    gaugeWave.value = this.wave;

  }

  _wave2Change() {
    var gaugeWave2 = document.gauges.get('gaugeWave2');
    gaugeWave2.value = this.wave2;

  }

  _decimalFormat(value) {
    return value ? value.toFixed(1) : '0.0';
  }

  ready() {
    super.ready();

    // eslint-disable-next-line no-undef
    var gaugeWave = new LinearGauge({
      renderTo: this.$.gaugeWave,
      width: 250,
      height: 75,
      minValue: 0,
      maxValue: 2.5,
      majorTicks: [
        0,
        0.5,
        1,
        1.5,
        2,
        2.5
      ],
      minorTicks: 5,
      highlights: [{
          "from": 0,
          "to": 0.5,
          "color": "#64B5F6"
        },
        {
          "from": 0.5,
          "to": 1,
          "color": "#4DB6AC"
        },
        {
          "from": 1,
          "to": 1.5,
          "color": "#FFF176"
        },
        {
          "from": 1.5,
          "to": 2.5,
          "color": "#E57373"
        }
      ],
      strokeTicks: true,
      borderShadowWidth: 0,
      borders: false,
      barBeginCircle: false,
      tickSide: "left",
      numberSide: "left",
      needleSide: "left",
      needleType: "line",
      needleWidth: 3,
      colorNeedle: "#E57373",
      colorNeedleEnd: "#E57373",
      animationDuration: 1500,
      animationRule: "elastic",
      animationTarget: "plate",
      barWidth: 15,
      colorBarProgress: "#E57373",
      fontNumbersSize: 41,
      ticksWidth: 50,
      ticksWidthMinor: 15,
      colorPlate: "transparent"
    });

    // eslint-disable-next-line no-undef
    var gaugeWave2 = new LinearGauge({
      renderTo: this.$.gaugeWave2,
      width: 250,
      height: 50,
      minValue: 0,
      maxValue: 2.5,
      majorTicks: [
        0,
        0.5,
        1,
        1.5,
        2,
        2.5
      ],
      minorTicks: 5,
      highlights: [{
          "from": 0,
          "to": 0.5,
          "color": "#64B5F6"
        },
        {
          "from": 0.5,
          "to": 1,
          "color": "#4DB6AC"
        },
        {
          "from": 1,
          "to": 1.5,
          "color": "#FFF176"
        },
        {
          "from": 1.5,
          "to": 2.5,
          "color": "#E57373"
        }
      ],
      strokeTicks: true,
      borderShadowWidth: 0,
      borders: false,
      barBeginCircle: false,
      tickSide: "right",
      numberSide: "right",
      needleSide: "right",
      needleType: "line",
      needleWidth: 3,
      colorNeedle: "#00897B",
      colorNeedleEnd: "#00897B",
      animationDuration: 1500,
      animationRule: "elastic",
      animationTarget: "plate",
      barWidth: 22,
      colorBarProgress: "#00897B",
      fontNumbersSize: 0,
      ticksWidth: 50,
      ticksWidthMinor: 15,
      colorPlate: "transparent"
    });

    gaugeWave.draw();

    gaugeWave2.draw();
  }
}

window.customElements.define("gauge-sea-wave", GaugeSeaWave);