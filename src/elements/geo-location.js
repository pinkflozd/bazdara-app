/** Copyright Eric Bidelman <ebidel@gmail.com> */
/**
Geolocation API Polymer web component.

Example to get the device geolocation values:

```html
<geo-location latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>
```

Continuous update the device geolocation values with high accuracy, and center Google Maps map and marker to the current location:

TODO: change the API key to your own.

```html
<geo-location watch-pos high-accuracy latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>

<google-map latitude="[[latitude]]" longitude="[[longitude]]" api-key="AIzaSyD3E1D9b-Z7ekrT3tbhl_dy8DCXuIuDDRc">
  <google-map-marker slot="markers" latitude="[[latitude]]" longitude="[[longitude]]"></google-map-marker>
</google-map>
```
*/
import {PolymerElement} from "@polymer/polymer/polymer-element.js";

/**
* @polymer
* @extends HTMLElement
*/
class GeoLocation extends PolymerElement {
  static get properties() {
    return {
      /**
       * The latitude of the current position.
       */
      latitude: {
        type: Number,
        notify: true,
        reflectToAttribute: true,
        readOnly: true,
        value: null
      },

      /**
       * The longitude of the current position.
       */
      longitude: {
        type: Number,
        notify: true,
        reflectToAttribute: true,
        readOnly: true,
        value: null
      },

      /**
       * If true, the element won't be active at all.
       */
      idle: {
        type: Boolean,
        value: false
      },

      /**
       * If true, the latitude/longitude update as the device changes position.
       * If not set, the latitude/longitude are provided once.
       */
      watchPos: {
        type: Boolean,
        value: false
      },

      /**
       * If true, enables high accuracy GPS.
       */
      highAccuracy: {
        type: Boolean,
        value: false
      },

      /**
       * The maximumAge option in the Gelocation API.
       */
      maximumAge: {
        type: Number,
        value: 0
      },

      /**
       * The timeout option in the Gelocation API.
       */
      timeout: {
        type: Number,
        value: 5000
      },

      /**
       * Geolocation API position object
       */
      position: {
        type: Object,
        notify: true,
        readOnly: true,
        value: null
      }
    };
  }

  static get observers() {
    return ["fetch(idle, watchPos, highAccuracy, timeout, maximumAge)"];
  }

  /**
   * Fired when the Geolocation API returns an error.
   *
   * @event geo-error
   * @param {Object} detail
   * @param {boolean} detail.error The error message.
   */

  /**
   * Fired when the Geolocation API returns a position result.
   *
   * @event geo-response
   * @param {Object} detail
   *   @param {Position} position The raw position object returned by the Geolocation API.
   *   @param {Number} detail.latitude Latitude of the current position.
   *   @param {Number} detail.longitude Longitude of the current position.
   */

  detached() {
    this._clearWatch(this._watch);
  }

  /**
   * Stop updating latitude/longitude as the device changes position.
   * @param {Number} watch watch ID value.
   */
  _clearWatch(watch) {
    if (watch) {
      navigator.geolocation.clearWatch(watch);
      this._watch = null;
    }
  }

  clear() {
    this._setPosition(null);
    this._setLatitude(null);
    this._setLongitude(null);
  }

  fetch() {
    this._clearWatch(this._watch);

    if (this.idle) {
      return;
    }

    var success = this._onPosition.bind(this);
    var error = this._onError.bind(this);
    var options = {
      enableHighAccuracy: this.highAccuracy,
      timeout: this.timeout,
      maximumAge: this.maximumAge
    };

    if (this.watchPos) {
      this._watch = navigator.geolocation.watchPosition(
        success,
        error,
        options
      );
    } else {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  /**
   * Success callback when the Geolocation API returns results.
   *
   * @param {Position} pos A position object from the Geolocation API.
   */
  _onPosition(pos) {
    this._setPosition(pos);
    this._setLatitude(pos.coords.latitude);
    this._setLongitude(pos.coords.longitude);

    window.dispatchEvent(
      new CustomEvent("geo-response", {
        detail: {
          latitude: this.latitude,
          longitude: this.longitude,
          position: pos
        }
      })
    );
  }

  /**
   * Error callback when the Geolocation API returns an error.
   *
   * @param {Position} err The error that was returned.
   */
  _onError(err) {
    window.dispatchEvent(
      new CustomEvent("geo-error", {
        detail: {
          error: err.code + ": " + err.message,
          code: err.code
        }
      })
    );
  }
}

window.customElements.define("geo-location", GeoLocation);
