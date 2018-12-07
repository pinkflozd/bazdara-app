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
import "@polymer/iron-icon/iron-icon.js";
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

import "../bazdara-icons.js";
import "../shared-styles.js";

/**
 * @polymer
 * @extends HTMLElement
 */
class PageSettings extends PolymerElement {
  static get template() {
    return html `

      <style include="shared-styles">

      </style>

      <app-localstorage-document key="settings_unit_speed" data="{{speedunit}}"></app-localstorage-document>

      <label id="hitrost">Hitrost:</label><br>
      <paper-radio-group aria-labelledby="hitrost" selected="{{speedunit}}">
        <paper-radio-button name="ms">m/s</paper-radio-button>
        <paper-radio-button name="kmh">km/h</paper-radio-button>
        <paper-radio-button name="kn">vozel</paper-radio-button>
      </paper-radio-group>

    `;
  }


  static get properties() {
    return {
      speedunit: {
        type: String,
        value: "ms",
        notify: true
      }
    };
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("page-settings", PageSettings);
