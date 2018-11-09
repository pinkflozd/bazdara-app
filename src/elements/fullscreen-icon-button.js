import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-icon-button/paper-icon-button.js";

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
class FullscreenIconButton extends PolymerElement {
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
        observer: "_updateIcon"
      },

      /**
       * Icon prompting the user to exit full screen mode.
       * Specifies the icon name or index in the set of icons available in
       * the icon's icon set.
       */
      iconExit: {
        type: String,
        value: undefined,
        observer: "_updateIcon"
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
      },
      /**
       * The element to display full screen, or the selector to use to automatically
       * find  the element to be displayed full screen.
       *
       * Note that changing the target while in full screen mode will not
       * have any effect, as toggling between display modes MUST be
       * triggered by user interaction.
       *
       * If `target` is not set, the whole page (more specifically
       * `document.documentElement`) will be displayed full screen.
       *
       * @attribute target
       * @type {Object|String}
       */
      target: {
        type: Object,
        value: undefined,
        notify: true
      },

      /**
       * Read-only flag (boolean) indicating if an element is being
       * displayed full screen.
       *
       * @attribute fullscreen
       * @type {boolean}
       */
      fullscreen: {
        type: Boolean,
        value: false,
        notify: true,
        readOnly: true,
        reflectToAttribute: true
      },

      /**
       * Read-only flag (boolean) indicating if full screen mode is available
       * on the browser (Safari on iOS does not support it).
       *
       * @attribute fullscreenAvailable
       * @type {boolean}
       */
      fullscreenAvailable: {
        type: Boolean,
        value: false,
        notify: true,
        readOnly: true,
        reflectToAttribute: true
      }
    };
  }

  static get observers() {
    return ["_updateIcon(fullscreen)"];
  }

  _updateIcon() {
    this._icon = this.fullscreen
      ? this.iconExit || "bazdara-icons:fullscreen-exit"
      : this.icon || "bazdara-icons:fullscreen";
  }

  _altChanged(newValue, oldValue) {
    this.$.pib._altChanged(newValue, oldValue);
  }

  /**
   * Toggle between full screen and normal display mode.
   * MUST be triggered directly by user interaction
   * (typically in a native 'onclick' or Polymer's 'on-click' handler).
   *
   * @method toggleFullscreen
   */
  toggleFullscreen() {
    if (this.fullscreenAvailable) {
      if (!this.fullscreen) {
        // We are not in full screen mode, let's request it
        // But first let's grad a hold on the target
        var targetElement =
          typeof this.target !== "string"
            ? this.target
            : document.querySelector(this.target);
        targetElement = targetElement || document.documentElement;
        if (targetElement.requestFullscreen) {
          targetElement.requestFullscreen();
        } else if (targetElement.webkitRequestFullscreen) {
          targetElement.webkitRequestFullscreen();
        } else if (targetElement.mozRequestFullScreen) {
          targetElement.mozRequestFullScreen();
        } else if (targetElement.msRequestFullscreen) {
          targetElement.msRequestFullscreen();
        }
      } else {
        // We are in full screen mode, let's exit
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }

  /**
   * Exit full screen mode (if toggled)
   *
   * @method exitFullscreen
   */
  exitFullscreen() {
    if (this.fullscreen) {
      this.toggleFullscreen();
    }
  }

  ready() {
    super.ready();

    this._setFullscreenAvailable(this._isFullscreenAvailable());
    if (this.fullscreenAvailable) {
      this._boundFullscreenChangedHandler = this._fullscreenChangedHandler.bind(
        this
      );
      document.addEventListener(
        "fullscreenchange",
        this._boundFullscreenChangedHandler
      );
      document.addEventListener(
        "webkitfullscreenchange",
        this._boundFullscreenChangedHandler
      );
      document.addEventListener(
        "mozfullscreenchange",
        this._boundFullscreenChangedHandler
      );
      document.addEventListener(
        "MSFullscreenChange",
        this._boundFullscreenChangedHandler
      );
    }
    this._fullscreenChangedHandler();
  }

  detached() {
    if (this._boundFullscreenChangedHandler) {
      document.removeEventListener(
        "fullscreenchange",
        this._boundFullscreenChangedHandler
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        this._boundFullscreenChangedHandler
      );
      document.removeEventListener(
        "mozfullscreenchange",
        this._boundFullscreenChangedHandler
      );
      document.removeEventListener(
        "MSFullscreenChange",
        this._boundFullscreenChangedHandler
      );
    }
  }

  _fullscreenChangedHandler() {
    this._setFullscreen(this._isFullscreenToggled());
  }

  _isFullscreenAvailable() {
    return document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
      ? true
      : false;
  }

  _isFullscreenToggled() {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
      ? true
      : false;
  }
}

window.customElements.define("fullscreen-icon-button", FullscreenIconButton);
