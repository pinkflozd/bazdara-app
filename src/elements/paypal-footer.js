import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-icon/iron-icon.js";
import "../bazdara-icons.js";

/**
 * @polymer
 * @extends HTMLElement
 */
class PaypalFooter extends PolymerElement {
  static get template() {
    return html `
    <style>
    :host {
      display: block;
    }
    .premium {
          background-color: var(--primary-color);
          color: var(--dark-theme-text-color);
          width:140px;
          margin: 0 auto 10px auto;
          display:block;
          text-align: center;
        }

    .mock {
      height: 47px;
    }
    </style>
    <paper-button class="premium" raised on-tap="_userDonate" hidden$\="{{userdata.donate.donate}}"><iron-icon icon="bazdara-icons:membership"></iron-icon> Premium</paper-button>
    <div hidden$\="{{!userdata.donate.donate}}" class="mock"></div>
    `;
  }

  static get properties() {
    return {
      userdata: {
        type: Object
      }
    };
  }

  _userDonate() {
    /* jshint ignore:start */
    import("./elements/paypal-donate.js").then(
      function () {
        if (!this.$.drawer.persistent) {
          this.$.drawer.close();
        }
        this.$.userdonate.open();
      }.bind(this)
    );
    /* jshint ignore:end */
  }

}

window.customElements.define("paypal-footer", PaypalFooter);
