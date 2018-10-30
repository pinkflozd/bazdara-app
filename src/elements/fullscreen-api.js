import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  mixinBehaviors
} from '@polymer/polymer/lib/legacy/class.js';
import {FullscreenBehavior} from './fullscreen-behavior.js';

/**
A simple Polymer based Web Component wrapper for the HTML5 full screen API.

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

    <template is="dom-bind">
      <fullscreen-api id="fsapi" fullscreen-available="{{fullscreenAvailable}}"></fullscreen-api>

      <button type="button" onclick="goFullscreen()" hidden$="[[!fullscreenAvailable]]">Display this page in full screen mode</button>

      <div id="errorDiv" hidden$="[[fullscreenAvailable]]">
        Your browser does not support the HTML5 full screen API... :(
      </div>
    </template>

    <script>
      function goFullscreen() {
        var fsapi = document.querySelector('#fsapi');
        fsapi.toggleFullscreen();
      }
    </script>
*/


class FullscreenApi extends mixinBehaviors([FullscreenBehavior], PolymerElement) {
  constructor() {
      super();
    }
}

window.customElements.define('fullscreen-api', FullscreenApi);
