/**
`paper-avatar`
User avatar in material style

### Styling

To change the background color:

    paper-avatar {
      --paper-avatar-color: red;
    }

To change the size of the avatar:

    paper-avatar {
      --paper-avatar-width: 60px;
    }

Custom property | Description | Default
----------------|-------------|----------
`--paper-avatar-width` | Size (width and height) of the avatar image | `40px`
`--paper-avatar-color` | Background color of the avatar image |

 */

import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import '@polymer/polymer/lib/elements/dom-if.js';

/**
* @polymer
* @extends HTMLElement
*/
class PaperAvatar extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
				--paper-avatar-width: 40px;
			}

			:host {
				display: inline-block;
				box-sizing: border-box;
				position: relative;
				width: var(--paper-avatar-width);
				height:  var(--paper-avatar-width);
				border-radius: 50%;
				cursor: default;
				background-color: var(--paper-avatar-color, var(--paper-avatar-bgcolor));
				-webkit-user-select: none;
				   -moz-user-select: none;
				    -ms-user-select: none;
						user-select: none;
			}

			:host > * {
				pointer-events: none;
			}

			#label, #img, #jdenticon {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			#label {
				overflow: hidden;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-flex-direction: row;
					-ms-flex-direction: row;
						flex-direction: row;
				-webkit-align-items: center;
					 -ms-flex-align: center;
					 	align-items: center;
			}

			#label span {
				display: block;
				width: 100%;
				font-weight: 400;
				color: rgba(255, 255, 255, .8);
				text-transform: capitalize;
				font-family: 'Roboto', 'Noto', sans-serif;
				-webkit-font-smoothing: antialiased;
				text-align: center;
				font-size: calc(var(--paper-avatar-width) / 1.65);
			}

			*[hidden] {
				display: none !important;
			}
      </style>

      <div id="label" title="[[label]]"><span>[[_label(label)]]</span></div>

      <template is="dom-if" if="[[src]]">
			  <img id="img" src="[[src]]" title="[[label]]" on-load="_onImgLoad" on-error="_onImgError" title="[[color]]">
		  </template>

    `;
  }

  static get properties() {
    return {
      /**
				 * Image address or base64
				 */
				src: {
					type: String
				},

				/**
				 *	Label with username
				 */
				label: {
					type: String,
					observer: '_observerLabel'
				},

				/**
				 * Show two chars in avatar
				 */
				twoChars: {
					type: Boolean,
					value: true
				},

				/**
				 * Array of colors for avatar background
				 */
				colors: {
					type: Array,
				}
    };
  }

  _observerLabel(label){
    if(label){
      this.updateStyles({
        '--paper-avatar-bgcolor': this._parseColor(label)
      });
    }
  }

  _label(label){
    if(!label)
      return "";

    if(this.twoChars){
      if(this.label.indexOf(" ") > -1){
        var matches = this.label.match(/\b(\w)/g);
        return matches[0] + matches[1];
      } else {
        return label.substring(0, 2);
      }
    }

    return label.charAt(0);
  }

  _onImgLoad(e){
    e.currentTarget.hidden = false;
  }

  _onImgError(e){
    e.currentTarget.hidden = true;
  }

  _parseColor(label){
    var colors = this.colors ? this.colors : ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#795548", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#9E9E9E", "#607D8B"];

    var hash = 0;

    for(var a = 0; a < label.length; a++)
      hash += (label.charCodeAt(a) << 5);

    if(hash >= colors.length)
      return colors[hash % colors.length];

    return colors[hash];
  }
}

window.customElements.define("paper-avatar", PaperAvatar);
