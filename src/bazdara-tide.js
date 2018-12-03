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
import "@polymer/paper-styles/element-styles/paper-material-styles.js";

import "./shared-styles.js";
import "./elements/sea-tide.js";
import "./elements/firebase-tide.js";


/**
* @polymer
* @extends HTMLElement
*/
class BazdaraTide extends PolymerElement {
  static get template() {
    return html `

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        :host {
          display: block;
        }

        .paper-material {
          margin: 10px;
          background-color: var(--primary-background-color)
        }
        .paper-font-subhead {
          padding-left: 10px;
          padding-top: 10px;
          color: var(--primary-text-color)
        }
      </style>
      <firebase-tide tiden="{{tiden}}" tide="{{tide}}"></firebase-tide>
      <div class="paper-material" elevation="1">
      <div class="paper-font-subhead">Plimovanje morja severni Jadran</div>
      <sea-tide elevation="1" theme="{{theme}}" tide="[[tide]]" tiden="[[tiden]]" redraw="{{redraw}}"></sea-tide>
      </div>
    `;
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("bazdara-tide", BazdaraTide);
