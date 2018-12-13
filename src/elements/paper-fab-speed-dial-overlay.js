import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronOverlayBehavior} from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class PaperFabSpeedDialOverlay extends mixinBehaviors(IronOverlayBehavior, PolymerElement) {
  static get template() {
    return html `
      <slot></slot>
      `;
  }
}

window.customElements.define("paper-fab-speed-dial-overlay", PaperFabSpeedDialOverlay);
