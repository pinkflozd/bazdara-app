import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

/**
* @polymer
* @extends HTMLElement
*/
class LiveSeaName extends PolymerElement {
  static get template() {
    return html`
      {{_seaNames}}
    `;
  }

  static get properties() {
    return {
      /**
       * `direction` the wind direction in degrees.
       */
      name: {
        type: Number,
        value: 0.0,
        observer: "_nameChange"
      },
      _seaNames: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  _nameChange(e) {
    for (var i = 1; i < this._names.length; i++) {
      if (e >= this._names[i].from && e < this._names[i].to) {
        this._seaNames = this._names[i].name;
        return;
      }
    }
    this._seaNames = this._names[0].name;
  }

  constructor() {
    super();

    this._names = [
      {
        name: "gladko",
        from: 0,
        to: 0.1
      },
      {
        name: "mirno",
        from: 0,
        to: 0.2
      },
      {
        name: "rahlo vzvalovano",
        from: 0.2,
        to: 0.5
      },
      {
        name: "zmerno vzvalovano",
        from: 0.5,
        to: 1.25
      },
      {
        name: "vzvalovano",
        from: 1.25,
        to: 2.5
      },
      {
        name: "razburkano",
        from: 2.5,
        to: 4
      },
      {
        name: "zelo razburkano",
        from: 4,
        to: 6
      },
      {
        name: "visoko",
        from: 6,
        to: 9
      },
      {
        name: "zelo visoko",
        from: 9,
        to: 14
      },
      {
        name: "izredno visoko",
        from: 14,
        to: 100
      }
    ];
  }
}

window.customElements.define("live-sea-name", LiveSeaName);
