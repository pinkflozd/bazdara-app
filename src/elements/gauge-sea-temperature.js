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
class GaugeSeaTemperature extends PolymerElement {
  static get template() {
    return html `
    <style include="shared-styles">
      .title {
        color: #ffffff;
        padding-top:10px;
      }
      .title2 {
        color: #ffffff;
        margin-top:-7px;
        padding-bottom:10px;
      }
      .silver {
        color: #ccc;
      }
    </style>
    <div class="text-center paper-font-subhead title">Temperatura morja</div>
    <div style="width:260px;margin-left: auto; margin-right: auto;">
    <canvas id="gaugeSeaTemp" style="height:100px;width:300px"></canvas>
    </div>
    <div class="text-center title2 paper-font-subhead">[[temp]]<span class="silver">°c</span></div>

    `;
  }

  static get properties() {
    return {
      temp: {
        type: Number,
        observer: '_tempChange'
      },
    };
  }

  _tempChange() {
    var gaugeSeaTemp = document.gauges.get('gaugeSeaTemp');
    gaugeSeaTemp.value = this.temp;

  }

  _decimalFormat(value) {
    return value ? value.toFixed(1) : '0.0';
  }

  ready() {
    super.ready();

    // eslint-disable-next-line no-undef
    var gaugeSeaTemp = new LinearGauge({
      renderTo: this.$.gaugeSeaTemp,
      width: 260,
      height: 100,
    minValue: 5,
    maxValue: 35,
    majorTicks: [
        5,
        10,
        15,
        20,
        25,
        30,
        35
    ],
    minorTicks: 5,
    strokeTicks: true,
    ticksWidth: 15,
    ticksWidthMinor: 7.5,
    highlights: [
        {
            "from": 5,
            "to": 15,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 15,
            "to": 35,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    colorMajorTicks: "#ebebeb",
    colorMinorTicks: "#ebebeb",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "transparent",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    fontNumbersSize: 24,
    needleWidth: 8,
    animationDuration: 1500,
    animationRule: "linear",
    colorNeedleShadowDown: "#222",
    colorNeedleEnd: "#E53935",
    colorNeedle: "#E53935",
    colorBarProgress: "#f5f5f5",
    colorBar: "#0288D1",
    barStroke: 0,
    barWidth: 8,
    barBeginCircle: false
    });

    gaugeSeaTemp.draw();
  }
}

window.customElements.define("gauge-sea-temperature", GaugeSeaTemperature);
