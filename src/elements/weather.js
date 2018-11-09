/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<iron-iconset-svg name="weather" size="64">
  <svg>
    <defs>
    <style>
    /*
    ** RAIN
    */
    @keyframes am-weather-rain {
      0% {
        stroke-dashoffset: 0;
      }

      100% {
        stroke-dashoffset: -100;
      }
    }

    .am-weather-rain-1 {
      -webkit-animation-name: am-weather-rain;
         -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-duration: 8s;
         -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
         -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
         -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }
          </style>

        <g id="rainy-4">
            <g transform="translate(20,10)">
                <g>
                    <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
                </g>
            </g>
            <g transform="translate(37,45), rotate(10)">
                <line class="am-weather-rain-1" fill="none" stroke="#91C0F8" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(-6,1)" x1="0" x2="0" y1="0" y2="8" />
            </g>
        </g>
</defs>
  </svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);