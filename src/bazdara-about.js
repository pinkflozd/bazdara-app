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

/**
* @polymer
* @extends HTMLElement
*/
class BazdaraAbout extends PolymerElement {
  static get template() {
    return html `

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        :host {
          display: block;
        }
        .paper-material {
          background-color: var(--primary-background-color);
          color: var(--primary-text-color);
          margin: 10px 10px 10px 10px;
          padding: 10px
        }
      </style>
      <div class="paper-material" elevation="1">
        <div class="paper-font-subhead">Kaj je to?</div>
        <hr>
        <p class="paper-font-body1">Razni podatki o vremenu in stanju morja v Piranskem zalivu.</p>
      </div>

      <div class="paper-material" elevation="1">
        <a href="https://www.browserstack.com" target="_blank" rel="nofollow"><img src="images/browserstack-logo.png" style="width:100%" /></a>
        <p class="paper-font-body1">Test your website for cross browser compatibility on real browsers.</p>
      </div>

      <div class="paper-material" elevation="1">
        <div class="paper-font-subhead">A to je vse?</div>
        <hr>
        <p class="paper-font-body1">Stran je še v izdelavi. Nekatere funkcije še ne delajo ali so v izdelavi.</p>
      </div>

      <div class="paper-material" elevation="1">
        <div class="paper-font-subhead">Zakaj?</div>
        <hr>
        <p class="paper-font-body1">Živim ob Slovenski Obali, imam barko in plujem po našem morju in imam avto parkiran ob obali, tako da rabim vir informacij o stanju morja.</p>
      </div>

      <div class="paper-material" elevation="1">
        <div class="paper-font-subhead">Želiš več informacij ali želiš pomagati?</div>
        <hr>
        <p class="paper-font-body1"><a href="mailto:luka.karinja@gmail.com"><i18n-msg msgid="informacije_10">piši mi</i18n-msg></a>!</p>
      </div>
    `;
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("bazdara-about", BazdaraAbout);
