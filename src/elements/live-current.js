import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/paper-styles/typography.js';

class LiveCurrent extends PolymerElement {

  static get template() {
    return html `
      <style include="paper-material-styles">
      :host {
        display: block;
      }

      .container {
        min-height: calc(100vh - 64px);
        background-image: url("../../images/background/xxxhdpi/illustration_broken_clouds_day.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
      }

      .container {
        @supports (-webkit-appearance:none) {
          .os-android & {
            min-height: calc(100vh - 56px);
          }
        }
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
      <div class="paper-material container" elevation="2">
[[live.currentWindDirection]]
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
