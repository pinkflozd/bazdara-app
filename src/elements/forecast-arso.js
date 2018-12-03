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
import '@polymer/polymer/lib/elements/dom-repeat.js';

import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/iron-collapse/iron-collapse.js";
import "@polymer/paper-ripple/paper-ripple.js";

import "../bazdara-icons.js";
import "../shared-styles.js";
import "./weather-icons.js";

/**
* @polymer
* @extends HTMLElement
*/
class ForecastArso extends PolymerElement {
  static get template() {
    return html`
      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">

      :host {
        display: block;
      }

     .vreme_zdaj1 {
        display: block;
        height: 64px;
        position: absolute;
        top:0;
        right: 5px;
      }

     .vreme_zdaj2 {
        display: block;
        height: 48px;
        position: absolute;
        top:16px;
        right: 0px;
      }

      .Ponedeljek.zjutraj {
      background-color: #D32F2F;
      color: #fff
      }
      .Ponedeljek.popoldne {
      background-color: #512DA8;
      color: #fff
      }
      .Torek.zjutraj {
      background-color: #0288D1;
      color: #fff
      }
      .Torek.popoldne {
      background-color: #388E3C;
      color: #fff
      }
      .Sreda.zjutraj {
      background-color: #E64A19;
      color: #fff
      }
      .Sreda.popoldne {
      background-color: #C2185B;
      color: #fff
      }
      .Četrtek.zjutraj {
      background-color: #303F9F;
      color: #fff
      }
      .Četrtek.popoldne {
      background-color: #689F38;
      color: #fff
      }
      .Petek.zjutraj {
      background-color: #7B1FA2;
      color: #fff
      }
      .Petek.popoldne {
      background-color: #1976D2;
      color: #fff
      }
      .Sobota.zjutraj {
      background-color: #00796B;
      color: #fff
      }
      .Sobota.popoldne {
      background-color: #EF6C00;
      color: #fff
      }
      .Nedelja.zjutraj {
      background-color: #0097A7;
      color: #fff
      }
      .Nedelja.popoldne {
      background-color: #388E3C;
      color: #fff
      }
      .paper-material {
        margin: 5px 10px 10px 10px;
        padding: 10px;
        -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
      }
      .temp
        {
        position: absolute;
        right: 78px;
        top:0;
        height: 64px;
        line-height:64px;
      }
      .dat {
      line-height: 18px;

    }
    .dan {
      line-height: 26px;
    }

    .paper-font-display1 {
      font-size: 24px
    }

          .flex {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .flex2 {
        @apply --layout-horizontal;
      }

      .flexchild {
        @apply --layout-flex;
      }

      .morje {
        width: 32px;
        margin-left:7px;
        margin-top:-18px
      }
      .dir {
        width:24px;
        height:24px;
        vertical-align: middle;
      }
      </style>



      <template is="dom-repeat" items="[[_limitForecast(napoved.napovedi)]]">
        <div class$="paper-material [[item.dan]]" elevation="1" data-index$="[[index]]" on-tap="_open">
          <div class="paper-font-subhead dan">[[item.dan]]</div>
          <div class="paper-font-caption dat">[[item.valid]]</div>
          <img src$="images/vreme/[[item.icona_new]].png" class="vreme_zdaj1" alt="[[item.icona_new]]">
          <img src$="images/vreme/pojavi/[[_pojav(item.icona_pojav_new)]].png" class="vreme_zdaj2" alt="[[item.icona_pojav_new]]">
          <div class="temp paper-font-display1">[[item.temp]]<span class="value">°c</span><br></div>
          <paper-ripple></paper-ripple>

          <iron-collapse id$="collapse[[index]]">
            <div style="padding-top:10px">
              <div class="text-right paper-font-body1">[[item.icona_beseda]] [[item.icona_pojav_beseda]]</div>
              <div class="flex2 paper-font-body1">
                <div class="flexchild">
                <div class="paper-font-subhead">Morje <img src$="images/vreme/[[item.val]].png" class="morje" alt="[[item.val]]"></div>
                [[item.visina]]<br>
                temperatura: [[item.temp_morje]]<span class="value">°c</span>
                </div>
                <div class="flexchild text-right">
                <div class="paper-font-subhead">Veter <strong>[[item.smer]]</strong>
                <img src$="images/directions/[[item.smer]].svg" class="dir" alt="[[item.smer]]">
                </div>
                hitrost: [[_speed(item.hitrost, speedunit)]]<span class="value">[[_speedName(speedunit)]]</span><br>
                vidljivost: [[item.vis]]
                </div>
              </div>

            </div>
          </iron-collapse>

        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      napoved: Object
    };
  }

  _pojav(value) {
    if (value) {
      return value;
    } else {
      return "prazna";
    }
  }

  _open(e) {
    var collapseElem = this.shadowRoot.querySelector('#collapse'+e.currentTarget.dataset.index);
    collapseElem.toggle();
  }

  _limitForecast(forecast) {
    var today = new Date().getHours();
    if (today >= 10 && today <= 20) {
      forecast = forecast.slice(1, 5);
    } else if (today >= 20 && today <= 24 || today >= 0 && today <= 5) {
      forecast = forecast.slice(2, 6);
    } else {
      forecast = forecast.slice(0, 4);
    }
    return forecast;
  }

  _speed(value, speed) {
    var multiplier = Math.pow(10, 1 || 0);
    var value2;
    if (speed == "kmh") {
      value2 = value * 3.6;
      return Math.round(value2 * multiplier) / multiplier;
    } else if (speed == "kn") {
      value2 = value * 1.94384449;
      return Math.round(value2 * multiplier) / multiplier;
    } else {
      return value;
    }
  }

  _speedName(speed) {
    if (speed == "kmh") {
      return "km/h";
    } else if (speed == "kn") {
      return "knots";
    } else {
      return "m/s";
    }
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("forecast-arso", ForecastArso);
