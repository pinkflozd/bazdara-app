import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import {afterNextRender} from "@polymer/polymer/lib/utils/render-status.js";

import firebase from "firebase/app";
import "firebase/database";

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

class FirebaseTrenutno extends PolymerElement {
  static get template() {
    return html`
      <app-localstorage-document key="trenutno" data="{{trenutno}}"></app-localstorage-document>
    `;
  }

  static get properties() {
    return {
      trenutno: {
        type: Object,
        notify: true
      }
    };
  }

  constructor() {
    super();

    //afterNextRender(this, function() {

    var databaseRef = firebase.database().ref();
    var trenutnoRef = databaseRef.child("trenutno");

    trenutnoRef.on(
      "value",
      function(trenutno) {
        this.trenutno = trenutno.val();
      }.bind(this)
    );

    //});
  }
}

window.customElements.define("firebase-trenutno", FirebaseTrenutno);
