import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

/**
* @polymer
* @extends HTMLElement
*/
class LiveWindName extends PolymerElement {
  static get template() {
    return html`
      {{_windNames}}
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
      _windNames: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  _nameChange(e) {
    for (var i = 1; i < this._names.length; i++) {
      if (e >= this._names[i].from && e < this._names[i].to) {
        this._windNames = this._names[i].name;
        return;
      }
    }
    this._windNames = this._names[0].name;
  }

  constructor() {
    super();

    this._names = [
      {
        name: "Tramontana",
        from: 340.1,
        to: 10
      },
      {
        name: "Burin",
        from: 10.1,
        to: 30
      },
      {
        name: "Burja",
        from: 30.1,
        to: 100
      },
      {
        name: "Levant",
        from: 100.1,
        to: 120
      },
      {
        name: "Jugo",
        from: 120.1,
        to: 160
      },
      {
        name: "Ostro",
        from: 160.1,
        to: 200
      },
      {
        name: "Lebic",
        from: 200.1,
        to: 240
      },
      {
        name: "Garbin",
        from: 240.1,
        to: 260
      },
      {
        name: "Ponent",
        from: 260.1,
        to: 290
      },
      {
        name: "Maestral",
        from: 290.1,
        to: 340
      }
    ];
  }
}

window.customElements.define("live-wind-name", LiveWindName);
