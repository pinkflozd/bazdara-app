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
} from "@polymer/polymer/polymer-element.js";
import {
  afterNextRender
} from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-ripple/paper-ripple.js";

import firebase from "firebase/app";
import "firebase/storage";

import "../shared-styles.js";

/**
 * @polymer
 * @extends HTMLElement
 */
class ForecastImg extends PolymerElement {
  static get template() {
    return html `

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        .outer {
          margin: 10px 10px 0px 10px;
        }

        .outer2 {
          margin: 10px;
        }

        .img {
          max-width: 100%;
        }
      </style>
      <div class="outer">
        <div style="position: relative">
          <img id="danes" src="" class="img paper-material" on-tap="_tap" elevation="1">
          <paper-ripple></paper-ripple>
        </div>

      </div>
      <div class="outer2">
        <div style="position: relative">
          <img id="jutri" src="" class="img paper-material" on-tap="_tap" elevation="1">
          <paper-ripple></paper-ripple>
        </div>
      </div>

    `;
  }

  ready() {
    super.ready();
  }

  _tap(e) {
    // document.getElementById(e.target.id)
    if (this.fullscreenAvailable) {
      var elem;
      if (e.target.id === "danes") {
        elem = this.$.danes;
      } else {
        elem = this.$.jutri;
      }
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }

  }

  constructor() {
    super();

    afterNextRender(this, function () {

      this.fullscreenAvailable =
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled ? true : false;


      var storageRef = firebase.storage().ref();

      var danes = this.$.danes;

      storageRef.child('eu_danes.jpg').getDownloadURL().then(function (url) {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.send();

        danes.src = url;
      }).catch(function (error) {
        // Handle any errors
      });

      var jutri = this.$.jutri;

      storageRef.child('eu_jutri.jpg').getDownloadURL().then(function (url) {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.send();

        jutri.src = url;
      }).catch(function (error) {
        // Handle any errors
      });

    });
  }
}

window.customElements.define("forecast-img", ForecastImg);
