import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";
import "../bazdara-icons.js";
import "./geo-location.js";

/**
* @polymer
* @extends HTMLElement
*/
class GeoButton extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        display: block;
      }
      </style>

      <paper-icon-button icon="[[icon]]" disabled="[[disabled]]" hidden="[[data]]" on-tap="_click" aria-label="GPS Location"></paper-icon-button>
      <app-localstorage-document key="geo" data="{{data}}"></app-localstorage-document>
      <geo-location latitude="{{latitude}}" longitude="{{longitude}}" idle="{{idle}}"></geo-location>
    `;
  }

  static get properties() {
    return {
      data: {
        observer: "changed",
        type: Boolean
      },
      latitude: {
        type: Number,
        notify: true
      },
      /**
       * The longitude of the current position.
       */
      longitude: {
        type: Number,
        notify: true
      }
    };
  }

  constructor() {
    super();

    this.idle = true;

    if ("geolocation" in navigator) {
      this.disabled = false;
      this.icon = "bazdara-icons:location-off";
    } else {
      this.disabled = true;
      this.icon = "bazdara-icons:location-off";
    }
  }

  changed() {
    if ("geolocation" in navigator) {
      if (this.data === true) {
        this.idle = false;
        this.icon = "bazdara-icons:location-on";
      }
    }
  }

  _click() {
    if (this.disabled === false) {
      this.data = true;
    }
  }

  ready() {
    super.ready();
  }
}

window.customElements.define("geo-button", GeoButton);
