import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
//import {afterNextRender} from "@polymer/polymer/lib/utils/render-status.js";

import firebase from "firebase/app";
import "firebase/database";

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

/**
* @polymer
* @extends HTMLElement
*/
class FirebaseUser extends PolymerElement {
  static get template() {
    return html`
      <app-localstorage-document key="userdata" data="{{userdata}}"></app-localstorage-document>
      <app-localstorage-document key="uid" data="{{uid}}"></app-localstorage-document>
    `;
  }

  static get properties() {
    return {
      userdata: {
        type: Object,
        notify: true
      },
      uid: {
        type: String,
        observer: '_users'
      },
    };
  }

  _users() {

    //  afterNextRender(this, function() {

      var databaseRef = firebase.database().ref();
      var userdataRef = databaseRef.child("users/" + this.uid);

      userdataRef.on(
        "value",
        function(userdata) {
          this.userdata = userdata.val();
        }.bind(this)
      );

      //    });
  }

  constructor() {
    super();
  }
}

window.customElements.define("firebase-user", FirebaseUser);
