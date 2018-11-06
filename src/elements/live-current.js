import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';

import '../bazdara-icons.js';
import '../shared-styles.js';
import './weather-icons.js';
import './live-wind-name.js';
import './live-wind-speed-name.js';
import './live-wind-direction.js';


class LiveCurrent extends PolymerElement {

  static get importMeta() {
    return import.meta;
  }

  static get template() {
    return html `
      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
      :host {
        display: block;
      }

      .aligner {
        display: flex;
        align-items: center;
        justify-content: center;
        height:90px
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
        text-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        padding:10px;
        color: #ffffff;
        padding-top: 64px;
        height: calc(100vh - 138px);
        background-color: var(--primary-color);
        background-image: url("../../images/background/xxxhdpi/illustration_broken_clouds_day.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
      }

      .container {
        @supports (-webkit-appearance:none) {
          .os-android & {
            height: calc(100vh - 194px);
          }
        }
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
        margin-top: -3px
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

      </style>
      <weather-icons></weather-icons>
      <div class="paper-material container" elevation="2">
        <div class="aligner">
          <blockquote class="paper-font-title">[[trenutno.pregovor]]</blockquote>
        </div>

        <div class="flex">
          <div class="flexchild">
          <div class="text-center paper-font-title">
          <iron-icon class="wind" icon="bazdara-icons:wind"></iron-icon> <live-wind-name name$="[[live.currentWindDirection]]"></live-wind-name>
          </div>
          </div>
          <div class="flexchild">
          <div class="text-center paper-font-subhead">
            [[trenutno.vreme.zdaj]] [[trenutno.vreme.zdaj2]]
          </div>
          </div>
        </div>

        <div class="flex2">
          <div class="flexchild">
          <live-wind-direction direction$="[[live.currentWindDirection]]"></live-wind-direction>
            <div class="text-center paper-font-display3">[[live.temperatureAir]]°<span class="paper-font-headline">C</span></div>
          </div>
          <div class="flexchild">
            <div class="icons">
              <iron-icon icon$="[[trenutno.vreme.zdaj_slika_new]]:0" class="vreme_zdaj1"></iron-icon>
              <iron-icon icon$="[[trenutno.vreme.zdaj_pojav_new]]:0" class="vreme_zdaj2"></iron-icon>
            </div>
          </div>
        </div>
        <div class="text-center">
          <iron-icon icon="bazdara-icons:wind"></iron-icon> <strong><live-wind-name name$="[[live.currentWindDirection]]"></live-wind-name></strong>
        </div>

        <iron-icon icon="bazdara-icons:barometer"></iron-icon> <live-wind-direction direction$="[[live.currentWindDirection]]"></live-wind-direction>
        <iron-icon icon="bazdara-icons:waterdrop"></iron-icon>
        <live-wind-speed-name speed$="[[live.currentWindSpeed]]"></live-wind-speed-name>

      </div>
    `;
  }

  static get properties() {
    return {

    };
  }

  static get observers() {
    return [
    ];
  }

  ready() {
    super.ready();
  }

}

window.customElements.define('live-current', LiveCurrent);
