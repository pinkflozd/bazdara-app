/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/color.js";

const $_documentContainer = document.createElement("template");
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    	margin: 0;
    	padding: 0;
    	border: 0;
    	font: inherit;
    }

    .text-left {
      text-align: left;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
    .text-justify {
      text-align: justify;
    }
    .text-nowrap {
      white-space: nowrap;
    }
    .text-lowercase {
      text-transform: lowercase;
    }
    .text-uppercase {
      text-transform: uppercase;
    }
    .text-capitalize {
      text-transform: capitalize;
    }
    .paper-font-display4,
    .paper-font-display3,
    .paper-font-display2,
    .paper-font-display1,
    .paper-font-headline,
    .paper-font-title,
    .paper-font-subhead,
    .paper-font-body2,
    .paper-font-body1,
    .paper-font-caption,
    .paper-font-menu,
    .paper-font-button {
      font-family: 'Roboto', 'Noto', sans-serif;
      -webkit-font-smoothing: antialiased;  /* OS X subpixel AA bleed bug */
    }

    .paper-font-code2,
    .paper-font-code1 {
      font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
      -webkit-font-smoothing: antialiased;  /* OS X subpixel AA bleed bug */
    }

    /* Opt for better kerning for headers &amp; other short labels. */
    .paper-font-display4,
    .paper-font-display3,
    .paper-font-display2,
    .paper-font-display1,
    .paper-font-headline,
    .paper-font-title,
    .paper-font-subhead,
    .paper-font-menu,
    .paper-font-button {
      text-rendering: optimizeLegibility;
    }

    .paper-font-display4 {
      font-size: 112px;
      font-weight: 300;
      letter-spacing: -.044em;
      line-height: 120px;
    }

    .paper-font-display3 {
      font-size: 56px;
      font-weight: 400;
      letter-spacing: -.026em;
      line-height: 60px;
    }

    .paper-font-display2 {
      font-size: 45px;
      font-weight: 400;
      letter-spacing: -.018em;
      line-height: 48px;
    }

    .paper-font-display1 {
      font-size: 34px;
      font-weight: 400;
      letter-spacing: -.01em;
      line-height: 40px;
    }

    .paper-font-headline {
      font-size: 24px;
      font-weight: 400;
      letter-spacing: -.012em;
      line-height: 32px;
    }

    .paper-font-title {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
    }

    .paper-font-title2 {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
    }

    .paper-font-subhead {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }

    .paper-font-body2 {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
    }

    .paper-font-body1 {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }

    .paper-font-caption {
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.011em;
      line-height: 20px;
    }

    .paper-font-menu {
      font-size: 13px;
      font-weight: 500;
      line-height: 24px;
    }

    .paper-font-button {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.018em;
      line-height: 24px;
      text-transform: uppercase;
    }

    .paper-font-code2 {
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
    }

    .paper-font-code1 {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }

    .paper-material {
      border-radius: 3px
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid var(--divider-color);
      margin: 5px 0;
      padding: 0;
    }
    a {
      color: var(--primary-color);
    }

    a:hover {
      color: var(--light-primary-color);
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
