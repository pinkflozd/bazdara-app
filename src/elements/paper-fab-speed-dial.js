/**
A material design [Floating Action Button with Speed Dial](https://www.google.com/design/spec/components/buttons-floating-action-button.html#buttons-floating-action-button-transitions)

### Styling

Style                                                   | Description
------------------------------------------------        | ------------
--paper-fab-speed-dial-background                       | The background color of the Floating Action Button
--paper-fab-speed-dial-keyboard-focus-background        | The background color of the Floating Action Button when focused
--paper-fab-speed-dial-background-close                 | The background color of the Floating Action Button when opened
--paper-fab-speed-dial-keyboard-focus-background-close  | The background color of the Floating Action Button when opened and focused
--paper-fab-speed-dial-position                         | The type of positioning method used for the Floating Action Button (default: absolute)
--paper-fab-speed-dial-right                            | Margin to the right of the screen (default: 16px)
--paper-fab-speed-dial-bottom                           | Margin to the bottom of the screen (default: 16px)

### Example

```html
<paper-fab-speed-dial>
<paper-fab-speed-dial-action icon="icons:content-copy">Copy</paper-fab-speed-dial-action>
<paper-fab-speed-dial-action icon="icons:print">Print</paper-fab-speed-dial-action>
</paper-fab-speed-dial>
```

@demo demo/index.html
*/
import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";
import '@polymer/paper-fab/paper-fab.js';
import './paper-fab-speed-dial-overlay.js';
import '../bazdara-icons.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class PaperFabSpeedDial extends PolymerElement {
  static get template() {
    return html `
    <style>
			.open,.overlay {
				position: var(--paper-fab-speed-dial-position, absolute);
				bottom: var(--paper-fab-speed-dial-bottom, 16px);
				right: var(--paper-fab-speed-dial-right, 16px);
			}

			.open {
				--paper-fab-background: var(--paper-fab-speed-dial-background);
				--paper-fab-keyboard-focus-background: var(--paper-fab-speed-dial-keyboard-focus-background);
			}

			.close {
				--paper-fab-background: var(--paper-fab-speed-dial-background-close, var(--paper-grey-500));
				--paper-fab-keyboard-focus-background: var(--paper-fab-speed-dial-keyboard-focus-background-close, var(--paper-grey-500));
				margin-top: 20px;
				display: inline-block;
			}

			.overlay {
				text-align: right;
			}
    </style>

    <paper-fab icon="[[icon]]" class="open" on-tap="open" hidden$="[[opened]]" disabled="[[disabled]]"></paper-fab>

    <paper-fab-speed-dial-overlay id="overlay" class="overlay" opened="{{opened}}" with-backdrop="[[withBackdrop]]">
      <slot></slot>
      <paper-fab icon="bazdara-icons:close" class="close" on-tap="close"></paper-fab>
    </paper-fab-speed-dial-overlay>
    `;
  }

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'bazdara-icons:apps'
      },
      opened: {
        type: Boolean,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false
      },
      withBackdrop: Boolean,
    };
  }

  // Public methods
  open(e) {
    // Required for mobile Safari to avoid passing the tap event to an element below the FAB
    if (e) {
      e.preventDefault();
    }

    this.opened = true;
  }
  close(e) {
    // Required for mobile Safari to avoid passing the tap event to an element below the FAB
    if (e) {
      e.preventDefault();
    }

    this.opened = false;
  }

}
window.customElements.define("paper-fab-speed-dial", PaperFabSpeedDial);
