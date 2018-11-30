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

import "../shared-styles.js";

/**
* @polymer
* @extends HTMLElement
*/
class RealFeel extends PolymerElement {
  static get template() {
    return html`[[realfeel]]`;
  }

  static get properties() {
    return {
      /**
       * `temp` the wind temp in m/s.
       */
      temp: {
        type: Number,
        observer: '_calculate'
      },

      hum: {
        type: Number,
        observer: '_calculate'
      },

      wind: {
        type: Number,
        observer: '_calculate'
      }
    };
  }

  _decimalFormat(value) {
    return value ? value.toFixed(1) : '0.0';
  }

  _calculate() {

    if (this.temp > 10) {
      this.temper = this.temp;
    } else {
      this.temper = this.temp;
    }

    //this.chill = (37-((37-this.temp)/(0.68-0.0014*this.hum+(1/(1.76+1.4*Math.pow((this.wind/3.6), 0.75)))))-0.29*this.temp*(1-(this.hum/100)));

    var te = (this.hum/100)*6.105*Math.exp( (17.27*this.temper)/(237.7+this.temper) );
    this.chill = this.temper + 0.33*te - 0.7*this.wind - 4;
    this.realfeel = this._decimalFormat(this.chill);

  }

}

window.customElements.define("real-feel", RealFeel);
