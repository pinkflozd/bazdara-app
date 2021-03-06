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
import "./elements/firebase-napoved.js";
import "./elements/meteogram-yrno.js";
import "./elements/forecast-arso.js";
import "./elements/forecast-text.js";
import "./elements/forecast-img.js";

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
          --paper-toolbar-background: #FFFFFF;;
          --paper-tabs-selection-bar-color: #FFFFFF;;
          --paper-tab-ink: #FFFFFF;
        }

        #statTabs2 {
          background-color: var(--primary-color);
          color: #FFFFFF;

        }
      </style>

      <firebase-napoved napoved="{{napoved}}"></firebase-napoved>

      <paper-tabs id="statTabs2" selected="{{selected}}" fallback-selection="0" scrollable fit-container>
        <paper-tab>
          Napoved za 48 ur
        </paper-tab>
        <paper-tab>
          Napoved v besedi
        </paper-tab>
        <paper-tab>
          Vremenska slika EU
        </paper-tab>
      </paper-tabs>

      <iron-pages id="stats2" selected="{{selected}}" fallback-selection="0">
        <div>
          <div class="over">
            <meteogram-yrno lat="[[latitude]]" lng="[[longitude]]" speedunit="[[speedunit]]" full="true" theme="[[theme]]" redraw="{{redraw}}" select="{{selected}}"></meteogram-yrno>
          </div>
          <forecast-arso napoved="[[napoved]]" speedunit="[[speedunit]]"></forecast-arso>
        </div>
        <div>
          <forecast-text napoved="[[napoved]]" speedunit="[[speedunit]]"></forecast-text>
        </div>
        <div>
          <forecast-img></forecast-img>
        </div>

      </iron-pages>

      <div style="height:56px"></div>
    `;
  }

  static get properties() {
    return {
      redraw: String,
      napoved: Object,
    };
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("bazdara-forecast", BazdaraForecast);
