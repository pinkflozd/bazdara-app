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

import "./elements/bootstrap-style.js";
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

import "./elements/gauge-sea-temperature.js";

/**
 * @polymer
 * @extends HTMLElement
 */
class BazdaraHome extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html `

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles bootstrap-style">
        :host {
          display: block;
        }

        .gaugewind {
          background-color: #00695C;
        }
        .gaugespeed {
          background-color: #00838F;
        }
        .gaugewave {
          background-color: #5C6BC0;
        }
        .gaugeheight {
          background-color: #7E57C2;
        }

        .gaugeseatemp {
          background-color: #0277BD;
        }

        @media (min-width: 992px) {
          .col-top {
            margin-top:64px;
          }

          live-current {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%;
            min-height: 850px;
            height: 100%;
          }
        }

        .outer {
          padding:5px;
          max-width: 1200px;
        }

        .material {
          background-color:var(--primary-background-color);
          margin: 5px;
          height: 100%;
        }

        .material2 {
          margin: 5px;
          height: 100%;
        }
        .center {
          @apply --layout-flex;
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }
        .margin {
          padding: 5px;
        }
        .paper-material {
          height: 100%;
        }

      </style>

<firebase-live live="{{live}}"></firebase-live>
<firebase-trenutno trenutno="{{trenutno}}"></firebase-trenutno>

<div id="top"></div>

<live-current on-track="handleTrack" live="[[live]]" trenutno="[[trenutno]]"></live-current>
<div id="scroll" style="padding-top:64px;margin-top:-64px"></div>

  <div class="row no-gutters outer">
    <div class="col-lg">

    </div>
    <div class="col-lg">
      <div class="row no-gutters">
        <div class="col-md-6 margin">
          <div class="paper-material material" elevation="1">
          <live-details live="[[live]]" trenutno="[[trenutno]]"></live-details>
          </div>
        </div>
        <div class="col-md-6 margin">
          <div class="paper-material material" elevation="1">
          <wind-details live="[[live]]" trenutno="[[trenutno]]" speedunit="[[speedunit]]"></wind-details>
          </div>
        </div>
        <div class="col-6 margin">
          <div class="paper-material material2 gaugespeed center" elevation="1">
          <gauge-wind-speed speed="[[live.currentWindSpeed]]" speedunit="[[speedunit]]"></gauge-wind-speed>
          </div>
        </div>
        <div class="col-6 margin">
          <div class="paper-material material2 gaugewind center" elevation="1">
          <gauge-wind-direction direction="[[live.currentWindDirection]]" name="[[live.currentWindDirection]]"></gauge-wind-direction>
          </div>
        </div>
        <div class="col-12 col-md-6 margin">
          <div class="paper-material material" elevation="1">
            <sea-details live="[[live]]" trenutno="[[trenutno]]" speedunit="[[speedunit]]"></sea-details>
          </div>
        </div>
        <div class="col-6 margin">
          <div class="paper-material material2 gaugewave center" elevation="1">
          <gauge-sea-wave wave2="[[trenutno.val.vrh.zdaj]]" wave="[[live.wavesHeight]]"></gauge-sea-wave>
          </div>
        </div>
        <div class="col-6 margin">
          <div class="paper-material material2 gaugeheight center" elevation="1">
          <gauge-sea-height temp="[[trenutno.vodostaj]]"></gauge-sea-height>
          </div>
        </div>
        <div class="col margin">
          <div class="paper-material material2 gaugeseatemp center" elevation="1">
          <gauge-sea-temperature temp="[[trenutno.morje.vrh.zdajkoper]]"></gauge-sea-temperature>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div style="height:56px"></div>
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
