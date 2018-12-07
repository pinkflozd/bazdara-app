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
import "@polymer/paper-styles/paper-styles-classes.js";
import "@polymer/iron-icon/iron-icon.js";

import "../bazdara-icons.js";
import "../shared-styles.js";
import "./live-wind-direction.js";

/**
* @polymer
* @extends HTMLElement
*/
class WindDetails extends PolymerElement {
  static get template() {
    return html`

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        :host {
          display: block;
          padding: 10px
        }
        .flex-horizontal-with-ratios {
          margin-top: 5px;
          @apply --layout-horizontal;
        }
        .flexchild {
          @apply --layout-flex;
          color: var(--secondary-text-color)
        }
        .metric {
          color: var(--secondary-text-color)
        }
        .flex2child {
          @apply --layout-flex;
          color: var(--primary-text-color);
        }
        .flex3child {
          @apply --layout-flex;
        }
        h2 {
          margin-bottom:10px
        }
        iron-icon {
          height: 24px;
          width: 24px;
        }
        .paper-font-subhead {
          color: var(--primary-text-color);
        }

        .arrow-drop-up {
          color: #F44336;
          margin-top:-3px
        }

        .arrow-drop-down {
          color: #2196F3;
          margin-top:-3px
        }
      </style>

      <h2 class="paper-font-subhead"><iron-icon icon="bazdara-icons:windrose"></iron-icon> Veter</h2>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Trenutna hitrost:
        </div>
        <div class="flex2child paper-font-body1">
          [[_speed(live.currentWindSpeed, speedunit)]]<span class="metric">[[_speedName(speedunit)]]</span>
          <iron-icon class$="[[icon]]" icon$="bazdara-icons:[[icon]]"></iron-icon>
        </div>
      </div>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Povprečna hitrost:
        </div>
        <div class="flex2child paper-font-body1">
          [[_speed(live.meanWindSpeed, speedunit)]]<span class="metric">[[_speedName(speedunit)]]</span>
        </div>
      </div>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Trenutna smer:
        </div>
        <div class="flex2child paper-font-body1">
          <live-wind-direction direction="[[live.currentWindDirection]]"></live-wind-direction>
        </div>
      </div>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Povprečna smer:
        </div>
        <div class="flex2child paper-font-body1">
          <live-wind-direction direction="[[live.meanWindDirection]]"></live-wind-direction>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      /**
       * `speed` the wind speed in m/s.
       */
      live: {
        type: Object,
        observer: "_speedChange"
      }
    };
  }

  ready() {
    super.ready();
  }

  _decimalFormat(value) {
    return value ? value.toFixed(1) : '0.0';
  }

  _speedChange() {
    if (this.live.currentWindSpeed > this.live.meanWindSpeed) {
      this.icon = "arrow-drop-up";
    } else {
      this.icon = "arrow-drop-down";
    }
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

}

window.customElements.define("wind-details", WindDetails);
