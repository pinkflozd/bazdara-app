import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";
/**
 * @polymer
 * @extends HTMLElement
 */
class PaypalButtonExpress extends PolymerElement {
  static get template() {
    return html `
    <style>
      :host {
        display: block;
      }
    </style>

    <iframe id="frame" width="100%" height="80px" frameborder="0"></iframe>
`;
  }

  static get properties() {
    return {
      // whether to use sandbox mode
      sandbox: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
      },
      // sandbox client id (https://developer.paypal.com/developer/applications/create)
      sandboxId: {
        type: String,
      },
      // production client id
      productionId: {
        type: String,
      },
      // amount to charge
      amount: {
        type: Number,
      },
      // amount currency
      currency: {
        type: String,
        value: 'EUR',
      },
      // payment reference (optional)
      reference: {
        type: String,
      },
      // whether events bubble
      bubbles: {
        type: Boolean,
        value: false,
      },
      // the paypal response data
      response: {
        type: Object,
        notify: true,
        readonly: true,
      },
      // the iframe to render the button
      _frame: {
        type: Object,
      },
      // postMessage listener and handler
      _handler: {
        type: Object,
      },
    };
  }

  static get observers() {
    return [
      'open(sandbox, sandboxId, productionId)',
      '_updateFrame(amount, currency, reference)',
    ];
  }

  // update iframe url
  open() {
    // bail if frame isnt initialized yet
    if (!this._frame) {
      return;
    }
    // bail if no ids are set
    if (!this.productionId && !(this.sandbox && this.sandboxId)) {
      return;
    }

    let params = new URLSearchParams();
    params.set('env', this._env());
    params.set('sandboxId', this.sandboxId);
    params.set('productionId', this.productionId);
    params.set('amount', this.amount);
    params.set('currency', this.currency);
    params.set('reference', this.reference);
    params.set('referer', document.location.href);

    this._frame.src = `${this.resolveUrl("/files/denar.html")}?${params.toString()}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleParams();
    this._frame = this.$.frame;
    this._handler = this._eventHandler.bind(this);
    window.addEventListener("message", this._handler);
    this.open();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("message", this._handler);
    this._frame = null;
  }

  // detect from url params if the page is a redirect from the payment flow
  handleParams() {
    // queue as micro task
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("paypal-window-success")) {
      let data = {
        // map the callback url params to the api response
        paymentID: searchParams.get("paymentId"),
        paymentToken: searchParams.get("token"),
        payerID: searchParams.get("PayerID"),
      };

      this._fireSuccess(data);
      this.response = data;
    }
    if (searchParams.has("paypal-window-error")) {
      this._fireError();
    }
  }

  _updateFrame() {
    this._sendMessage('paypal-window-update', {
      amount: this.amount,
      currency: this.currency,
      reference: this.reference,
    });
  }

  _sendMessage(type, data) {
    if (this._frame) {
      this._frame.contentWindow.postMessage({
        type,
        data
      }, `${window.location.protocol}//${window.location.host}`);
    }
  }

  _fireSuccess(data) {
    /**
     * @event paypal-success Fired on succesful checkout.
     */
    this.dispatchEvent(new CustomEvent('paypal-success', {
      detail: data,
      bubbles: this.bubbles,
      composed: true,
    }));
  }

  _fireError(data) {
    /**
     * @event paypal-error Fired on paypal error or window close.
     */
    this.dispatchEvent(new CustomEvent('paypal-error', {
      detail: data,
      bubbles: this.bubbles,
      composed: true,
    }));
  }

  // data bridge recieving
  _eventHandler(event) {
    // bail for wrong origin
    if (event.origin !== `${window.location.protocol}//${window.location.host}`) {
      return;
    }

    switch (event.data.type) {
      case "paypal-window-init":
        this._sendMessage("paypal-window-init-ack");
        break;
      case "paypal-window-rendered":
        this._updateFrame();
        break;
      case "paypal-window-success":
        this._sendMessage("paypal-window-success-ack");
        this.response = event.data.data;
        this._fireSuccess(event.data.data);
        break;
      case "paypal-window-error":
        this._sendMessage("paypal-window-error-ack");
        this._fireError(event.data.data);
        break;
      case "paypal-window-close":
        this._sendMessage("paypal-window-close-ack");
        this._fireError("user closed window");
        break;
      default:
        // do nothing
    }
  }

  _env() {
    return this.sandbox ? 'sandbox' : 'production';
  }
}

window.customElements.define("paypal-button-express", PaypalButtonExpress);
