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
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/iron-icon/iron-icon.js';

import '../shared-styles.js';

class LiveDetails extends PolymerElement {
  static get template() {
    return html `

      <style include="paper-material-styles iron-flex iron-flex-alignment shared-styles">
        :host {
          display: block;
          padding:10px 10px 0px 10px
        }
        .paper-material {
          background-color:#FFFFFF;
          padding:10px;
        }
        .flex-horizontal-with-ratios {
          margin-top: 5px;
          @apply --layout-horizontal;
        }
        .flexchild {
          @apply --layout-flex;
          color: var(--secondary-text-color)
        }
        .metric {
          color: var(--secondary-text-color)
        }
        .flex2child {
          @apply --layout-flex;
        }
        .flex3child {
          @apply --layout-flex;
        }
        h2 {
          margin-bottom:10px
        }
        iron-icon {
          height: 18px;
          width: 18px;
        }
      </style>

      <iron-iconset-svg name="details" size="24">
        <svg>
          <defs>
            <g id="barometer">
              <path d="M 15.375 7.464844 C 15.328125 7.484375 14.277344 7.878906 13.121094 8.371094 C 10.925781 9.304688 10.332031 9.738281 10.058594 10.011719 C 8.960938 11.109375 8.960938 12.890625 10.058594 13.988281 C 10.605469 14.535156 11.328125 14.8125 12.046875 14.8125 C 12.765625 14.8125 13.488281 14.535156 14.035156 13.988281 C 14.308594 13.714844 14.742188 13.121094 15.675781 10.925781 C 16.167969 9.769531 16.5625 8.71875 16.582031 8.671875 C 16.710938 8.328125 16.625 7.941406 16.367188 7.679688 C 16.105469 7.421875 15.71875 7.335938 15.375 7.464844 Z M 12.710938 12.664062 C 12.34375 13.027344 11.75 13.027344 11.382812 12.664062 C 11.019531 12.296875 11.019531 11.703125 11.382812 11.335938 C 11.628906 11.097656 12.738281 10.570312 14.023438 10.027344 C 13.476562 11.308594 12.949219 12.417969 12.710938 12.664062 Z M 12.710938 12.664062 "/>
              <path d="M 20.484375 3.515625 C 18.21875 1.25 15.207031 0 12 0 C 8.792969 0 5.78125 1.25 3.515625 3.515625 C 1.25 5.78125 0 8.792969 0 12 C 0 15.207031 1.25 18.21875 3.515625 20.484375 C 5.78125 22.75 8.792969 24 12 24 C 14.195312 24 16.339844 23.402344 18.210938 22.269531 C 18.652344 22.003906 18.792969 21.425781 18.523438 20.984375 C 18.257812 20.539062 17.679688 20.398438 17.238281 20.667969 C 15.664062 21.621094 13.851562 22.125 12 22.125 C 9.167969 22.125 6.605469 20.957031 4.769531 19.078125 L 21.046875 19.078125 C 21.070312 19.078125 21.089844 19.078125 21.113281 19.074219 C 21.441406 19.101562 21.769531 18.953125 21.96875 18.660156 C 23.296875 16.671875 24 14.367188 24 12 C 24 8.792969 22.75 5.78125 20.484375 3.515625 Z M 20.671875 17.203125 L 3.375 17.203125 C 3.355469 17.203125 3.335938 17.203125 3.320312 17.207031 C 2.554688 15.9375 2.0625 14.488281 1.917969 12.9375 L 3.28125 12.9375 C 3.800781 12.9375 4.21875 12.519531 4.21875 12 C 4.21875 11.480469 3.800781 11.0625 3.28125 11.0625 L 1.917969 11.0625 C 2.113281 8.972656 2.941406 7.066406 4.210938 5.539062 L 5.171875 6.496094 C 5.355469 6.679688 5.59375 6.773438 5.835938 6.773438 C 6.074219 6.773438 6.316406 6.679688 6.496094 6.496094 C 6.863281 6.132812 6.863281 5.539062 6.496094 5.171875 L 5.539062 4.210938 C 7.066406 2.941406 8.972656 2.113281 11.0625 1.917969 L 11.0625 3.28125 C 11.0625 3.800781 11.480469 4.21875 12 4.21875 C 12.519531 4.21875 12.9375 3.800781 12.9375 3.28125 L 12.9375 1.917969 C 15.027344 2.113281 16.933594 2.941406 18.460938 4.210938 L 17.503906 5.171875 C 17.136719 5.539062 17.136719 6.132812 17.503906 6.496094 C 17.683594 6.679688 17.925781 6.773438 18.164062 6.773438 C 18.40625 6.773438 18.644531 6.679688 18.828125 6.496094 L 19.789062 5.539062 C 21.058594 7.066406 21.886719 8.972656 22.082031 11.0625 L 20.71875 11.0625 C 20.199219 11.0625 19.78125 11.480469 19.78125 12 C 19.78125 12.519531 20.199219 12.9375 20.71875 12.9375 L 22.082031 12.9375 C 21.941406 14.441406 21.460938 15.894531 20.671875 17.203125 Z M 20.671875 17.203125 "/>
            </g>
            <g id="waterdrop">
              <path d="M 12.464844 0.792969 C 11.832031 -0.28125 11.167969 -0.246094 10.535156 0.792969 C 7.644531 5.09375 3.269531 11.542969 3.269531 14.769531 C 3.269531 17.03125 4.195312 19.105469 5.679688 20.589844 C 7.164062 22.074219 9.238281 23 11.5 23 C 13.761719 23 15.835938 22.074219 17.320312 20.589844 C 18.804688 19.105469 19.730469 17.03125 19.730469 14.769531 C 19.730469 11.507812 15.355469 5.09375 12.464844 0.792969 Z M 17.433594 18.441406 C 16.839844 19.402344 15.984375 20.257812 14.949219 20.851562 C 14.464844 21.109375 13.871094 20.960938 13.613281 20.480469 C 13.316406 19.960938 13.503906 19.367188 13.984375 19.105469 C 14.726562 18.699219 15.320312 18.105469 15.761719 17.402344 C 16.207031 16.699219 16.46875 15.882812 16.503906 15.027344 C 16.542969 14.472656 16.988281 14.066406 17.542969 14.101562 C 18.097656 14.140625 18.507812 14.585938 18.46875 15.140625 C 18.394531 16.328125 18.023438 17.4375 17.433594 18.441406 Z M 17.433594 18.441406 "/>
            </g>
            <g id="sunrise">
              <path d="M 22.375 13.636719 L 23.980469 12.003906 L 21.480469 9.460938 L 22.378906 6 L 18.9375 5.054688 L 17.992188 1.605469 L 14.539062 2.507812 L 12 0 L 9.460938 2.507812 L 6.007812 1.605469 L 5.0625 5.054688 L 1.621094 6 L 2.519531 9.460938 L 0.0195312 12.003906 L 1.625 13.636719 L 0 13.636719 L 0 15.046875 L 24 15.046875 L 24 13.636719 Z M 1.992188 12.003906 L 4.082031 9.878906 L 3.332031 6.992188 L 6.207031 6.199219 L 6.996094 3.320312 L 9.878906 4.070312 L 12 1.976562 L 14.121094 4.070312 L 17.003906 3.320312 L 17.792969 6.199219 L 20.667969 6.992188 L 19.917969 9.878906 L 22.007812 12.003906 L 20.402344 13.636719 L 18.070312 13.636719 C 18.210938 13.109375 18.28125 12.5625 18.28125 12.003906 C 18.28125 8.535156 15.464844 5.710938 12 5.710938 C 8.535156 5.710938 5.71875 8.535156 5.71875 12.003906 C 5.71875 12.5625 5.789062 13.109375 5.929688 13.636719 L 3.597656 13.636719 Z M 7.125 12.003906 C 7.125 9.3125 9.3125 7.117188 12 7.117188 C 14.6875 7.117188 16.875 9.3125 16.875 12.003906 C 16.875 12.570312 16.78125 13.117188 16.597656 13.636719 L 7.402344 13.636719 C 7.21875 13.117188 7.125 12.570312 7.125 12.003906 Z M 7.125 12.003906 "/>
              <path d="M 8.730469 19.511719 L 9.726562 20.507812 L 11.296875 18.933594 L 11.296875 24 L 12.703125 24 L 12.703125 18.933594 L 14.273438 20.507812 L 15.269531 19.511719 L 12 16.234375 Z M 8.730469 19.511719 "/>
            </g>
            <g id="sunset">
              <path d="M 24 15.183594 L 24 13.777344 L 22.394531 13.777344 L 23.980469 12.167969 L 21.480469 9.628906 L 22.378906 6.175781 L 18.9375 5.230469 L 17.992188 1.792969 L 14.539062 2.6875 L 12 0.1875 L 9.460938 2.6875 L 6.007812 1.792969 L 5.0625 5.230469 L 1.621094 6.175781 L 2.519531 9.628906 L 0.0195312 12.167969 L 1.605469 13.777344 L 0 13.777344 L 0 15.183594 L 11.296875 15.183594 L 11.296875 21.140625 L 9.726562 19.570312 L 8.730469 20.5625 L 12 23.832031 L 15.269531 20.5625 L 14.273438 19.570312 L 12.703125 21.140625 L 12.703125 15.183594 Z M 7.125 12.167969 C 7.125 9.480469 9.3125 7.292969 12 7.292969 C 14.6875 7.292969 16.875 9.480469 16.875 12.167969 C 16.875 12.722656 16.785156 13.265625 16.605469 13.777344 L 7.394531 13.777344 C 7.214844 13.265625 7.125 12.722656 7.125 12.167969 Z M 1.992188 12.167969 L 4.082031 10.046875 L 3.332031 7.164062 L 6.207031 6.375 L 6.996094 3.5 L 9.878906 4.25 L 12 2.160156 L 14.121094 4.25 L 17.003906 3.5 L 17.792969 6.375 L 20.667969 7.164062 L 19.917969 10.046875 L 22.007812 12.167969 L 20.421875 13.777344 L 18.074219 13.777344 C 18.210938 13.257812 18.28125 12.71875 18.28125 12.167969 C 18.28125 8.703125 15.464844 5.886719 12 5.886719 C 8.535156 5.886719 5.71875 8.703125 5.71875 12.167969 C 5.71875 12.71875 5.789062 13.257812 5.925781 13.777344 L 3.578125 13.777344 Z M 1.992188 12.167969 "/>
            </g>
            <g id="eye">
              <path d="M 23.847656 11.53125 C 23.632812 11.238281 18.523438 4.351562 12 4.351562 C 5.476562 4.351562 0.367188 11.238281 0.152344 11.53125 C -0.0507812 11.8125 -0.0507812 12.1875 0.152344 12.46875 C 0.367188 12.761719 5.476562 19.648438 12 19.648438 C 18.523438 19.648438 23.632812 12.761719 23.847656 12.46875 C 24.050781 12.1875 24.050781 11.8125 23.847656 11.53125 Z M 12 18.066406 C 7.195312 18.066406 3.03125 13.492188 1.800781 12 C 3.03125 10.503906 7.183594 5.933594 12 5.933594 C 16.804688 5.933594 20.96875 10.503906 22.199219 12 C 20.96875 13.496094 16.816406 18.066406 12 18.066406 Z M 12 18.066406 "/>
              <path d="M 12 7.253906 C 9.382812 7.253906 7.253906 9.382812 7.253906 12 C 7.253906 14.617188 9.382812 16.746094 12 16.746094 C 14.617188 16.746094 16.746094 14.617188 16.746094 12 C 16.746094 9.382812 14.617188 7.253906 12 7.253906 Z M 12 15.164062 C 10.253906 15.164062 8.835938 13.746094 8.835938 12 C 8.835938 10.253906 10.253906 8.835938 12 8.835938 C 13.746094 8.835938 15.164062 10.253906 15.164062 12 C 15.164062 13.746094 13.746094 15.164062 12 15.164062 Z M 12 15.164062 "/>
            </g>
          </defs>
        </svg>
      </iron-iconset-svg>

      <div class="paper-material" elevation="1">
      <h2 class="paper-font-subhead">Trenutne razmere</h2>

      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
        <iron-icon icon="details:eye"></iron-icon> Vidljivost:
        </div>
        <div class="flex2child paper-font-body1">
        [[trenutno.vis]]<span class="metric">km</span>
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
        <iron-icon icon="details:barometer"></iron-icon>  Tlak:
        </div>
        <div class="flex2child paper-font-body1">
        [[trenutno.tlak]]<span class="metric">mBar</span>
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
        <iron-icon icon="details:waterdrop"></iron-icon> Vlaga:
        </div>
        <div class="flex2child paper-font-body1">
        [[trenutno.vlaga]]<span class="metric">%</span>
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
        <iron-icon icon="details:sunrise"></iron-icon> Vzhod:
        </div>
        <div class="flex2child paper-font-body1">
        [[trenutno.soncni.vzhod]]
        </div>
      </div>
      <div class="flex-horizontal-with-ratios">
        <div class="flexchild paper-font-body1">
        <iron-icon icon="details:sunset"></iron-icon> Zahod:
        </div>
        <div class="flex2child paper-font-body1">
        [[trenutno.soncni.zahod]]
        </div>
      </div>

      </div>
    `;
  }

  ready() {
    super.ready();
  }

}

window.customElements.define('live-details', LiveDetails);