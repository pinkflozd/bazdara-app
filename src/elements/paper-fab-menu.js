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
import './paper-fab-menu-item.js';

/**
 * Material design: [Floating Action Button](https://www.google.com/design/spec/components/buttons-floating-action-button.html)
 *
 * A floating action button represents the primary action in an application.
 *
 * Use the `<paper-fab-menu>` to display menu-like fab buttons and to promote actions.
 *
 * ### Example
 *
 * ```html
 * <paper-fab-menu color="teal" icon="add">
 * <paper-fab-menu-item color="teal" tooltip="Favorites" icon="star"></paper-fab-menu-item>
 * <paper-fab-menu-item color="teal" tooltip="Favorites" icon="star"></paper-fab-menu-item>
 * <paper-fab-menu-item color="teal" tooltip="Favorites" icon="star"></paper-fab-menu-item>
 * </paper-fab-menu>
 * ```
 *
 * ### Icons
 *
 * Import your `iron-icons` library and use icons you like.
 *
 * ```html
 * <link rel="import" href="bower_components/iron-icons/iron-icons.html">
 * <paper-fab-menu icon="add"></paper-fab-menu>
 * ```
 *
 * ### Styling
 * Style the menu using `<paper-fab>` variables and mixins.
 *
 * @customElement
 * @polymer
 * @extends HTMLElement
 */
class PaperFabMenu extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      width: 60px;
    }

    .menu-fab-button {
      padding-top: 8px;
    }

    .main-items ::slotted(a) {
      display: block;
      margin: 0px;
      text-decoration: none;
    }

    .main-items ::slotted(paper-fab-menu-item) {
      margin: 4px;
    }

    .main-items {
      @apply --layout-vertical;
      @apply --layout-flex;
      @apply --layout-self-center;
      -webkit-flex-basis: 0%;
      flex-basis: 0%;
    }

    .main-items.fix-safari {
      flex-basis: auto;
    }

    .menu-fab-button {
      @apply --layout-vertical;
      @apply --layout-self-center;
    }

    .paper-fab-menu-container {
      @apply --layout-vertical;
    }

    :host(:not([children-visible])) .main-items {
      display: none;
    }

    paper-fab {
      --paper-fab-iron-icon: {
        transition: 200ms all;
        transform : rotate(0deg);
      };
    }

    paper-fab[opened] {
      --paper-fab-iron-icon: {
        transition: 200ms all;
        transform : rotate(45deg);
      };
    }
    </style>
    <div class="paper-fab-menu-container">
      <div class\$="main-items [[_computeContentClass(safari)]]">
        <slot id="items" slot="content"></slot>
      </div>
      <div class="menu-fab-button">
        <paper-fab id="paperFab" icon="[[icon]]" opened\$="[[opened]]"></paper-fab>
      </div>
    </div>
