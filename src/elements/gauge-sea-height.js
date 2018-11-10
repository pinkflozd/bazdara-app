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

class GaugeSeaHeight extends PolymerElement {
  static get template() {
    return html `
      <style>
        #pulsor {
          margin-top: 15px;
          margin-left: auto;
          margin-right: auto;
          width: 16px;
          height: 16px;
          border: none;
          box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
          border-radius: 50%;
          background-color: #e84c3d;
          background-size:cover;
          background-repeat: no-repeat;
          cursor: pointer;
          -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
          -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
          -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
          animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
        }

        @-webkit-keyframes pulse {to {box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);}}
        @-moz-keyframes pulse {to {box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);}}
        @-ms-keyframes pulse {to {box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);}}
        @keyframes pulse {to {box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);}}
        </style>

        <template is="dom-if" if="{{alarm}}">
          <div id="pulsor"></div>
        </template>

        <canvas id="gaugeHeight" style="height:125px;width:125px"></canvas>

    </div>
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

    //  canvas.update({ value: this.live.currentWindtemp });
    var gaugeHeight = document.gauges.get('gaugeHeight');
    gaugeHeight.value = this.temp;

    if (this.temp >= 70) {
      this.alarm = true;
    } else {
      this.alarm = false;
    }

  }

  _decimalFormat(value) {
    return value ? value.toFixed(1) : '0.0';
  }

  ready() {
    super.ready();

    // eslint-disable-next-line no-undef
    var gaugeHeight = new LinearGauge({
      renderTo: this.$.gaugeHeight,
      width: 125,
      height: 125,
      minValue: -80,
      maxValue: 80,
      majorTicks: [
        -80,
        -40,
        0,
        40,
        80,
      ],
      minorTicks: 4,
      strokeTicks: true,
      ticksWidth: 15,
      ticksWidthMinor: 7.5,
      highlights: [{
          "from": 60,
          "to": 70,
          "color": "#FDD835"
        },
        {
          "from": 70,
          "to": 80,
          "color": "#E57373"
        }
      ],
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleWidth: 3,
      animationDuration: 1500,
      animationRule: "linear",
      colorNeedle: "#222",
      colorNeedleEnd: "",
      colorBarProgress: "#1e88e5",
      colorBar: "#f5f5f5",
      valueBox: false,
      barStroke: 0,
      fontNumbersSize: 30,
      barWidth: 8,
      barBeginCircle: false,
      colorPlate: "transparent"
    });

    gaugeHeight.draw();
  }
}

window.customElements.define("gauge-sea-height", GaugeSeaHeight);