import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import {afterNextRender} from "@polymer/polymer/lib/utils/render-status.js";

import firebase from "firebase/app";
import "firebase/database";

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

/**
* @polymer
* @extends HTMLElement
*/
class FirebaseTide extends PolymerElement {
  static get template() {
    return html`
    <app-localstorage-document key="tide" data="{{tides}}"></app-localstorage-document>
    <app-localstorage-document key="tiden" data="{{tiden}}"></app-localstorage-document>
    <app-localstorage-document key="tided" data="{{tided}}"></app-localstorage-document>
    `;
  }

  static get properties() {
    return {
      tide: {
        type: Object,
        notify: true
      },
      tides: {
        type: Object,
      },
      tiden: {
        type: String,
        notify: true
      },
      start: {
        type: String
      },
      end: {
        type: String
      },
    };
  }

  constructor() {
    super();

      afterNextRender(this, function() {

      var d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      var prev = Date.parse(d) - 3600000;

      var starter = prev - 86400000;
      var ender;
      if (screen.width < 770) {
        ender = prev + 1209600000;
      } else if (screen.width > 769) {
        ender = prev + 2592000000;
      }

      var start = starter / 100000;
      this.start = start.toString();
      var end = ender / 100000;
      this.end = end.toString();

    var databaseRef = firebase.database().ref();

    var tidenRef = databaseRef.child("trenutno/vodostaj");

    tidenRef.on(
      "value",
      function(tiden) {
        this.tiden = tiden.val();
      }.bind(this)
    );

    if (this.tided != this.start) {
      this.tided = this.start;
      var tideRef = databaseRef.child("plimovanje/koper").orderByKey().startAt(this.start).endAt(this.end);

      tideRef.on(
        "value",
        function(tide) {
          this.tide = tide.val();
          this.tides = tide.val();
        }.bind(this)
      );
    } else {
      this.tide = this.tides;
    }

    });
  }
}

window.customElements.define("firebase-tide", FirebaseTide);
