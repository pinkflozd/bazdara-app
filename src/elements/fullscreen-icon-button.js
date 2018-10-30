import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  mixinBehaviors
} from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import {FullscreenBehavior} from './fullscreen-behavior.js';

/*
A simple Polymer based `paper-icon-button` Web Component that wraps the HTML5 full screen API.

It lets you define which element to display in full screen mode
(via the `target` attribute) and toggle normal/full screen
mode by calling the `toggleFullscreen()` method.

Note that this method MUST be triggered directly by user interaction
(typically in a native `onclick` or Polymer's `on-click` handler).
If no `target` is set, the whole page (more specifically
`document.documentElement`) will be displayed full screen.

The element also provides 2 read-only flags as attribute:
- `fullscreenAvailable`: set to `true` if the browser supports
   HTML5's full screen API (Safari on iOS does not).
- `fullscreen`: set to `true` if an element is currently displayed in
   full screen mode.

Usage :

    <fullscreen-icon-button></fullscreen-icon-button>


With custom icons (presuming the icon-set is correctly imported):

    <fullscreen-icon-button icon="icons:thumb-up" icon-exit="icons:thumb-down"></fullscreen-icon-button>


With styling (red background, white icon and ripple) :

    <style is="custom-style">
      fullscreen-icon-button {
        color: white;
        --paper-icon-button-ink-color: white;
        background-color: red;
        border-radius: 50%;
      }
    </style>

    <fullscreen-icon-button></fullscreen-icon-button>


### Styling

You can also use any of the `paper-icon-button`
style mixins and custom properties to style this button.

@element fullscreen-api
@blurb A simple Polymer based Web Component wrapper for the HTML5 full screen API.
@homepage https://github.com/vguillou/fullscreen-api
@demo demo/index.html

@element fullscreen-icon-button
@demo demo/index.html
*/


class FullscreenIconButton extends mixinBehaviors([FullscreenBehavior], PolymerElement) {

  static get template() {
    return html`
    <style>
      :host {
        display: block;
        width: 40px;
        height: 40px;
      }
      :host(:not([fullscreen-available])) {
        display: none;
      }
      paper-icon-button {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #fff
        @apply(--)
      }

    </style>

    <paper-icon-button id="pib" icon="[[_icon]]" alt$="[[alt]]" disabled$="[[disabled]]" noink="[[noink]]" toggles on-tap="toggleFullscreen"></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      /**
       * Icon prompting the user to go to full screen mode.
       * Specifies the icon name or index in the set of icons available in
       * the icon's icon set.
       */
      icon: {
        type: String,
        value: undefined,
        observer: '_updateIcon'
      },

      /**
       * Icon prompting the user to exit full screen mode.
       * Specifies the icon name or index in the set of icons available in
       * the icon's icon set.
       */
      iconExit: {
        type: String,
        value: undefined,
        observer: '_updateIcon'
      },

      /**
       * Specifies the alternate text for the button, for accessibility.
       */
      alt: {
        type: String,
        observer: "_altChanged"
      },

      /**
       * If true, the user cannot interact with this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        notify: true
      },

      /**
       * If true, the element will not produce a ripple effect when
       * interacted with via the pointer.
       */
      noink: {
        type: Boolean
      }
    };
  }

  static get observers() {
    return [
      '_updateIcon(fullscreen)'
    ];
  }

  _updateIcon() {
    this._icon = this.fullscreen ? this.iconExit || 'bazdara-icons:fullscreen-exit' :
      this.icon || 'bazdara-icons:fullscreen';
  }

  _altChanged(newValue, oldValue) {
    this.$.pib._altChanged(newValue, oldValue);
  }

}

window.customElements.define('fullscreen-icon-button', FullscreenIconButton);
