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

import "../shared-styles.js";

/**
* @polymer
* @extends HTMLElement
*/
class ForecastText extends PolymerElement {
  static get template() {
    return html`

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        .paper-material {
          background-color: var(--primary-background-color);
          color: var(--primary-text-color);
          margin: 10px 10px 10px 10px;
          padding: 10px
        }
        .jadranwarning {
          background-color: #D32F2F;
          color: #fff
        }
        .jadransynopsis {
          background-color: #1976D2;
          color: #fff
        }
        hr {
          display: block;
          height: 1px;
          border: 0;
          border-top: 1px solid var(--divider-color);
          margin: 5px 0;
          padding: 0;
        }
        .jadranwarning hr, .jadransynopsis hr {
          border-top: 1px solid var(--light-theme-divider-color);
        }
      </style>

      <div class="paper-material" elevation="1">
        <div class="paper-font-title">Napoved za danes</div>
        <hr>
        <p class="paper-font-body1">[[napoved.danes]]</p>
        <hr>
        <div class="paper-font-caption">Posodobitev: [[napoved.danes_posodobitev]]</div>
      </div>

      <div class="paper-material" elevation="1">
        <div class="paper-font-title">Napoved za jutri</div>
        <hr>
        <p class="paper-font-body1">[[napoved.jutri]]</p>
        <hr>
        <div class="paper-font-caption">Posodobitev: [[napoved.jutri_posodobitev]]</div>
      </div>

      <div class="paper-material jadranwarning" elevation="1">
        <div class="paper-font-title"><span lang="en">Warning</span></div>
        <hr>
        <p class="paper-font-body1"><span lang="en">[[napoved.jadranwarning]]</span></p>
      </div>

      <div class="paper-material jadransynopsis" elevation="1">
        <div class="paper-font-title"><span lang="en">Synopsis</span></div>
        <hr>
        <p class="paper-font-body1"><span lang="en">[[napoved.jadransynopsis]]</span></p>
      </div>

      <div class="paper-material" elevation="1">
        <div class="paper-font-title"><span lang="en">Forecast for the first 12 hours</span></div>
        <hr>
        <p class="paper-font-body1"><span lang="en">[[napoved.jadran12now]]</span></p>
        <hr>
        <div class="paper-font-caption">Posodobitev: [[napoved.jadran12time]]</div>
      </div>

      <div class="paper-material" elevation="1">
        <div class="paper-font-title"><span lang="en">Forecast for the next 12 hours</span></div>
        <hr>
        <p class="paper-font-body1"><span lang="en">[[napoved.jadran12later]]</span></p>
        <hr>
        <div class="paper-font-caption">Posodobitev: [[napoved.jadran12time]]</div>
      </div>
    `;
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("forecast-text", ForecastText);
