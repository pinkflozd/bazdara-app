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

import {
  GestureEventListeners
} from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";

import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";

import "./shared-styles.js";

import "./elements/firebase-live.js";
import "./elements/firebase-trenutno.js";

import "./elements/live-current.js";
import "./elements/live-details.js";

import "./elements/wind-details.js";

import "./elements/gauge-wind-speed.js";
import "./elements/gauge-wind-direction.js";

import "./elements/sea-details.js";

import "./elements/gauge-sea-wave.js";
import "./elements/gauge-sea-height.js";

import "./elements/meteogram-yrno.js";
import "./elements/live-cam.js";

/**
* @polymer
* @extends HTMLElement
*/
class BazdaraHome extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html `

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        :host {
          display: block;
        }

        .gaugeflex {
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .gaugeflexchild {
          @apply --layout-flex;
          @apply --layout-horizontal;
          @apply --layout-center-justified;
          @apply --layout-self-stretch;
          margin: 10px;
          background-color:var(--primary-background-color);
          padding-top: 7px
        }

        .gaugeflexleft {
          margin-right: 5px;
        }

        .gaugeflexright {
          margin-left: 5px;
        }

        .gaugewind {
          background-color: #00695C;
        }
        .gaugespeed {
          background-color: #00838F;
        }
      </style>
      <firebase-live live="{{live}}"></firebase-live>
      <firebase-trenutno trenutno="{{trenutno}}"></firebase-trenutno>
      <div id="top"></div>
      <live-current on-track="handleTrack" live="[[live]]" trenutno="[[trenutno]]"></live-current>
      <div id="scroll" style="padding-top:64px;margin-top:-64px"></div>
      <live-details live="[[live]]" trenutno="[[trenutno]]"></live-details>
      <wind-details live="[[live]]" trenutno="[[trenutno]]" speedunit="[[speedunit]]"></wind-details>
      <div class="gaugeflex">
        <div class="gaugeflexchild gaugeflexleft paper-material gaugespeed" elevation="1">
          <gauge-wind-speed speed="[[live.currentWindSpeed]]" speedunit="[[speedunit]]"></gauge-wind-speed>
        </div>
        <div class="gaugeflexchild gaugeflexright paper-material gaugewind" elevation="1">
          <gauge-wind-direction direction="[[live.currentWindDirection]]" name="[[live.currentWindDirection]]"></gauge-wind-direction>
        </div>
      </div>
      <sea-details live="[[live]]" trenutno="[[trenutno]]" speedunit="[[speedunit]]"></sea-details>

      <gauge-sea-wave wave="[[trenutno.val.vrh.zdaj]]" wave2="[[live.wavesHeight]]"></gauge-sea-wave>
      <gauge-sea-height temp="[[trenutno.vodostaj]]"></gauge-sea-height>
      <div class="over">
      <meteogram-yrno lat="[[latitude]]" lng="[[longitude]]" full="true"></meteogram-yrno>
      </div>
      <live-cam lat="[[latitude]]" lng="[[longitude]]"></live-cam>

    `;
  }

  handleTrack(e) {
    switch (e.detail.state) {
      case "start":
        // start
        break;
      case "track":
        if (this.stoper == null && this.oldScroll !== null) {
          if (this.oldScroll > e.detail.y) {
            this.$.scroll.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
            if (this.oldScroll !== null) {
              this.stoper = true;
            }
          } else if (this.oldScroll < e.detail.y) {
            this.$.top.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
            if (this.oldScroll !== null) {
              this.stoper = true;
            }
          }
        }

        this.oldScroll = e.detail.y;

        break;
      case "end":
        this.stoper = null;
        this.oldScroll = null;
        break;
    }
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("bazdara-home", BazdaraHome);
