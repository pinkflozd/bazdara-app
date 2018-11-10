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

import "canvas-gauges";

/**
* @polymer
* @extends HTMLElement
*/
class GaugeWindSpeed extends PolymerElement {
  static get template() {
    return html`
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
      }
    };
  }

  _speedChange() {
    var gaugeSpeed = document.gauges.get("gaugeSpeed");
    gaugeSpeed.value = this.speed;
  }

  ready() {
    super.ready();

    // eslint-disable-next-line no-undef
    var gaugeSpeed = new RadialGauge({
      renderTo: this.$.gaugeSpeed,
      height: 200,
      width: 200,
      units: "m/s",
      minValue: 0,
      valueBox: false,
      maxValue: 25,
      borderShadowWidth: 0,
      borders: false,
      exactTicks: true,
      majorTicks: [
        "0.3",
        "1.5",
        "3.3",
        "5.5",
        "8",
        "10.8",
        "13.9",
        "17.2",
        "20.7",
        "24.5"
      ],
      strokeTicks: true,
      highlights: [
        {
          from: 17.2,
          to: 25,
          color: "rgba(200, 50, 50, .75)"
        }
      ],
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
