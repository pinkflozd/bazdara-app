import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

/**
* @polymer
* @extends HTMLElement
*/
class LiveWindDirection extends PolymerElement {
  static get template() {
    return html`
      {{direction}}° ({{_windCompass}})
    `;
  }

  static get properties() {
    return {
      /**
       * `direction` the wind direction in degrees.
       */
      direction: {
        type: Number,
        observer: "_directionChange"
      },
      _windCompass: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  _directionChange(e) {
    for (var i = 1; i < this._directions.length; i++) {
      if (e >= this._directions[i].from && e < this._directions[i].to) {
        this._windCompass = this._directions[i].direction;
        return;
      }
    }
    this._windCompass = this._directions[0].direction;
  }

  constructor() {
    super();

    this._directions = [
      {
        direction: "N",
        from: 348.75,
        to: 11.25
      },
      {
        direction: "NNE",
        from: 11.25,
        to: 33.75
      },
      {
        direction: "NE",
        from: 33.75,
        to: 56.25
      },
      {
        direction: "ENE",
        from: 56.25,
        to: 78.75
      },
      {
        direction: "E",
        from: 78.75,
        to: 101.25
      },
      {
        direction: "ESE",
        from: 101.25,
        to: 123.75
      },
      {
        direction: "SE",
        from: 123.75,
        to: 146.25
      },
      {
        direction: "SSE",
        from: 146.25,
        to: 168.75
      },
      {
        direction: "S",
        from: 168.75,
        to: 191.25
      },
      {
        direction: "SSW",
        from: 191.25,
        to: 213.75
      },
      {
        direction: "SW",
        from: 213.75,
        to: 236.25
      },
      {
        direction: "WSW",
        from: 236.25,
        to: 258.75
      },
      {
        direction: "W",
        from: 258.75,
        to: 281.25
      },
      {
        direction: "WNW",
        from: 281.25,
        to: 303.75
      },
      {
        direction: "NW",
        from: 303.75,
        to: 326.25
      },
      {
        direction: "NNW",
        from: 326.25,
        to: 348.75
      }
    ];
  }
}

window.customElements.define("live-wind-direction", LiveWindDirection);
