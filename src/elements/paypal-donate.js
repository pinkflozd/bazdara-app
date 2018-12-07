import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import "./paypal-button-express.js";

import firebase from "firebase/app";
import "firebase/database";

//import {afterNextRender} from "@polymer/polymer/lib/utils/render-status.js";

//import firebase from "firebase/app";
//import "firebase/database";
/**
 * @polymer
 * @extends HTMLElement
 */
class PaypalDonate extends PolymerElement {
  static get template() {
    return html `
    <style>
    p {
      padding: 0 10px;
    }
    #dropdown {
      width: 130px;
      margin: 0 auto;
    }
    </style>
<p>Z donacijo podpirate stran in pridobite dostop do več podatkov, hitrejše osvežitve podatkov v živo, zemljevide z možnostjo dodajanja pozicije.</p>
<div id="dropdown">
<paper-dropdown-menu label="Znesek donacije">
  <paper-listbox slot="dropdown-content" attr-for-selected="name" selected="{{donation}}">
    <paper-item name="2.00">2 €</paper-item>
    <paper-item name="3.00">3 €</paper-item>
    <paper-item name="4.00">4 €</paper-item>
    <paper-item name="5.00">5 €</paper-item>
    <paper-item name="10.00">10 €</paper-item>
    <paper-item name="20.00">20 €</paper-item>
    <paper-item name="50.00">50 €</paper-item>
  </paper-listbox>
</paper-dropdown-menu>
</div>

<paypal-button-express
  sandbox
  sandbox-id="AUUVoTTW9X5g38tMtb0KApwXq5ndbIn7fh7Zq6y_x2lFVALyJ4eY62U6e_YlAyoeiJAYPDpGGOAnCiY4"
  production-id="AYN342IlroawAH5h8PybX2Cn2iDObOyXOY7WzjEl4sO6PCxbXIAZlzbPthKhOUM8Lz2cJswmvVadtb4b"
  amount="{{donation}}"
  reference="Bazdara"
  response="{{response}}"
></paypal-button-express>
    `;
  }

  static get properties() {
    return {
      user: {
        type: Object
      },
      donation: {
        type: String,
        value: '5.00'
      },
      response: {
        type: Object,
        observer: 'paypal'
      }
    };
  }

  paypal() {
    if ((this.response.paymentID) && (this.user.uid)) {
      //console.log(this.response);
      firebase.database().ref('users/' + this.user.uid + '/donate').set({
        donate: true,
        payment: this.response.paymentID,
        value: this.donation
      });
    }

  }

}

window.customElements.define("paypal-donate", PaypalDonate);
