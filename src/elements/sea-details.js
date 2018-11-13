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

/**
* @polymer
* @extends HTMLElement
*/
class SeaDetails extends PolymerElement {
  static get template() {
    return html`

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        :host {
          display: block;
          padding:0px 10px 0px 10px;
        }
        .paper-material {
          background-color:var(--primary-background-color);
          padding:10px;
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
      </style>

      <div class="paper-material" elevation="1">
      <h2 class="paper-font-subhead"><iron-icon icon="bazdara-icons:wave"></iron-icon> Morje</h2>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Višina vala:
        </div>
        <div class="flex2child paper-font-body1">
          [[live.wavesHeight]]<span class="metric">m</span>
        </div>
      </div>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Max višina:
        </div>
        <div class="flex2child paper-font-body1">
          [[trenutno.val.vrh.zdaj]]<span class="metric">m</span>
        </div>
      </div>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          Smer valovanja:
        </div>
        <div class="flex2child paper-font-body1">
          [[live.wavesDirection]]<span class="metric">m</span>
        </div>
      </div>

      </div>
    `;
  }

  ready() {
    super.ready();
  }

  _decimalFormat(value) {
    return value ? value.toFixed(1) : '0.0';
  }

}

window.customElements.define("sea-details", SeaDetails);
