import {html, PolymerElement} from "@polymer/polymer/polymer-element";

import "@fabricelements/skeleton-auth/skeleton-auth.js";

/**
* @polymer
* @extends HTMLElement
*/
class FirebaseLogin extends PolymerElement {
  static get template() {
    return html`
            <skeleton-auth
                     google
                     facebook
                     email
                     phone
                     popup
                     signed-in="{{signedIn}}"
                     user="{{user}}"></skeleton-auth>
        `;
  }
}

// Define the Element
customElements.define("firebase-login", FirebaseLogin);
