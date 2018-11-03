/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

import './shared-styles.js';

import './components/live-cam.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import '@fabricelements/skeleton-auth/skeleton-auth.js';

class BazdaraHome extends PolymerElement {
  static get template() {
    return html `

      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <live-cam></live-cam>
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

window.customElements.define('bazdara-home', BazdaraHome);
