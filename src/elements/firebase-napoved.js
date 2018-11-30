import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
//import {afterNextRender} from "@polymer/polymer/lib/utils/render-status.js";

import firebase from "firebase/app";
import "firebase/database";

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

/**
* @polymer
* @extends HTMLElement
*/
class FirebaseNapoved extends PolymerElement {
  static get template() {
    return html`
      <app-localstorage-document key="napoved" data="{{napoved}}"></app-localstorage-document>
    `;
  }

  static get properties() {
    return {
      napoved: {
        type: Object,
        notify: true
      }
    };
  }

  constructor() {
    super();

    //afterNextRender(this, function() {

    var databaseRef = firebase.database().ref();
    var napovedRef = databaseRef.child("napoved");

    napovedRef.on(
      "value",
      function(napoved) {
        this.napoved = napoved.val();
      }.bind(this)
    );

    //});
  }
}

window.customElements.define("firebase-napoved", FirebaseNapoved);
