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
class GaugeWindSpeed extends PolymerElement {
  static get template() {
    return html `
      <canvas id="gaugeSpeed"></canvas>
    `;
  }

  static get properties() {
    return {
      /**
       * `speed` the wind speed in m/s.
       */
      speed: {
        type: Number,
        observer: "_speedChange"
      },
      speedunit: {
        type: Number,
        observer: "_speedName"
      }
    };
  }

  _speedChange() {
    var gaugeSpeed = document.gauges.get("gaugeSpeed");
    gaugeSpeed.value = this.speed * this.calc;
  }

  _speedName() {

    if (this.speedunit == "kmh") {
      this.unit = "km/h";
      this.calc = 3.6;
    } else if (this.speedunit == "kn") {
      this.unit = "kn";
      this.calc = 1.94384449;
    } else {
      this.unit = "m/s";
      this.calc = 1;
    }

    if (document.gauges.get("gaugeSpeed")) {
      var gaugeSpeed = document.gauges.get("gaugeSpeed");

      gaugeSpeed.update({
        units: this.unit,
        maxValue: 25 * this.calc,
        majorTicks: [
          Math.round("0.3" * this.calc),
          Math.round("1.5" * this.calc),
          Math.round("3.3" * this.calc),
          Math.round("5.5" * this.calc),
          Math.round("8" * this.calc),
          Math.round("10.8" * this.calc),
          Math.round("13.9" * this.calc),
          Math.round("17.2" * this.calc),
          Math.round("20.7" * this.calc),
          Math.round("24.5" * this.calc)
        ],
        highlights: [{
          from: 17.2 * this.calc,
          to: 25 * this.calc,
          color: "rgba(200, 50, 50, .75)"
        }]
      });

    }

  }

  ready() {
    super.ready();

    if (this.speedunit == "kmh") {
      this.unit = "km/h";
      this.calc = 3.6;
    } else if (this.speedunit == "kn") {
      this.unit = "kn";
      this.calc = 1.94384449;
    } else {
      this.unit = "m/s";
      this.calc = 1;
    }

    // eslint-disable-next-line no-undef
    var gaugeSpeed = new RadialGauge({
      renderTo: this.$.gaugeSpeed,
      height: 140,
      width: 140,
      units: this.unit,
      minValue: 0,
      valueBox: true,
      valueInt: 1,
      valueBoxStroke: 0,
      maxValue: 25 * this.calc,
      borderShadowWidth: 0,
      borders: false,
      exactTicks: true,
      majorTicks: [
        Math.round("0.3" * this.calc),
        Math.round("1.5" * this.calc),
        Math.round("3.3" * this.calc),
        Math.round("5.5" * this.calc),
        Math.round("8" * this.calc),
        Math.round("10.8" * this.calc),
        Math.round("13.9" * this.calc),
        Math.round("17.2" * this.calc),
        Math.round("20.7" * this.calc),
        Math.round("24.5" * this.calc)
      ],
      strokeTicks: true,
      highlights: [{
        from: 17.2 * this.calc,
        to: 25 * this.calc,
        color: "rgba(200, 50, 50, .75)"
      }],
      needleType: "arrow",
      needleWidth: 3,
      needleCircleSize: 7,
      needleCircleOuter: false,
      needleCircleInner: false,
      animationDuration: 1500,
      animationRule: "linear",
      barWidth: "10",
      barShadow: false,
      colorBarProgress: "rgba(50,200,50,.75)",
      colorPlate: "transparent"
    });

    gaugeSpeed.draw();
  }
}

window.customElements.define("gauge-wind-speed", GaugeWindSpeed);
