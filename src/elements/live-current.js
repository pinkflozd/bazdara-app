import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import {} from "@polymer/polymer/lib/elements/dom-if.js";
import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/paper-styles/paper-styles-classes.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-tooltip/paper-tooltip.js";

import "../bazdara-icons.js";
import "../shared-styles.js";
import "./weather-icons.js";
import "./live-wind-name.js";
import "./live-wind-speed-name.js";
import "./live-wind-speed-beufort.js";
import "./live-wind-direction.js";

import "./live-sea-name.js";

/**
* @polymer
* @extends HTMLElement
*/
class LiveCurrent extends PolymerElement {

  static get template() {
    return html`
      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
      :host {
        display: block;
      }

      paper-spinner {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index:1;
      }

      .aligner {
        display: flex;
        align-items: center;
        justify-content: center;
        height:120px
      }

      blockquote, q{
        text-align:center;
        margin:0;
        padding:0;
        border:0;
        outline:0;
        vertical-align:baseline;
        background:transparent;
      }

      blockquote:before, blockquote:after,
      q:before, q:after {
        content:'';
        content:none;
      }


      .container {
        height: calc(100vh - 64px);
        text-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        color: #ffffff;
        padding: 64px 10px 10px 10px;
        background-color: var(--primary-color);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
      }

      .container, .container.clear, .container.mostClear {
        background-image: url("../../images/background/xxxhdpi/illustration_clear_sky_day.png");
      }

      .container.clear_n, .container.mostClear_n  {
        background-image: url("../../images/background/xxxhdpi/illustration_clear_sky_night.png");
      }

.container.slightCloudy  {
  background-image: url("../../images/background/xxxhdpi/illustration_few_clouds_day.png");
}
.container.slightCloudy_n  {
  background-image: url("../../images/background/xxxhdpi/illustration_few_clouds_night.png");
}
.container.modCloudy, .container.partCloudy {
  background-image: url("../../images/background/xxxhdpi/illustration_scattered_clouds_day.png");
}
.container.modCloudy_n, .container.partCloudy_n {
  background-image: url("../../images/background/xxxhdpi/illustration_scattered_clouds_night.png");
}
.container.overcast, .container.prevCloudy  {
  background-image: url("../../images/background/xxxhdpi/illustration_broken_clouds_day.png");
}
.container.overcast_n, .container.prevCloudy_n  {
  background-image: url("../../images/background/xxxhdpi/illustration_broken_clouds_night.png");
}
.container.FG  {
  background-image: url("../../images/background/xxxhdpi/illustration_mist_day.png");
}
.container.FG_n  {
  background-image: url("../../images/background/xxxhdpi/illustration_mist_night.png");
}
.container.TS  {
  background-image: url("../../images/background/xxxhdpi/illustration_thunderstorm_day.png");
}
.container.TS_n  {
  background-image: url("../../images/background/xxxhdpi/illustration_thunderstorm_night.png");
}
.container.DZ , .container.lightDZ , .container.RA , .container.lightRA , .container.FZDZ , .container.lightFZDZ {
  background-image: url("../../images/background/xxxhdpi/illustration_rain_day.png");
}
.container.DZ_n , .container.lightDZ_n , .container.RA_n , .container.lightRA_n , .container.FZDZ_n , .container.lightFZDZ_n  {
  background-image: url("../../images/background/xxxhdpi/illustration_rain_night.png");
}
.container.modDZ , .container.heavyDZ , .container.modRA , .container.heavyRA , .container.modFZDZ , .container.heavyFZDZ  {
  background-image: url("../../images/background/xxxhdpi/illustration_shower_rain_day.png");
}
.container.modDZ_n , .container.heavyDZ_n , .container.modRA_n , .container.heavyRA_n , .container.modFZDZ_n , .container.heavyFZDZ_n  {
  background-image: url("../../images/background/xxxhdpi/illustration_shower_rain_night.png");
}
.container.ggg  {
  background-image: url("../../images/background/xxxhdpi/illustration_sleet_day.png");
}
.container.ggg  {
  background-image: url("../../images/background/xxxhdpi/illustration_sleet_night.png");
}
.container.ggg  {
  background-image: url("../../images/background/xxxhdpi/illustration_snow_day.png");
}
.container.ggg  {
  background-image: url("../../images/background/xxxhdpi/illustration_snow_night.png");
}
.container.ggg  {
  background-image: url("../../images/background/xxxhdpi/illustration_heavy_snow_day.png");
}
.container.ggg  {
  background-image: url("../../images/background/xxxhdpi/illustration_heavy_snow_night.png");
}

      .icons{
        position: relative;
        height: 160px;
      }

      iron-icon.vreme_zdaj1 {
        display: block;
        height: 128px;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        left: 0;
        right: 0;
      }

      iron-icon.vreme_zdaj2 {
        display: block;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        top:32px;
        left: 0;
        right: 0;
      }

      iron-icon.wind {
        height: 24px;
        width:24px;
        margin-top: -3px;
        margin-left:-26px
      }

      iron-icon.arrow {
        height: 36px;
        width:36px;
      }


      iron-icon.weather {
        height: 128px;
        width: 128px;
      }


      iron-icon.wave {
        margin-left:-26px
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

      paper-tooltip {
        --paper-tooltip: {
          font-size: 14px;
        }
      }

      .temper {
        margin: 15px 0 0 0;
      }

      @media (-webkit-min-device-pixel-ratio: 0.75),
       (min-resolution: 120dpi) {
         // LDPI CSS HERE
      }

      @media (-webkit-min-device-pixel-ratio: 1),
       (min-resolution: 160dpi) {
       // MDPI CSS HERE
      }

      @media (-webkit-min-device-pixel-ratio: 1.33),
       (min-resolution: 213dpi) {
       // TVDPI CSS HERE
      }

      @media (-webkit-min-device-pixel-ratio: 1.5),
       (min-resolution: 240dpi) {
       // HDPI CSS HERE
      }

      @media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 320dpi) {
       // XHDPI CSS HERE
      }

      @media (-webkit-min-device-pixel-ratio: 3),
       (min-resolution: 480dpi) {
       // XXHDPI CSS HERE
      }

      @media (-webkit-min-device-pixel-ratio: 4),
       (min-resolution: 640dpi) {
       // XXXHDPI CSS HERE
      }

      @keyframes bounce {
        from { transform: translate3d(0, 0, 0);     }
        to   { transform: translate3d(0, 30px, 0); }
      }

      @-webkit-keyframes bounce {
        from { transform: translate3d(0, 0, 0);     }
        to   { transform: translate3d(0, 30px, 0); }
      }

      .arrow {
        -webkit-animation: bounce 2s;
        -webkit-animation-direction: alternate;
        -webkit-animation-iteration-count: infinite;

        animation: bounce 2s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
      }

      </style>
      <paper-spinner active$="[[loading]]"></paper-spinner>
      <weather-icons></weather-icons>
      <div class$="paper-material container paper-font-subhead [[trenutno.vreme.zdaj_slika_new]] [[trenutno.vreme.zdaj_pojav_new]]" id="container" elevation="2">
        <div class="aligner">
          <blockquote class="paper-font-title">[[trenutno.pregovor]]</blockquote>
        </div>
        <template is="dom-if" if="{{trenutno.vreme.zdaj}}">
        <div class="flex">
          <div class="flexchild">
          <div class="text-center paper-font-title">
          <iron-icon class="wind" icon="bazdara-icons:wind"></iron-icon> <live-wind-name name$="[[live.currentWindDirection]]"></live-wind-name>
          </div>
          </div>
          <div class="flexchild">
          <div class="text-center">
            [[trenutno.vreme.zdaj]] [[trenutno.vreme.zdaj2]]
          </div>
          </div>
        </div>

        <div class="flex2">
          <div class="flexchild text-center">
            <live-wind-speed-beufort id="speedname" speed$="[[live.currentWindSpeed]]"></live-wind-speed-beufort><br>
            <live-wind-speed-name id="speedname" speed$="[[live.currentWindSpeed]]"></live-wind-speed-name>
            <div class="text-center temper paper-font-display3">[[live.temperatureAir]]°<span class="paper-font-headline">C</span></div>

          </div>
          <div class="flexchild">
            <div class="icons">
              <iron-icon icon$="[[trenutno.vreme.zdaj_slika_new]]:0"  class="vreme_zdaj1"></iron-icon>
              <iron-icon icon$="[[trenutno.vreme.zdaj_pojav_new]]:0" class="vreme_zdaj2"></iron-icon>
            </div>
          </div>
        </div>
        <div class="text-center paper-font-title">
        <iron-icon icon="bazdara-icons:wave"></iron-icon> <live-sea-name name$="[[live.wavesHeight]]"></live-sea-name>
        </div>
        </template>
      </div>
    `;
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      }
    };
  }

  static get observers() {
    return ["loader(trenutno.vreme.zdaj)"];
  }

  ready() {
    super.ready();
  }

  loader() {
    this.loading = false;
  }
}

window.customElements.define("live-current", LiveCurrent);
