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

import "../shared-styles.js";

/**
* @polymer
* @extends HTMLElement
*/
class GaugeSeaWave extends PolymerElement {
  static get template() {
    return html `
    <style include="shared-styles">
      .title {
        color: #ffffff;
      }
      .title2 {
        color: #ffffff;
        margin-top:-7px;
        margin-bottom:7px;
      }
      .silver {
        color: #ccc;
      }
    </style>
    <div class="text-center paper-font-subhead title">Višina vala</div>
    <canvas id="gaugeWave" style="height:50px;width:250px"></canvas>
    <canvas id="gaugeWave2" style="height:50px;width:250px"></canvas>
    <div class="text-center title2 paper-font-subhead">[[wave]]<span class="silver">m</span> - [[wave2]]<span class="silver">m</span></div>

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
      width: 70,
      height: 100,
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
      needleType: "arrow",
      needleWidth: 8,
      colorNeedleShadowDown: "#222",
      colorNeedleEnd: "#E53935",
      colorNeedle: "#E53935",
      animationDuration: 1500,
      animationRule: "elastic",
      animationTarget: "plate",
      colorMajorTicks: "#f5f5f5",
      colorMinorTicks: "#ddd",
      colorNumbers: "#fff",
      colorBar: "#7986CB",
      barWidth: 25,
      colorBarProgress: "#f5f5f5",
      fontNumbersSize: 42,
      ticksWidth: 50,
      ticksWidthMinor: 15,
      colorPlate: "transparent",
      valueBox: false
    });

    // eslint-disable-next-line no-undef
    var gaugeWave2 = new LinearGauge({
      renderTo: this.$.gaugeWave2,
      width: 70,
      height: 100,
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
      needleType: "arrow",
      needleWidth: 8,
      colorNeedleShadowDown: "#222",
      colorNeedleEnd: "#E53935",
      colorNeedle: "#E53935",
      animationDuration: 1500,
      animationRule: "elastic",
      animationTarget: "plate",
      colorMajorTicks: "#ebebeb",
      colorMinorTicks: "#ebebeb",
      colorNumbers: "#fff",
      colorBar: "#7986CB",
      barWidth: 25,
      colorBarProgress: "#f5f5f5",
      fontNumbersSize: 42,
      ticksWidth: 50,
      ticksWidthMinor: 15,
      colorPlate: "transparent",
      valueBox: false
    });

    gaugeWave.draw();

    gaugeWave2.draw();
  }
}

window.customElements.define("gauge-sea-wave", GaugeSeaWave);
