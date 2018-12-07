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
class LiveDetails extends PolymerElement {
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
          height: 18px;
          width: 18px;
        }
        .paper-font-subhead {
          color: var(--primary-text-color);
        }
      </style>

      <h2 class="paper-font-subhead">Trenutne razmere</h2>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          <iron-icon icon="bazdara-icons:eye"></iron-icon> Vidljivost:
        </div>
        <div class="flex2child paper-font-body1">
          [[trenutno.vis]]<span class="metric">km</span>
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          <iron-icon icon="bazdara-icons:barometer"></iron-icon>  Tlak:
        </div>
        <div class="flex2child paper-font-body1">
          [[trenutno.tlak]]<span class="metric">mBar</span>
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          <iron-icon icon="bazdara-icons:waterdrop"></iron-icon> Vlaga:
        </div>
        <div class="flex2child paper-font-body1">
          [[trenutno.vlaga]]<span class="metric">%</span>
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          <iron-icon icon="bazdara-icons:sunrise"></iron-icon> Vzhod:
        </div>
        <div class="flex2child paper-font-body1">
          [[trenutno.soncni.vzhod]]
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
          <iron-icon icon="bazdara-icons:sunset"></iron-icon> Zahod:
        </div>
        <div class="flex2child paper-font-body1">
          [[trenutno.soncni.zahod]]
        </div>
      </div>

    `;
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("live-details", LiveDetails);
