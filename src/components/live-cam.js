import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

import './elements/geo-location.js';

class LiveCam extends PolymerElement {

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <geo-location latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>
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



}

window.customElements.define('live-cam', LiveCam);
