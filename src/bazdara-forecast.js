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

import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/iron-pages/iron-pages.js";

import "./shared-styles.js";
import "./elements/meteogram-yrno.js";
import "./elements/firebase-napoved.js";

/**
* @polymer
* @extends HTMLElement
*/
class BazdaraForecast extends PolymerElement {
  static get template() {
    return html `

      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <firebase-napoved napoved={{napoved}}></firebase-napoved>

      <div class="over">
        <meteogram-yrno lat="[[latitude]]" lng="[[longitude]]" speedunit="[[speedunit]]" full="true" theme="[[theme]]"></meteogram-yrno>
      </div>
    `;
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("bazdara-forecast", BazdaraForecast);
