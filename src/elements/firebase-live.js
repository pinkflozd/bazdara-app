import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';

import firebase from 'firebase/app';
import 'firebase/database';

import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

class FirebaseLive extends PolymerElement {
  static get template() {
    return html `
      <app-localstorage-document key="live" data="{{live}}"></app-localstorage-document>
    `;
  }

  static get properties() {
    return {
      live: {
        type: Object,
        notify: true
      }
    };
  }

  constructor() {
    super();

  //  afterNextRender(this, function() {

      var databaseRef = firebase.database().ref();
      var liveRef = databaseRef.child("live");

      liveRef.on('value', function(live) {
        this.live = live.val();
      }.bind(this));

//    });

  }
}

window.customElements.define('firebase-live', FirebaseLive);
