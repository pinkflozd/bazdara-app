/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  afterNextRender
} from '@polymer/polymer/lib/utils/render-status.js';
import {
  setPassiveTouchGestures,
  setRootPath
} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-dialog/paper-dialog.js';

import './bazdara-icons.js';
import './shared-styles.js';

import './elements/firebase-app.js';
import './elements/geo-button.js';
import '@fabricelements/skeleton-auth/auth-mixin.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(BazdaraAppGlobals.rootPath);

class BazdaraApp extends Fabric.AuthMixin(PolymerElement) {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          --app-drawer-width: 256px;
          display: block;
        }

        :root  {
          background-color: var(--secondary-background-color);
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--primary-color);
          --app-header-background-rear-layer: {
            /* The header is blue when condensed */
            background-color: var(--primary-color);
          };
        }

        app-header.home {
          color: #fff;
          background-color: transparent;
          --app-header-background-rear-layer: {
            /* The header is blue when condensed */
            background-color: var(--primary-color);
          };
        }

        @media only screen and (min-width: 768px) {
          app-header.home {
            color: #fff;
            background-color: var(--primary-color);
            --app-header-background-rear-layer: {
              /* The header is blue when condensed */
              background-color: var(--primary-color);
            };
          }
        }

        iron-pages.home {
          margin-top:-64px
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

        paper-dialog#dialog {
          width:320px;
          padding:10px;
        }

        .title {
          text-align: center;
          font-weight:200;
          font-size:36px
        }

        .button-width {
          width:40px
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" force-narrow narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <paper-button raised on-tap="_openDialog">Log In</paper-button>

          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="home" href="[[rootPath]]home">Home</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" class$="[[page]]" condenses="" reveals="" fixed effects="waterfall fade-background">
            <app-toolbar>
              <paper-icon-button class="button-width" icon="bazdara-icons:menu" drawer-toggle="" aria-label="Menu"></paper-icon-button>
              <div class="title" main-title="Bazdara">Bazdara</div>
              <geo-button class="button-width"></geo-button>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" class$="[[page]]" attr-for-selected="name" role="main">
            <bazdara-home latitude="[[latitude]]" longitude="[[longitude]]" name="home"></bazdara-home>
            <bazdara-view404 name="view404"></bazdara-view404>
          </iron-pages>

          <paper-dialog id="dialog">
            <firebase-login></firebase-login>
            <div class="buttons">
              <paper-button dialog-confirm autofocus>Close</paper-button>
            </div>
          </paper-dialog>


        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _openDialog() {
    import('./elements/firebase-login.js').then(function() {
      if (!this.$.drawer.persistent) {
        this.$.drawer.close();
      }
      this.$.dialog.open();
    }.bind(this));

  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'home' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'home';
    } else if (['home'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'home':
        import('./bazdara-home.js');
        break;
      case 'view404':
        import('./bazdara-view404.js');
        break;
    }
  }

  ready() {
    super.ready();

    //  afterNextRender(this, function() {
    //    import('../elements/geo-location.js').then(null);
    //  });

  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('geo-response', function(e) {
      //console.log(e.detail.latitude);
      //console.log(e.detail.longitude);
      this.latitude = e.detail.latitude;
      this.longitude = e.detail.longitude;
    }.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('geo-response', function(e) {
      //console.log(e.detail.latitude);
      //console.log(e.detail.longitude);
      this.latitude = e.detail.latitude;
      this.longitude = e.detail.longitude;
    }.bind(this))
  }

}

window.customElements.define('bazdara-app', BazdaraApp);