`;
  }

  static get properties() {
    return {
      /**
       * Vertical or horizontal position of the menu.
       */
      position: {
        type: String,
        value: 'vertical'
      },
      // True when the menu is opened.
      opened: {
        type: Number,
        value: false,
        notify: true,
        observer: '_openedChanged'
      },
      /**
       * The color of the main button.
       */
      color: {
        type: String,
        observer: '_colorChanged'
      },
      // The icon to render. It's binded to `paper-fab`'s icon property.
      icon: String,
      /**
       * Computed value of the delay time when the list child is
       * opened / closed.
       */
      _delayTime: Number,
      // If true then the children container is displayed.
      childrenVisible: {
        type: Boolean,
        readOnly: true,
        reflectToAttribute: true
      },
      // Tru if it's a Safari which need a fix...
      safari: {
        type: Boolean,
        value: function() {
          var ua = navigator.userAgent.toLowerCase();
          return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
        }
      }
    };
  }

  constructor() {
    super();
    this._detectClick = this._detectClick.bind(this);
    this._testOpen = this._testOpen.bind(this);
    this._testClose = this._testClose.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseover', this._testOpen);
    this.addEventListener('mouseout', this._testClose);
    document.body.addEventListener('click', this._detectClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseover', this._testOpen);
    this.removeEventListener('mouseout', this._testClose);
    document.body.removeEventListener('click', this._detectClick);
  }

  // Toogles the menu
  toggle() {
    this.opened = !this.opened;
  }

  // Tests if the menu should be opened and opens it if nescesary
  _testOpen() {
    if (this.__closingDebouncer) {
      clearTimeout(this.__closingDebouncer);
      this.__closingDebouncer = undefined;
    }
    if (this.opened) {
      return;
    }
    this.opened = true;
  }

  // Tests if the menu should be closed and closes it if nescesary
  _testClose() {
    if (this.__closingDebouncer) {
      return;
    }
    this.__closingDebouncer = setTimeout(() => {
      this.opened = false;
      this.__closingDebouncer = undefined;
    }, 20);
  }

  // Opens or closes the menu depending on the argument.
  _openedChanged(opened) {
    const children = Array.from(this.shadowRoot.querySelector('slot').assignedNodes());
    if (!opened) {
      children.reverse();
      this._updateDelay(children, opened);
    } else {
      this._updateDelay(children, opened);
      this._setChildrenVisible(true);
    }
    setTimeout(() => {
      this._updateChildrenState(children, opened);
    }, 1);

    if (!opened) {
      setTimeout(() => {
        this._setChildrenVisible(false);
      }, this._delayTime + 1);
    }
  }

  /**
   * Changes children opened state
   */
  _updateChildrenState(children, opened) {
    children.forEach((child) => {
      child = this.__ensureMenuItem(child);
      if (!child) {
        return;
      }
      if (child && opened) {
        child.opened = true;
      } else {
        child.opened = false;
      }
    });
  }

  // Updates animation delay time attribute in distributed children.
  _updateDelay(children) {
    let time = 0;
    for (let i = children.length - 1; i >= 0; i--) {
      const child = this.__ensureMenuItem(children[i]);
      if (!child) {
        continue;
      }
      child.transitionDelay = time;
      time += 50;
    }
    this._delayTime = time;
  }
  /**
   * Ensures that the node is the `paper-fab-menu-item`. If the element
   * is an anchor then it will look in the children.
   * If the `paper-fab-menu-item` this function returns null;
   *
   * @param {HTMLElement} node Current node.
   * @return A menu item or null if not found.
   */
  __ensureMenuItem(node) {
    if (!node || !node.nodeName) {
      return;
    }
    if (node.nodeName === 'A') {
      if (!node.children) {
        return;
      }
      let found = false;
      for (let i = 0, len = node.children.length; i < len; i++) {
        const _ = node.children[i];
        if (_ && _.nodeName && _.nodeName === 'PAPER-FAB-MENU-ITEM') {
          node = _;
          found = true;
          break;
        }
      }
      if (!found) {
        return null;
      }
    }
    return node;
  }

  // Called when color has changed.
  _colorChanged(color) {
    this.updateStyles({
      '--paper-fab-background': color
    });
    // For some reason code above do not affect main fab at bootstrap time.
    this.$.paperFab.style.backgroundColor = color;
  }

  // Closes menu on body click - outside this control.
  _detectClick(e) {
    if (!e.path || !e.path.length) {
      return;
    }
    let isMainButton = false;
    for (let i = 0, len = e.path.length; i < len; i++) {
      if (e.path[i] === this) {
        isMainButton = true;
      }
    }
    if (isMainButton) {
      if (!this.opened) {
        this.opened = true;
      }
      return;
    }
    if (this.opened) {
      this.opened = false;
    }
  }

  _computeContentClass(safari) {
    return safari ? 'fix-safari' : '';
  }
}
window.customElements.define("paper-fab-menu", PaperFabMenu);
