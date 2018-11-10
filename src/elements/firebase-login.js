import {html, PolymerElement} from "@polymer/polymer/polymer-element";

import "@fabricelements/skeleton-auth/skeleton-auth.js";

// Create an element with the ReduxMixin
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
