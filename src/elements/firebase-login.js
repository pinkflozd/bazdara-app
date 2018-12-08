import {html, PolymerElement} from "@polymer/polymer/polymer-element";

import "@fabricelements/skeleton-auth/skeleton-auth.js";
import firebase from "firebase/app";
import "firebase/database";
import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

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
                     popup
                     signed-in="{{signedIn}}"
                     user="{{user}}"></skeleton-auth>
                     <app-localstorage-document key="uid" data="{{user.uid}}"></app-localstorage-document>

        `;
  }

  static get properties() {
    return {
      signedIn: {
        type: Boolean
      },
      user: {
        type: Object
      }
    };
  }

  /**
    * Array of strings describing multi-property observer methods and their
    * dependant properties
    */
  static get observers() {
    return [
      '_user(signedIn, user)'
    ];
  }

  _user() {
    if ((this.signedIn) && (this.user)) {
      //console.log(this.user);
      firebase.database().ref('members/' + this.user.uid).set({
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        uid: this.user.uid
      });

      firebase.database().ref('users/' + this.user.uid + '/details').set({
        displayName: this.user.displayName,
        email: this.user.email,
        photoURL: this.user.photoURL,
        uid: this.user.uid
      });
    }
  }

}

// Define the Element
customElements.define("firebase-login", FirebaseLogin);
