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

class GaugeWindDirection extends PolymerElement {
  static get template() {
    return html`
    <style>
    .outer {
      width: 230px;
      height: 230px;
      position: relative;
    }

    .windName {
      text-align: center;
      color: #FFF;
      position: absolute;
      top: 70px;
      width: 230px
    }

    .windDirection {
      text-align: center;
      color: #FFF;
      position: absolute;
      top: 140px;
      width: 230px
    }
    </style>
    <div class="outer">
      <div class="windName">
        <i18n-msg msgid$="{{_windNames}}">{{_windNames}}</i18n-msg>
      </div>

      <div class="windDirection">
        {{direction}}°&nbsp;<i18n-msg msgid$="{{_windCompass}}">{{_windCompass}}</i18n-msg>
      </div>
    <canvas id="gaugeDirection" style="height:270px;width:270px"></canvas>
  </div>
    `;
  }

  static get properties() {
    return {
      /**
       * `direction` the wind direction in degrees.
       */
      direction: {
        type: Number,
        observer: "_directionChange"
      },
      name: {
        type: Number,
        value: 0.0,
        observer: "_nameChange"
      },
      _windNames: {
        type: String,
        reflectToAttribute: true
      },
      _windCompass: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  _directionChange(e) {
    //  canvas.update({ value: this.live.currentWindSpeed });
    var gaugeDirection1 = document.gauges.get("gaugeDirection");
    gaugeDirection1.value = this.direction;

    for (var i = 1; i < this._directions.length; i++) {
      if (e >= this._directions[i].from && e < this._directions[i].to) {
        this._windCompass = this._directions[i].direction;
        return;
      }
    }
    this._windCompass = this._directions[0].direction;
  }

  _nameChange(e) {
    for (var i = 1; i < this._names.length; i++) {
      if (e >= this._names[i].from && e < this._names[i].to) {
        this._windNames = this._names[i].name;
        return;
      }
    }
    this._windNames = this._names[0].name;
  }

  constructor() {
    super();

    this._directions = [
      {
        direction: "N",
        from: 348.75,
        to: 11.25
      },
      {
        direction: "NNE",
        from: 11.25,
        to: 33.75
      },
      {
        direction: "NE",
        from: 33.75,
        to: 56.25
      },
      {
        direction: "ENE",
        from: 56.25,
        to: 78.75
      },
      {
        direction: "E",
        from: 78.75,
        to: 101.25
      },
      {
        direction: "ESE",
        from: 101.25,
        to: 123.75
      },
      {
        direction: "SE",
        from: 123.75,
        to: 146.25
      },
      {
        direction: "SSE",
        from: 146.25,
        to: 168.75
      },
      {
        direction: "S",
        from: 168.75,
        to: 191.25
      },
      {
        direction: "SSW",
        from: 191.25,
        to: 213.75
      },
      {
        direction: "SW",
        from: 213.75,
        to: 236.25
      },
      {
        direction: "WSW",
        from: 236.25,
        to: 258.75
      },
      {
        direction: "W",
        from: 258.75,
        to: 281.25
      },
      {
        direction: "WNW",
        from: 281.25,
        to: 303.75
      },
      {
        direction: "NW",
        from: 303.75,
        to: 326.25
      },
      {
        direction: "NNW",
        from: 326.25,
        to: 348.75
      }
    ];

    this._names = [
      {
        name: "Tramontana",
        from: 340.1,
        to: 10
      },
      {
        name: "Burin",
        from: 10.1,
        to: 30
      },
      {
        name: "Burja",
        from: 30.1,
        to: 100
      },
      {
        name: "Levant",
        from: 100.1,
        to: 120
      },
      {
        name: "Jugo",
        from: 120.1,
        to: 160
      },
      {
        name: "Ostro",
        from: 160.1,
        to: 200
      },
      {
        name: "Lebic",
        from: 200.1,
        to: 240
      },
      {
        name: "Garbin",
        from: 240.1,
        to: 260
      },
      {
        name: "Ponent",
        from: 260.1,
        to: 290
      },
      {
        name: "Maestral",
        from: 290.1,
        to: 340
      }
    ];
  }

  ready() {
    super.ready();

    // eslint-disable-next-line no-undef
    var gaugeDirection1 = new RadialGauge({
      renderTo: this.$.gaugeDirection,
      height: 230,
      width: 230,
      minValue: 0,
      maxValue: 360,
      majorTicks: ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"],
      minorTicks: 22,
      ticksAngle: 360,
      startAngle: 180,
      strokeTicks: false,
      highlights: false,
      colorPlate: "#00695C",
      colorMajorTicks: "#f5f5f5",
      colorMinorTicks: "#ddd",
      colorNumbers: "#ccc",
      colorNeedle: "rgba(240, 128, 128, 1)",
      colorNeedleEnd: "rgba(255, 160, 122, .9)",
      valueBox: false,
      valueTextShadow: false,
      colorCircleInner: "#fff",
      colorNeedleCircleOuter: "#ccc",
      needleCircleSize: 15,
      needleCircleOuter: false,
      animationRule: "linear",
      needleType: "line",
      needleStart: 75,
      needleEnd: 99,
      needleWidth: 3,
      borders: true,
      borderInnerWidth: 0,
      borderMiddleWidth: 0,
      borderOuterWidth: 0,
      colorNeedleShadowDown: "#222",
      borderShadowWidth: 0,
      animationTarget: "plate",
      fontTitleSize: 19,
      colorTitle: "#f5f5f5",
      animationDuration: 2000
    });

    gaugeDirection1.draw();
  }
}

window.customElements.define("gauge-wind-direction", GaugeWindDirection);
