/**
@license
Copyright 2018 Pawel Psztyc, The ARC team

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
/**
 * The `<paper-fab-menu-item>` is a menu item that can be used with `<paper-fab-menu>`.
 *
 * It renders as a mini fab button but it's hidden. The `<paper-fab-menu>` triggers menu items when hovered.
 *
 * See `<paper-fab-menu>` for more information and demos.
 * @customElement
 * @polymer
 * @extends HTMLElement
 */
class PaperFabMenuItem extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      @apply --layout-flex;
      margin: 4px;
    }

    .menu-item {
      display: block;
      position: relative;
      transition: 300ms all cubic-bezier(0.165, 0.84, 0.44, 1);
      transform: scale(0);
    }

    .menu-item.opened {
      transform: scale(1);
    }
    </style>
    <div class\$="[[_computeMainClass(opened)]]">
     <paper-fab mini="" icon="[[icon]]" label="[[label]]"></paper-fab>
    </div>
`;
  }

  static get properties() {
    return {
      // Color of the menu item.
      color: {
        type: String,
        observer: '_colorChanged'
      },
      // The delay (in ms) before the entry / exit animation begins.
      transitionDelay: {
        type: Number,
        observer: '_updateTransitionDelay'
      },
      // Label only used with paper-fab when the icon is not present.
      label: String,
      // The icon to render. It's binded to `paper-fab`'s icon property.
      icon: String,
      /**
       * If true this item will be rendered as opened.
       * This property is used by the `paper-fab-menu` element to determine
       * control state. Do not use this property.
       */
      opened: {
        type: Boolean,
        value: false
      }
    };
  }

  _updateTransitionDelay(transitionDelay) {
    this.shadowRoot.querySelector('.menu-item').style.transitionDelay = transitionDelay + 'ms';
  }

  // Called when color has changed.
  _colorChanged(color) {
    this.updateStyles({
      '--paper-fab-background': color
    });
    // For some reason code above do not affect main fab at bootstrap.
    this.shadowRoot.querySelector('paper-fab').style.backgroundColor = color;
  }

  _computeMainClass(opened) {
    let clazz = 'menu-item';
    if (opened) {
      clazz += ' opened';
    }
    return clazz;
  }
}
window.customElements.define("paper-fab-menu-item", PaperFabMenuItem);
