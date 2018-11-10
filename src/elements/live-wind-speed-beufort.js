import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

/**
* @polymer
* @extends HTMLElement
*/
class LiveWindSpeedBeufort extends PolymerElement {
  static get template() {
    return html`
    [[_speed2]]
    `;
  }

  static get properties() {
    return {
      /**
       * `speed` the wind speed in m/s.
       */
      speed: {
        type: Number,
        observer: "_speedChange"
      },
      /**
       * `gust` the wind gust in m/s.
       */
      gust: {
        type: Number,
        value: 0.0
      },
      _speed: {
        type: String,
        reflectToAttribute: true
      },
      _speed2: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  _speedChange(e) {
    for (var i = 1; i < this._speeds.length; i++) {
      if (e >= this._speeds[i].from && e < this._speeds[i].to) {
        this._speed = this._speeds[i].speed;
        this._speed2 = this._speeds[i].speed2;
        return;
      }
    }
    this._speed = this._speeds[0].speed;
    this._speed2 = this._speeds[0].speed2;
  }

  constructor() {
    super();

    this._speeds = [
      {
        speed: "Tišina",
        speed2: "0 beaufort",
        from: 0,
        to: 0.3
      },
      {
        speed: "Lahek vetrič",
        speed2: "1 beaufort",
        from: 0.3,
        to: 1.5
      },
      {
        speed: "Vetrič",
        speed2: "2 beaufort",
        from: 1.5,
        to: 3.3
      },
      {
        speed: "Slab veter",
        speed2: "3 beaufort",
        from: 3.3,
        to: 5.5
      },
      {
        speed: "Zmeren veter",
        speed2: "4 beaufort",
        from: 5.5,
        to: 8
      },
      {
        speed: "Zmerno močan veter",
        speed2: "5 beaufort",
        from: 8,
        to: 10.8
      },
      {
        speed: "Močan veter",
        speed2: "6 beaufort",
        from: 10.8,
        to: 13.9
      },
      {
        speed: "Zelo močan veter",
        speed2: "7 beaufort",
        from: 13.9,
        to: 17.2
      },
      {
        speed: "Viharni veter",
        speed2: "8 beaufort",
        from: 17.2,
        to: 20.7
      },
      {
        speed: "Vihar",
        speed2: "9 beaufort",
        from: 20.7,
        to: 24.5
      },
      {
        speed: "Močan vihar",
        speed2: "10 beaufort",
        from: 24.5,
        to: 28.4
      },
      {
        speed: "Orkanski veter",
        speed2: "11 beaufort",
        from: 28.4,
        to: 32.6
      },
      {
        speed: "Orkan",
        speed2: "12 beaufort",
        from: 32.6,
        to: 1000
      }
    ];
  }
}

window.customElements.define("live-wind-speed-beufort", LiveWindSpeedBeufort);
