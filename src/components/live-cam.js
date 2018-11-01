import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import '../elements/geo-location.js';
import '../elements/fullscreen-api.js';
import '../elements/fullscreen-icon-button.js';


firebase.database().ref('camera/').on('value', function (snapshot) {
        console.log(snapshot.val())
});
firebase.database().ref('camera/kanegra').on('value', function (snapshot) {
        console.log(snapshot.val())
});

class LiveCam extends PolymerElement {

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <fullscreen-icon-button></fullscreen-icon-button>
      <geo-location latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>
      <ul>
        <li>Latitude: [[latitude]]</li>
        <li>Longitude: [[longitude]]</li>
      </ul>
    `;
  }

  static get properties() {
    return {

    };
  }

  static get observers() {
    return [

    ];
  }



}

window.customElements.define('live-cam', LiveCam);
