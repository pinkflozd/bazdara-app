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
} from '@polymer/polymer/polymer-element.js';
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';

import {
  GestureEventListeners
} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import './shared-styles.js';

import './elements/firebase-live.js';
import './elements/firebase-trenutno.js';

import './elements/live-current.js';
import './elements/live-cam.js';

import './elements/meteogram-yrno.js';

class BazdaraHome extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html `

      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <firebase-live live="{{live}}"></firebase-live>
      <firebase-trenutno trenutno="{{trenutno}}"></firebase-trenutno>
      <div id="top"></div>
      <live-current on-track="handleTrack" live="[[live]]" trenutno="[[trenutno]]"></live-current>
      <div id="scroll" style="padding-top:64px;margin-top:-64px"></div>
      <div class="over">
      <meteogram-yrno lat="[[latitude]]" lng="[[longitude]]" full="true"></meteogram-yrno>
      </div>
      <live-cam lat="[[latitude]]" lng="[[longitude]]"></live-cam>
      <br><br><br><br><br><br><br><br><br><br><br><br>
<div id="test"></div>

      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    `;
  }

  handleTrack(e) {
    switch (e.detail.state) {
      case 'start':
        // start
        break;
      case 'track':
      if (this.stoper == null && this.oldScroll !== null) {

        if (this.oldScroll > e.detail.y) {

          this.$.scroll.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          if (this.oldScroll !== null) {
          this.stoper = true;
          }
        } else if (this.oldScroll < e.detail.y) {

          this.$.top.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          if (this.oldScroll !== null) {
          this.stoper = true;
          }

        }

      }

        this.oldScroll = e.detail.y;

        break;
      case 'end':
        this.stoper = null;
        this.oldScroll = null;
        break;
    }
  }

  ready() {
    super.ready();
  }

}

window.customElements.define('bazdara-home', BazdaraHome);
