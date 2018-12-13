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
} from "@polymer/polymer/polymer-element.js";
import {
  setPassiveTouchGestures,
  setRootPath
} from "@polymer/polymer/lib/utils/settings.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-layout/app-scroll-effects/app-scroll-effects.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-selector/iron-selector.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-icon/iron-icon.js";

import "@polymer/iron-media-query/iron-media-query.js";
import "@polymer/paper-toggle-button/paper-toggle-button.js";
import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";

import '@polymer/polymer/lib/elements/dom-if.js';

import {
  afterNextRender
} from "@polymer/polymer/lib/utils/render-status.js";

import "./bazdara-icons.js";
import "./shared-styles.js";

import "./elements/firebase-app.js";
import "./elements/geo-button.js";
import "./elements/page-settings.js";
import "@fabricelements/skeleton-auth/auth-mixin.js";
import firebase from 'firebase/app';

import "./elements/paper-avatar.js";
import "./elements/firebase-user.js";

import "./elements/paper-fab-speed-dial-action.js";
import "./elements/paper-fab-speed-dial.js";

/*global ga*/

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
// eslint-disable-next-line no-undef
setRootPath(BazdaraAppGlobals.rootPath);

/**
 * @polymer
 * @extends HTMLElement
 */
// eslint-disable-next-line no-undef
class BazdaraApp extends Fabric.AuthMixin(PolymerElement) {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          --app-drawer-width: 256px;
          display: block;

      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-background-color: var(--light-theme-background2-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);
      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-blue-500);
      --light-primary-color: var(--paper-blue-100);
      --dark-primary-color: var(--paper-blue-700);
      --accent-color: var(--paper-red-a200);
      --light-accent-color: var(--paper-red-a100);
      --dark-accent-color: var(--paper-red-a400);
      /*
       * Material Design Light background theme
       */
       --light-theme-background-color: #fff;
       --light-theme-background2-color: #eee;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;
      /*
       * Material Design Dark background theme
       */
       --dark-theme-background-color: var(--paper-grey-900);
       --dark-theme-background2-color: #111111;
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;
      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-drawer {
          color: var(--primary-text-color);
          --app-drawer-content-container: {
          background-color: var(--primary-background-color);
          }
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
          --paper-icon-button-ink-color: #ffffff;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          background-color: var(--primary-color);
          color: var(--dark-theme-text-color);
          font-weight: bold;
        }

        paper-dialog#dialog {
          width:320px;
          padding:10px;
        }

        .title {
          text-align: center;
        }

        .button-width {
          width:40px;
        }

        paper-fab-menu {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }

        #cam {
          width: calc(100% - 14px);
          max-width: 720px;
          margin:5px;
          background-color: var(--secondary-background-color)
          }

        .camera  {
          margin-left: -17px;
          margin-right: -17px;
          margin-top: 7px
        }
        .login {
          background-color: var(--primary-color);
          color: var(--dark-theme-text-color);
        }
        .login[disabled] {
          background-color: var(--light-primary-color);
          color: var(--disabled-text-color);
        }
        .user {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 10px;
        }
        .dialogp {
          padding:10px;
          color: var(--primary-text-color);
        }
        .settings {
          margin-right:10px;
        }
        #userdonate {
          max-width: 380px
        }
        .premium {
          background-color: var(--primary-color);
          color: var(--dark-theme-text-color);
          width:140px;
          margin: 0 auto 10px auto;
          display:block;
          text-align: center;
          margin-top: -56px
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <app-route route="{{subroute}}" pattern="/:sub" data="{{subrouteData}}" tail="{{subsubroute}}"></app-route>
      <template is="dom-if" if="{{signedIn}}" restamp>
        <firebase-user uid="{{user.uid}}" userdata="{{userdata}}"></firebase-user>
      </template>

      <app-drawer-layout fullbleed="" force-narrow narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <div class="user">
          <template is="dom-if" if="{{signedIn}}" restamp>
            <paper-avatar label="{{user.displayName}}" src\$="{{user.photoURL}}" title="{{user.uid}}"></paper-avatar>
            <div>
            <paper-icon-button icon="bazdara-icons:membership" class="userdonate" on-tap="_userDonate"></paper-icon-button>
            <paper-icon-button icon="bazdara-icons:settings" class="settings" on-tap="_paperSettings"></paper-icon-button>
            </div>
          </template>
          <paper-button class="login" raised on-tap="_openDialog" hidden="{{signedIn}}"><iron-icon icon="bazdara-icons:lock-open"></iron-icon> Prijavi se</paper-button>
          </div>

          <app-toolbar>Vreme</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
          <a name="home" href="[[rootPath]]">Trenutne razmere</a>
          <a name="napoved" href="[[rootPath]]napoved">Napoved</a>
          <a name="plimovanje" href="[[rootPath]]plimovanje">Plimovanje</a>
          <a name="navigacija" href="[[rootPath]]navigacija">Zemljevid</a>
          <a name="informacije" href="[[rootPath]]informacije">Informacije</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" class$="[[page]]" condenses="" reveals="" fixed effects="waterfall fade-background">
            <app-toolbar>
              <paper-icon-button class="button-width" icon="bazdara-icons:menu" drawer-toggle="" aria-label="Menu" on-tap="_menu"></paper-icon-button>
              <div class="title" main-title="Bazdara"><h1 class="paper-font-display1">Bazdara</h1></div>
              <geo-button class="button-width" latitude="{{latitude}}" longitude="{{longitude}}"></geo-button>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" class$="[[page]]" attr-for-selected="name" role="main">
            <bazdara-home speedunit="[[speedunit]]" latitude="[[latitude]]" longitude="[[longitude]]" userdata="[[userdata]]" name="home"></bazdara-home>
            <bazdara-forecast speedunit="[[speedunit]]" latitude="[[latitude]]" longitude="[[longitude]]" theme="[[theme]]" redraw="{{redraw}}" userdata="[[userdata]]" name="napoved"></bazdara-forecast>
            <bazdara-tide theme="[[theme]]" redraw="{{redrawp}}" userdata="[[userdata]]" name="plimovanje"></bazdara-tide>
            <bazdara-map name="navigacija" redraw="{{redrawm}}" userdata="[[userdata]]" theme="[[theme]]"></bazdara-map>
            <bazdara-about name="informacije" userdata="[[userdata]]"></bazdara-about>
            <bazdara-view404 name="view404"></bazdara-view404>
          </iron-pages>

        </app-header-layout>
      </app-drawer-layout>
      <template is="dom-if" if="{{userdata.donate.donate}}">
      <paper-fab-speed-dial with-backdrop hidden$="{{fabhidden}}">
        <paper-fab-speed-dial-action color="#009688" icon="bazdara-icons:settings" on-tap="_paperSettings">Nastavitve</paper-fab-speed-dial-action>
        <paper-fab-speed-dial-action color="#E91E63" icon="bazdara-icons:videocam" on-tap="_paperCam">Spletne kamere</paper-fab-speed-dial-action>
      </paper-fab-speed-dial>
      </template>
      <div hidden$="{{userdata.donate.donate}}">
      <paper-fab-speed-dial with-backdrop hidden$="{{fabhidden}}">
        <paper-fab-speed-dial-action color="#009688" icon="bazdara-icons:settings" on-tap="_paperSettings">Nastavitve</paper-fab-speed-dial-action>
        <paper-fab-speed-dial-action color="#E91E63" icon="bazdara-icons:videocam" on-tap="_paperCam">Spletne kamere</paper-fab-speed-dial-action>
        <paper-fab-speed-dial-action color="#673AB7" icon="bazdara-icons:membership" on-tap="_userDonate">Premium</paper-fab-speed-dial-action>
      </paper-fab-speed-dial>
      </div>


        <paper-dialog id="dialog" with-backdrop>
          <firebase-login></firebase-login>
          <template is="dom-if" if="{{signedIn}}" restamp>
            <p class="dialogp paper-font-body2">Uspešno ste se prijavili.</p>
          </template>
          <div class="buttons">
            <paper-button dialog-confirm>Zapri</paper-button>
          </div>
        </paper-dialog>

        <paper-dialog id="settings">
          <div class="dialogp">
            <iron-media-query query="(prefers-color-scheme: dark)" query-matches="{{dark}}"></iron-media-query>
            <paper-toggle-button checked="{{theme}}" aria-label="Dark Theme">Temna stran</paper-toggle-button><br>
            <app-localstorage-document key="theme" data="{{theme}}"></app-localstorage-document>
            <page-settings speedunit="{{speedunit}}"></page-settings>
          </div>
          <div class="buttons">
            <template is="dom-if" if="{{signedIn}}">
              <paper-button on-tap="_signOut"><iron-icon icon="bazdara-icons:lock"></iron-icon> Odjavi se</paper-button>
            </template>
            <paper-button dialog-confirm>Zapri</paper-button>
          </div>
        </paper-dialog>

        <paper-dialog id="cam">
          <live-cam class="camera" lat="[[latitude]]" lng="[[longitude]]"></live-cam>
          <div class="buttons">
            <paper-button dialog-confirm>Zapri</paper-button>
          </div>
        </paper-dialog>

        <paper-dialog id="userdonate">
          <template is="dom-if" if="{{signedIn}}" restamp>
            <paypal-donate user="{{user}}" paypal="{{paypal}}" userdata="{{userdata}}"></paypal-donate>
          </template>
          <div class="buttons">
            <paper-button dialog-confirm>Zapri</paper-button>
          </div>
        </paper-dialog>

    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: "_pageChanged"
      },
      signedIn: {
        type: Boolean,
        reflectToAttribute: true,
        observer: "_signedIn"
      },
      routeData: Object,
      subroute: Object,
      theme: Boolean,
      dark: Boolean,
      redraw: String,
      userdata: Object,
    };
  }

  resHasImage(){
    console.log(this.userdata.donate.donate);
        return !!this.userdata.donate.donate;
  }

  static get observers() {
    return ["_themechange(theme)", "_routePageChanged(routeData.page)"];
  }

  _signedIn() {
    //console.log(this.user);
  }

  _signOut() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }, function (error) {
      // An error happened.
    });
  }

  _themechange() {

    if (window.ShadyCSS) {
      this.style = window.ShadyCSS.getComputedStyleValue(this, '--primary-text-color');
    } else {
      this.style = getComputedStyle(this).getPropertyValue('--primary-text-color');
    }

    if (this.dark) {
      this.theme = true;
    }

    if (this.theme === true) {
      //DARK THEME
      afterNextRender(this, function () {
        this.updateStyles({
          '--primary-text-color': 'var(--dark-theme-text-color',
          '--primary-background-color': 'var(--dark-theme-background-color',
          '--secondary-background-color': 'var(--dark-theme-background2-color',
          '--light-background-color': 'var(--dark-theme-background3-color',
          '--secondary-text-color': 'var(--dark-theme-secondary-color',
          '--disabled-text-color': 'var(--dark-theme-disabled-color',
          '--divider-color': 'var(--dark-theme-divider-color',
          '--light-primary-color': 'var(--paper-blue-700)',
          '--dark-primary-color': 'var(--paper-blue-100)'
        });
        document.body.classList.remove('white');
        document.body.classList.add('black');
      });

    } else {
      //LIGHT THEME
      afterNextRender(this, function () {
        this.updateStyles({
          '--primary-text-color': 'var(--light-theme-text-color',
          '--primary-background-color': 'var(--light-theme-background-color',
          '--secondary-background-color': 'var(--light-theme-background2-color',
          '--light-background-color': 'var(--light-theme-background3-color',
          '--secondary-text-color': 'var(--light-theme-secondary-color',
          '--disabled-text-color': 'var(--light-theme-disabled-color',
          '--divider-color': 'var(--light-theme-divider-color',
          '--light-primary-color': 'var(--paper-blue-100)',
          '--dark-primary-color': 'var(--paper-blue-700)'
        });
        document.body.classList.remove('black');
        document.body.classList.add('white');
      });
    }

  }

  _menu() {
    ga('send','event', 'Menu', 'Click');
  }

  _paperSettings() {
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
    this.$.settings.open();
  }

  _userDonate() {
    /* jshint ignore:start */
    import("./elements/paypal-donate.js").then(
      function () {
        if (!this.$.drawer.persistent) {
          this.$.drawer.close();
        }
        this.$.userdonate.open();
      }.bind(this)
    );
    /* jshint ignore:end */
  }

  _paperCam() {
    /* jshint ignore:start */
    import("./elements/live-cam.js").then(
      function () {
        this.$.cam.open();
      }.bind(this)
    );
    /* jshint ignore:end */
  }

  _openDialog() {
    /* jshint ignore:start */
    import("./elements/firebase-login.js").then(
      function () {
        if (!this.$.drawer.persistent) {
          this.$.drawer.close();
        }
        this.$.dialog.open();
      }.bind(this)
    );
    /* jshint ignore:end */
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'home' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = "home";
    } else if (["home", "navigacija", "informacije", "plimovanje", "napoved"].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = "view404";
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      afterNextRender(this, function () {
        this.$.drawer.close();
      });
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    /* jshint ignore:start */
    switch (page) {
      case "home":
        this.fabhidden = false;
        import("./bazdara-home.js");
        break;
      case "napoved":
        this.fabhidden = false;
        afterNextRender(this, function () {
          this.redraw = Math.random();
        });
        import("./bazdara-forecast.js");
        break;
      case "navigacija":
        this.fabhidden = true;
        afterNextRender(this, function () {
          this.redrawm = Math.random();
        });
        import("./bazdara-map.js");
        break;
      case "informacije":
        this.fabhidden = true;
        import("./bazdara-about.js");
        break;
      case "plimovanje":
        this.fabhidden = false;
        afterNextRender(this, function () {
          this.redrawp = Math.random();
        });
        import("./bazdara-tide.js");
        break;
      case "view404":
        this.fabhidden = true;
        import("./bazdara-view404.js");
        break;
    }
    /* jshint ignore:end */
  }

  ready() {
    super.ready();

    //  afterNextRender(this, function() {
    //    import('../elements/geo-location.js').then(null);
    //  });

  }
}

window.customElements.define("bazdara-app", BazdaraApp);
