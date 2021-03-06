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

const $_documentContainer = document.createElement("template");
$_documentContainer.innerHTML = `<dom-module id="leaflet-style">
  <template>
    <style>
    /* required styles */

    .leaflet-pane,
    .leaflet-tile,
    .leaflet-marker-icon,
    .leaflet-marker-shadow,
    .leaflet-tile-container,
    .leaflet-pane > svg,
    .leaflet-pane > canvas,
    .leaflet-zoom-box,
    .leaflet-image-layer,
    .leaflet-layer {
      position: absolute;
      left: 0;
      top: 0;
      }
    .leaflet-container {
      overflow: hidden;
      }
    .leaflet-tile,
    .leaflet-marker-icon,
    .leaflet-marker-shadow {
      -webkit-user-select: none;
         -moz-user-select: none;
              user-select: none;
        -webkit-user-drag: none;
      }
    /* Safari renders non-retina tile on retina better with this, but Chrome is worse */
    .leaflet-safari .leaflet-tile {
      image-rendering: -webkit-optimize-contrast;
      }
    /* hack that prevents hw layers "stretching" when loading new tiles */
    .leaflet-safari .leaflet-tile-container {
      width: 1600px;
      height: 1600px;
      -webkit-transform-origin: 0 0;
      }
    .leaflet-marker-icon,
    .leaflet-marker-shadow {
      display: block;
      }
    /* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
    /* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
    .leaflet-container .leaflet-overlay-pane svg,
    .leaflet-container .leaflet-marker-pane img,
    .leaflet-container .leaflet-shadow-pane img,
    .leaflet-container .leaflet-tile-pane img,
    .leaflet-container img.leaflet-image-layer,
    .leaflet-container .leaflet-tile {
      max-width: none !important;
      max-height: none !important;
      }

    .leaflet-container.leaflet-touch-zoom {
      -ms-touch-action: pan-x pan-y;
      touch-action: pan-x pan-y;
      }
    .leaflet-container.leaflet-touch-drag {
      -ms-touch-action: pinch-zoom;
      /* Fallback for FF which doesn't support pinch-zoom */
      touch-action: none;
      touch-action: pinch-zoom;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
      -ms-touch-action: none;
      touch-action: none;
    }
    .leaflet-container {
      -webkit-tap-highlight-color: transparent;
    }
    .leaflet-container a {
      -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
    }
    .leaflet-tile {
      filter: inherit;
      visibility: hidden;
      }
    .leaflet-tile-loaded {
      visibility: inherit;
      }
    .leaflet-zoom-box {
      width: 0;
      height: 0;
      -moz-box-sizing: border-box;
           box-sizing: border-box;
      z-index: 800;
      }
    /* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
    .leaflet-overlay-pane svg {
      -moz-user-select: none;
      }

    .leaflet-pane         { z-index: 400; }

    .leaflet-tile-pane    { z-index: 200; }
    .leaflet-overlay-pane { z-index: 400; }
    .leaflet-shadow-pane  { z-index: 500; }
    .leaflet-marker-pane  { z-index: 600; }
    .leaflet-tooltip-pane   { z-index: 650; }
    .leaflet-popup-pane   { z-index: 700; }

    .leaflet-map-pane canvas { z-index: 100; }
    .leaflet-map-pane svg    { z-index: 200; }

    .leaflet-vml-shape {
      width: 1px;
      height: 1px;
      }
    .lvml {
      behavior: url(#default#VML);
      display: inline-block;
      position: absolute;
      }


    /* control positioning */

    .leaflet-control {
      position: relative;
      z-index: 800;
      pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
      pointer-events: auto;
      }
    .leaflet-top,
    .leaflet-bottom {
      position: absolute;
      z-index: 1000;
      pointer-events: none;
      }
    .leaflet-top {
      top: 0;
      }
    .leaflet-right {
      right: 0;
      }
    .leaflet-bottom {
      bottom: 0;
      }
    .leaflet-left {
      left: 0;
      }
    .leaflet-control {
      float: left;
      clear: both;
      }
    .leaflet-right .leaflet-control {
      float: right;
      }
    .leaflet-top .leaflet-control {
      margin-top: 10px;
      }
    .leaflet-bottom .leaflet-control {
      margin-bottom: 10px;
      }
    .leaflet-left .leaflet-control {
      margin-left: 10px;
      }
    .leaflet-right .leaflet-control {
      margin-right: 10px;
      }


    /* zoom and fade animations */

    .leaflet-fade-anim .leaflet-tile {
      will-change: opacity;
      }
    .leaflet-fade-anim .leaflet-popup {
      opacity: 0;
      -webkit-transition: opacity 0.2s linear;
         -moz-transition: opacity 0.2s linear;
              transition: opacity 0.2s linear;
      }
    .leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
      opacity: 1;
      }
    .leaflet-zoom-animated {
      -webkit-transform-origin: 0 0;
          -ms-transform-origin: 0 0;
              transform-origin: 0 0;
      }
    .leaflet-zoom-anim .leaflet-zoom-animated {
      will-change: transform;
      }
    .leaflet-zoom-anim .leaflet-zoom-animated {
      -webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
         -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
              transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
      }
    .leaflet-zoom-anim .leaflet-tile,
    .leaflet-pan-anim .leaflet-tile {
      -webkit-transition: none;
         -moz-transition: none;
              transition: none;
      }

    .leaflet-zoom-anim .leaflet-zoom-hide {
      visibility: hidden;
      }


    /* cursors */

    .leaflet-interactive {
      cursor: pointer;
      }
    .leaflet-grab {
      cursor: -webkit-grab;
      cursor:    -moz-grab;
      cursor:         grab;
      }
    .leaflet-crosshair,
    .leaflet-crosshair .leaflet-interactive {
      cursor: crosshair;
      }
    .leaflet-popup-pane,
    .leaflet-control {
      cursor: auto;
      }
    .leaflet-dragging .leaflet-grab,
    .leaflet-dragging .leaflet-grab .leaflet-interactive,
    .leaflet-dragging .leaflet-marker-draggable {
      cursor: move;
      cursor: -webkit-grabbing;
      cursor:    -moz-grabbing;
      cursor:         grabbing;
      }

    /* marker & overlays interactivity */
    .leaflet-marker-icon,
    .leaflet-marker-shadow,
    .leaflet-image-layer,
    .leaflet-pane > svg path,
    .leaflet-tile-container {
      pointer-events: none;
      }

    .leaflet-marker-icon.leaflet-interactive,
    .leaflet-image-layer.leaflet-interactive,
    .leaflet-pane > svg path.leaflet-interactive {
      pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
      pointer-events: auto;
      }

    /* visual tweaks */

    .leaflet-container {
      background: #ddd;
      outline: 0;
      }
    .leaflet-container a {
      color: #0078A8;
      }
    .leaflet-container a.leaflet-active {
      outline: 2px solid orange;
      }
    .leaflet-zoom-box {
      border: 2px dotted #38f;
      background: rgba(255,255,255,0.5);
      }


    /* general typography */
    .leaflet-container {
      font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
      }


    /* general toolbar styles */

    .leaflet-bar {
      box-shadow: 0 1px 5px rgba(0,0,0,0.65);
      border-radius: 4px;
      }
    .leaflet-bar a,
    .leaflet-bar a:hover {
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      width: 26px;
      height: 26px;
      line-height: 26px;
      display: block;
      text-align: center;
      text-decoration: none;
      color: black;
      }
    .leaflet-bar a,
    .leaflet-control-layers-toggle {
      background-position: 50% 50%;
      background-repeat: no-repeat;
      display: block;
      }
    .leaflet-bar a:hover {
      background-color: #f4f4f4;
      }
    .leaflet-bar a:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      }
    .leaflet-bar a:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom: none;
      }
    .leaflet-bar a.leaflet-disabled {
      cursor: default;
      background-color: #f4f4f4;
      color: #bbb;
      }

    .leaflet-touch .leaflet-bar a {
      width: 30px;
      height: 30px;
      line-height: 30px;
      }
    .leaflet-touch .leaflet-bar a:first-child {
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      }
    .leaflet-touch .leaflet-bar a:last-child {
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      }

    /* zoom control */

    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
      font: bold 18px 'Lucida Console', Monaco, monospace;
      text-indent: 1px;
      }

    .leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {
      font-size: 22px;
      }


    /* layers control */

    .leaflet-control-layers {
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      background: #fff;
      border-radius: 5px;
      }
    .leaflet-control-layers-toggle {
      background-image: url(images/map/layers.svg);
      width: 36px;
      height: 36px;
      background-size: 26px 26px;
      }
    .leaflet-touch .leaflet-control-layers-toggle {
      width: 44px;
      height: 44px;
      }
    .leaflet-control-layers .leaflet-control-layers-list,
    .leaflet-control-layers-expanded .leaflet-control-layers-toggle {
      display: none;
      }
    .leaflet-control-layers-expanded .leaflet-control-layers-list {
      display: block;
      position: relative;
      max-height: calc(100vh - 128px);
      overflow-x: hidden;
      overflow-y: auto;
      z-index:1
      }
    .leaflet-control-layers-expanded {
      padding: 6px 10px 6px 6px;
      color: #333;
      background: #fff;
      }
    .leaflet-control-layers-scrollbar {
      overflow-y: scroll;
      overflow-x: hidden;
      padding-right: 5px;
      }
    .leaflet-control-layers-selector {
      margin-top: 2px;
      position: relative;
      top: 1px;
      }
    .leaflet-control-layers label {
      display: block;
      }
    .leaflet-control-layers-separator {
      height: 0;
      border-top: 1px solid #ddd;
      margin: 5px -10px 5px -6px;
      }

    /* Default icon URLs */
    .leaflet-default-icon-path {
      background-image: url(images/map/marker-icon.png);
      }


    /* attribution and scale controls */

    .leaflet-container .leaflet-control-attribution {
      background: #fff;
      background: rgba(255, 255, 255, 0.7);
      margin: 0;
      }
    .leaflet-control-attribution,
    .leaflet-control-scale-line {
      padding: 0 5px;
      color: #333;
      }
    .leaflet-control-attribution a {
      text-decoration: none;
      }
    .leaflet-control-attribution a:hover {
      text-decoration: underline;
      }
    .leaflet-container .leaflet-control-attribution,
    .leaflet-container .leaflet-control-scale {
      font-size: 11px;
      }
    .leaflet-left .leaflet-control-scale {
      margin-left: 5px;
      }
    .leaflet-bottom .leaflet-control-scale {
      margin-bottom: 5px;
      }
    .leaflet-control-scale-line {
      border: 2px solid #777;
      border-top: none;
      line-height: 1.1;
      padding: 2px 5px 1px;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      -moz-box-sizing: border-box;
           box-sizing: border-box;

      background: #fff;
      background: rgba(255, 255, 255, 0.5);
      }
    .leaflet-control-scale-line:not(:first-child) {
      border-top: 2px solid #777;
      border-bottom: none;
      margin-top: -2px;
      }
    .leaflet-control-scale-line:not(:first-child):not(:last-child) {
      border-bottom: 2px solid #777;
      }

    .leaflet-touch .leaflet-control-attribution,
    .leaflet-touch .leaflet-control-layers,
    .leaflet-touch .leaflet-bar {
      box-shadow: none;
      }
    .leaflet-touch .leaflet-control-layers,
    .leaflet-touch .leaflet-bar {
      border: 2px solid rgba(0,0,0,0.2);
      background-clip: padding-box;
      }


    /* popup */

    .leaflet-popup {
      position: absolute;
      text-align: center;
      margin-bottom: 20px;
      }
    .leaflet-popup-content-wrapper {
      padding: 1px;
      text-align: left;
      border-radius: 12px;
      }
    .leaflet-popup-content {
      margin: 13px 19px;
      line-height: 1.4;
      }
    .leaflet-popup-content p {
      margin: 18px 0;
      }
    .leaflet-popup-tip-container {
      width: 40px;
      height: 20px;
      position: absolute;
      left: 50%;
      margin-left: -20px;
      overflow: hidden;
      pointer-events: none;
      }
    .leaflet-popup-tip {
      width: 17px;
      height: 17px;
      padding: 1px;

      margin: -10px auto 0;

      -webkit-transform: rotate(45deg);
         -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
              transform: rotate(45deg);
      }
    .leaflet-popup-content-wrapper,
    .leaflet-popup-tip {
      background: white;
      color: #333;
      box-shadow: 0 3px 14px rgba(0,0,0,0.4);
      }
    .leaflet-container a.leaflet-popup-close-button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 4px 0 0;
      border: none;
      text-align: center;
      width: 18px;
      height: 14px;
      font: 16px/14px Tahoma, Verdana, sans-serif;
      color: #c3c3c3;
      text-decoration: none;
      font-weight: bold;
      background: transparent;
      }
    .leaflet-container a.leaflet-popup-close-button:hover {
      color: #999;
      }
    .leaflet-popup-scrolled {
      overflow: auto;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      }

    .leaflet-oldie .leaflet-popup-content-wrapper {
      zoom: 1;
      }
    .leaflet-oldie .leaflet-popup-tip {
      width: 24px;
      margin: 0 auto;

      -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
      filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
      }
    .leaflet-oldie .leaflet-popup-tip-container {
      margin-top: -1px;
      }

    .leaflet-oldie .leaflet-control-zoom,
    .leaflet-oldie .leaflet-control-layers,
    .leaflet-oldie .leaflet-popup-content-wrapper,
    .leaflet-oldie .leaflet-popup-tip {
      border: 1px solid #999;
      }


    /* div icon */

    .leaflet-div-icon {
      background: #fff;
      border: 1px solid #666;
      }


    /* Tooltip */
    /* Base styles for the element that has a tooltip */
    .leaflet-tooltip {
      position: absolute;
      padding: 6px;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 3px;
      color: #222;
      white-space: nowrap;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
      }
    .leaflet-tooltip.leaflet-clickable {
      cursor: pointer;
      pointer-events: auto;
      }
    .leaflet-tooltip-top:before,
    .leaflet-tooltip-bottom:before,
    .leaflet-tooltip-left:before,
    .leaflet-tooltip-right:before {
      position: absolute;
      pointer-events: none;
      border: 6px solid transparent;
      background: transparent;
      content: "";
      }

    /* Directions */

    .leaflet-tooltip-bottom {
      margin-top: 6px;
    }
    .leaflet-tooltip-top {
      margin-top: -6px;
    }
    .leaflet-tooltip-bottom:before,
    .leaflet-tooltip-top:before {
      left: 50%;
      margin-left: -6px;
      }
    .leaflet-tooltip-top:before {
      bottom: 0;
      margin-bottom: -12px;
      border-top-color: #fff;
      }
    .leaflet-tooltip-bottom:before {
      top: 0;
      margin-top: -12px;
      margin-left: -6px;
      border-bottom-color: #fff;
      }
    .leaflet-tooltip-left {
      margin-left: -6px;
    }
    .leaflet-tooltip-right {
      margin-left: 6px;
    }
    .leaflet-tooltip-left:before,
    .leaflet-tooltip-right:before {
      top: 50%;
      margin-top: -6px;
      }
    .leaflet-tooltip-left:before {
      right: 0;
      margin-right: -12px;
      border-left-color: #fff;
      }
    .leaflet-tooltip-right:before {
      left: 0;
      margin-left: -12px;
      border-right-color: #fff;
      }






















      /*
      * Leaflet TimeDimension v1.1.0 - 2017-10-13
      *
      * Copyright 2017 Biel Frontera (ICTS SOCIB)
      * datacenter@socib.es
      * http://www.socib.es/
      *
      * Licensed under the MIT license.
      *
      * Demos:
      * http://apps.socib.es/Leaflet.TimeDimension/
      *
      * Source:
      * git://github.com/socib/Leaflet.TimeDimension.git
      *
      */
     @font-face {
         font-family: 'Glyphicons Halflings';
         src: url('//netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot');
         src: url('//netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('//netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff') format('woff'), url('//netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('//netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.svg#glyphicons-halflingsregular') format('svg');
     }
     .leaflet-bar-timecontrol{
          background-color: #fff;
          color: black;
     }
     .leaflet-bar-timecontrol * {
         box-sizing: border-box;
     }
     .leaflet-bar-timecontrol .leaflet-control-timecontrol {
         float: left;
         height: 26px;
         line-height: 26px;
         border: solid #a5a5a5;
         background-color: #fff;
         border-width: 0 1px 0 0;
     }
     .leaflet-bar-timecontrol .leaflet-control-timecontrol:first-child {
         border-radius: 4px 0 0 4px;
     }
     .leaflet-bar-timecontrol .leaflet-control-timecontrol:last-child {
         border-radius: 0 4px 4px 0;
     }
     .leaflet-bar-timecontrol .leaflet-control-timecontrol:before {
         font-family: "Glyphicons Halflings";
         display: block;
     }
     .leaflet-bar-timecontrol .timecontrol-slider {
         position: relative;
         width: auto;
         cursor: auto;
     }
     .leaflet-bar-timecontrol a.timecontrol-date,
     .leaflet-bar-timecontrol a.timecontrol-date:hover {
         position: relative;
         min-width: 150px;
         width: auto;
         padding: 0 10px 0 20px;
         white-space: nowrap;
     }
     .leaflet-bar-timecontrol a.timecontrol-date.utc,
     .leaflet-bar-timecontrol a.timecontrol-date.utc:hover {
         min-width: 185px;
     }
     .leaflet-bar-timecontrol a.timecontrol-date.loading,
     .leaflet-bar-timecontrol a.timecontrol-date.loading:hover {
         background-color: #ffefa4;
     }
     .leaflet-bar-timecontrol .timecontrol-dateslider .slider {
         width: 200px;
     }
     .leaflet-bar-timecontrol .timecontrol-speed {
         white-space: nowrap;
         cursor: auto;
     }
     .leaflet-bar-timecontrol .timecontrol-speed .slider {
         width: 55px;
         display: inline-block;
     }
     .leaflet-bar-timecontrol .timecontrol-speed .speed {
         width: 55px;
         display: inline-block;
         float: left;
         text-align: right;
     }
     .leaflet-bar-timecontrol .timecontrol-play,
     .leaflet-bar-timecontrol .timecontrol-play:hover {
         position: relative;
     }
     .leaflet-bar-timecontrol .timecontrol-play span {
         font-size: 10px;
     }
     .leaflet-bar-timecontrol a.timecontrol-play.loading {
         background-color: #ffefa4;
     }

     /**
     * Slider/Knobs styles
     */

     .timecontrol-slider .slider {
         position: relative;
         height: 12px;
         margin: 6px;
         border: 1px solid #a5a5a5;
         cursor: pointer;
     }
     .timecontrol-slider .slider.has-limits {
         margin-left: 15px;
         margin-right: 15px;
         background-color: #ddd;
     }
     .timecontrol-slider .slider.has-limits .range {
         position: absolute;
         height: 10px;
         background-color: #fff;
         /*opacity: 0.5;*/
     }
     .timecontrol-slider .knob {
         position: absolute;
         width: 8px;
         height: 22px;
         background-color: #ddd;
         border-radius: 2px;
         border: 1px solid #a5a5a5;
         /*use margins because on ie,leaflet will use top/left for positionning*/
         margin-top: -6px;
         margin-left: -4px;
         cursor: ew-resize;
         cursor: -webkit-grab;
         cursor: -moz-grab;
     }
     .timecontrol-slider .knob:after {
         /** Big transparent block on top of the knob for easier grabbing on touch device*/
         content: ' ';
         display: block;
         position: absolute;
         width: 20px;
         top:-5px;
         height: 32px;
         left: -7px;
        /* opacity: 0.5;
         background: red;*/

     }
     .timecontrol-slider .knob.upper,
     .timecontrol-slider .knob.lower {
         width: 11px;
         height: 20px;
         border: none;
         background-color: transparent;
     }
     .timecontrol-slider .knob.upper {
         margin-top: -5px;
         margin-left: -1px;
     }
     .timecontrol-slider .knob.lower {
         margin-top: -5px;
         margin-left: -10px;
     }
     .timecontrol-slider .knob.lower:after {
         right:0px;
         left: initial;
     }
     .timecontrol-slider .knob.upper:after {
         left:0px;
     }
     .timecontrol-slider .knob.upper:before,
     .timecontrol-slider .knob.lower:before {
         display: block;
         content: '';
         position: relative;
         top: 2px;
         width: 0;
         height: 0;
         border-style: solid;
     }
     .timecontrol-slider .knob.upper:before {
         border-width: 16px 0 0 10px;
         border-color: transparent transparent transparent #a5a5a5;
     }
     .timecontrol-slider .knob.lower:before {
         border-width: 0 0 16px 10px;
         border-color: transparent transparent #a5a5a5;
     }

     .timecontrol-slider .slider.dragging,
     .timecontrol-slider .dragging .knob,
     .timecontrol-slider .knob.leaflet-drag-target {
         cursor: ew-resize;
         cursor: grabbing;
         cursor: -webkit-grabbing;
         cursor: -moz-grabbing;
     }

     /**
     * Icons definitions
     */

     @-webkit-keyframes icon-rotation {
         from {
             -webkit-transform: rotate(0deg);
             transform: rotate(0deg);
         }
         to {
             -webkit-transform: rotate(360deg);
             transform: rotate(360deg);
         }
     }
     @keyframes icon-rotation {
         from {
             -webkit-transform: rotate(0deg);
             transform: rotate(0deg);
         }
         to {
             -webkit-transform: rotate(360deg);
             transform: rotate(360deg);
         }
     }
     .timecontrol-loop.looped,
     .timecontrol-loop.looped:hover {
         background-color: #ddd;
         color: #094F8E;
     }

     .timecontrol-backward:before,
     .timecontrol-forward:before,
     .timecontrol-stop:before,
     .timecontrol-play:before,
     .timecontrol-loop:before {
         width: 100%;
         text-align: center;
     }

     .timecontrol-play:before {
         position: absolute;
         content: '';
         background-image: url(images/map/play-button.svg);
         width: 30px;
         height: 30px;
         background-position: center center;
         background-repeat: no-repeat;
         background-size: 50%;

     }
     /*.timecontrol-play.play:before {
      content: '';
      background-image: url(images/map/play-button.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
     }*/
     .timecontrol-play.reverse:before {
      content: '';
      background-image: url(images/map/play-button.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
         -ms-transform: scaleX(-1);
         -webkit-transform: scaleX(-1);
         transform: scaleX(-1);
     }
     .timecontrol-play.pause:before {
      content: '';
      background-image: url(images/map/pause.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
     }
     .timecontrol-play.reverse.pause:before {
         -ms-transform: none;
         -webkit-transform: none;
         transform: none;
     }

     a.timecontrol-play.loading:before {
      content: '';
      background-image: url(images/map/share.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 90%;
         opacity: 0.2;
         -webkit-animation: icon-rotation 6s infinite linear;
         animation: icon-rotation 6s infinite linear;
     }
     .timecontrol-date.loading:before {
      content: '';
      background-image: url(images/map/share.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 90%;
         left: 5px;
         position: absolute;
         -webkit-animation: icon-rotation 6s infinite linear;
         animation: icon-rotation 6s infinite linear;
     }
     .timecontrol-speed:before {
      content: '';
      background-image: url(images/map/stopwatch.svg);
      width: 30px;
      height: 30px;
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 70%;
         position: absolute;
         left: 7px;
     }
     .timecontrol-stop:before {
      content: '';
      background-image: url(images/map/stop.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
     }
     .timecontrol-forward:before {
      content: '';
      background-image: url(images/map/next.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
     }
     .timecontrol-backward:before {
      content: '';
      background-image: url(images/map/back.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
    }

     .timecontrol-loop:before {
      content: '';
      background-image: url(images/map/repeat.svg);
      width: 30px;
      height: 30px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 50%;
     }

     @media (max-width: 767px){
         .leaflet-bar-timecontrol .timecontrol-date,
         .leaflet-bar-timecontrol .timecontrol-slider{
             clear: both;
             float: none;
             border-right: none;
         }
     }
     .leaflet-touch .leaflet-bar-timecontrol .leaflet-control-timecontrol{
          height: 30px;
         line-height: 30px;
     }
     .leaflet-touch .timecontrol-slider .slider{
         margin-top: 10px;
     }















      .leaflet-touch .leaflet-control-fullscreen a {
        background-image: url(images/map/fullon.svg);
        width: 30px;
        height: 30px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 18px 18px;
        }
      .leaflet-fullscreen-on .leaflet-control-fullscreen a {
        background-image: url(images/map/fulloff.svg);
        width: 30px;
        height: 30px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 18px 18px;
        }
      .leaflet-touch.leaflet-fullscreen-on .leaflet-control-fullscreen a {
        background-image: url(images/map/fulloff.svg);
        width: 30px;
        height: 30px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 18px 18px;
        }

    /* Do not combine these two rules; IE will break. */
    .leaflet-container:-webkit-full-screen {
      width:100%!important;
      height:100%!important;
      }
    .leaflet-container.leaflet-fullscreen-on {
      width:100%!important;
      height:100%!important;
      }

    .leaflet-pseudo-fullscreen {
      position:fixed!important;
      width:100%!important;
      height:100%!important;
      top:0!important;
      left:0!important;
      z-index:99999;
      }

    @media
      (-webkit-min-device-pixel-ratio:2),
      (min-resolution:192dpi) {
        .leaflet-control-fullscreen a {
          background-image:url(images/map/fullscreen@2x.png);
        }
      }


















      .leaflet-control-layers-group-name {
        font-weight: bold;
        margin-bottom: .2em;
        margin-left: 3px;
      }

      .leaflet-control-layers-group {
        margin-bottom: .5em;
      }

      .leaflet-control-layers-scrollbar {
        overflow-y: scroll;
        padding-right: 10px;
      }



















      /* Compatible with Leaflet 0.7 */
.leaflet-control-locate a {
  font-size: 1.4em;
  color: #444;
  cursor: pointer;
}
.leaflet-control-locate.active a {
  background-color: #90CAF9;
}
.leaflet-control-locate.active.following a {
  background-color: #AED581;
}

.leafet-control-locate-location circle {
  animation: leaflet-control-locate-throb 4s ease infinite;
}

@keyframes leaflet-control-locate-throb {
  0% {
    r: 9;
    stroke-width: 1;
  }
  50% {
    r: 7;
    stroke-width: 3;
  }
  100% {
    r: 9;
    stroke-width: 1;
  }
}




















.leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {
	-webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;
	-moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;
	-o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;
	transition: transform 0.3s ease-out, opacity 0.3s ease-in;
}

.leaflet-cluster-spider-leg {
	/* stroke-dashoffset (duration and function) should match with leaflet-marker-icon transform in order to track it exactly */
	-webkit-transition: -webkit-stroke-dashoffset 0.3s ease-out, -webkit-stroke-opacity 0.3s ease-in;
	-moz-transition: -moz-stroke-dashoffset 0.3s ease-out, -moz-stroke-opacity 0.3s ease-in;
	-o-transition: -o-stroke-dashoffset 0.3s ease-out, -o-stroke-opacity 0.3s ease-in;
	transition: stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in;
}







.marker-cluster-small {
	background-color: rgba(181, 226, 140, 0.6);
	}
.marker-cluster-small div {
	background-color: rgba(110, 204, 57, 0.6);
	}

.marker-cluster-medium {
	background-color: rgba(241, 211, 87, 0.6);
	}
.marker-cluster-medium div {
	background-color: rgba(240, 194, 12, 0.6);
	}

.marker-cluster-large {
	background-color: rgba(253, 156, 115, 0.6);
	}
.marker-cluster-large div {
	background-color: rgba(241, 128, 23, 0.6);
	}

	/* IE 6-8 fallback colors */
.leaflet-oldie .marker-cluster-small {
	background-color: rgb(181, 226, 140);
	}
.leaflet-oldie .marker-cluster-small div {
	background-color: rgb(110, 204, 57);
	}

.leaflet-oldie .marker-cluster-medium {
	background-color: rgb(241, 211, 87);
	}
.leaflet-oldie .marker-cluster-medium div {
	background-color: rgb(240, 194, 12);
	}

.leaflet-oldie .marker-cluster-large {
	background-color: rgb(253, 156, 115);
	}
.leaflet-oldie .marker-cluster-large div {
	background-color: rgb(241, 128, 23);
}

.marker-cluster {
	background-clip: padding-box;
	border-radius: 20px;
	}
.marker-cluster div {
	width: 30px;
	height: 30px;
	margin-left: 5px;
	margin-top: 5px;

	text-align: center;
	border-radius: 15px;
	font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
	}
.marker-cluster span {
	line-height: 30px;
  }


.locationon {
  background-image: url(images/map/locationon.svg);
  width: 30px;
  height: 30px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 18px 18px;
}
.locationoff {
  background-image: url(images/map/locationoff.svg);
  width: 30x;
  height: 30px;
  background-position: center center;
  background-repeat: no-repeat
  background-size: 18px 18px;
}














.leaflet-bar button,
.leaflet-bar button:hover {
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 26px;
  height: 26px;
  line-height: 26px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: black;
}

.leaflet-bar button {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  overflow: hidden;
  display: block;
}

.leaflet-bar button:hover {
  background-color: #f4f4f4;
}

.leaflet-bar button:first-of-type {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.leaflet-bar button:last-of-type {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: none;
}

.leaflet-bar.disabled,
.leaflet-bar button.disabled {
  cursor: default;
  pointer-events: none;
  opacity: .4;
}

.easy-button-button .button-state{
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}


.leaflet-touch .leaflet-bar button {
  width: 30px;
  height: 30px;
  line-height: 30px;
}














/* ================================================================== */
/* Toolbars
/* ================================================================== */

.leaflet-draw-section {
	position: relative;
}

.leaflet-draw-toolbar {
	margin-top: 12px;
}

.leaflet-draw-toolbar-top {
	margin-top: 0;
}

.leaflet-draw-toolbar-notop a:first-child {
	border-top-right-radius: 0;
}

.leaflet-draw-toolbar-nobottom a:last-child {
	border-bottom-right-radius: 0;
}

.leaflet-draw-toolbar a {
	background-image: url('images/map/spritesheet.png');
	background-image: linear-gradient(transparent, transparent), url('images/map/spritesheet.svg');
	background-repeat: no-repeat;
	background-size: 300px 30px;
	background-clip: padding-box;
}

.leaflet-retina .leaflet-draw-toolbar a {
	background-image: url('images/map/spritesheet-2x.png');
	background-image: linear-gradient(transparent, transparent), url('images/map/spritesheet.svg');
}

.leaflet-draw a {
	display: block;
	text-align: center;
	text-decoration: none;
}

.leaflet-draw a .sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
}

/* ================================================================== */
/* Toolbar actions menu
/* ================================================================== */

.leaflet-draw-actions {
	display: none;
	list-style: none;
	margin: 0;
	padding: 0;
	position: absolute;
	left: 26px; /* leaflet-draw-toolbar.left + leaflet-draw-toolbar.width */
	top: 0;
	white-space: nowrap;
}

.leaflet-touch .leaflet-draw-actions {
	left: 32px;
}

.leaflet-right .leaflet-draw-actions {
	right: 26px;
	left: auto;
}

.leaflet-touch .leaflet-right .leaflet-draw-actions {
	right: 32px;
	left: auto;
}

.leaflet-draw-actions li {
	display: inline-block;
}

.leaflet-draw-actions li:first-child a {
	border-left: none;
}

.leaflet-draw-actions li:last-child a {
	-webkit-border-radius: 0 4px 4px 0;
	border-radius: 0 4px 4px 0;
}

.leaflet-right .leaflet-draw-actions li:last-child a {
	-webkit-border-radius: 0;
	border-radius: 0;
}

.leaflet-right .leaflet-draw-actions li:first-child a {
	-webkit-border-radius: 4px 0 0 4px;
	border-radius: 4px 0 0 4px;
}

.leaflet-draw-actions a {
	background-color: #919187;
	border-left: 1px solid #AAA;
	color: #FFF;
	font: 11px/19px "Helvetica Neue", Arial, Helvetica, sans-serif;
	line-height: 28px;
	text-decoration: none;
	padding-left: 10px;
	padding-right: 10px;
	height: 28px;
}

.leaflet-touch .leaflet-draw-actions a {
	font-size: 12px;
	line-height: 30px;
	height: 30px;
}

.leaflet-draw-actions-bottom {
	margin-top: 0;
}

.leaflet-draw-actions-top {
	margin-top: 1px;
}

.leaflet-draw-actions-top a,
.leaflet-draw-actions-bottom a {
	height: 27px;
	line-height: 27px;
}

.leaflet-draw-actions a:hover {
	background-color: #A0A098;
}

.leaflet-draw-actions-top.leaflet-draw-actions-bottom a {
	height: 26px;
	line-height: 26px;
}

/* ================================================================== */
/* Draw toolbar
/* ================================================================== */

.leaflet-draw-toolbar .leaflet-draw-draw-polyline {
	background-position: -2px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-polyline {
	background-position: 0 -1px;
}

.leaflet-draw-toolbar .leaflet-draw-draw-polygon {
	background-position: -31px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-polygon {
	background-position: -29px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-draw-rectangle {
	background-position: -62px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-rectangle {
	background-position: -60px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-draw-circle {
	background-position: -92px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-circle {
	background-position: -90px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-draw-marker {
	background-position: -122px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-marker {
	background-position: -120px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-draw-circlemarker {
	background-position: -273px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-circlemarker {
	background-position: -271px -1px;
}

/* ================================================================== */
/* Edit toolbar
/* ================================================================== */

.leaflet-draw-toolbar .leaflet-draw-edit-edit {
	background-position: -152px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-edit {
	background-position: -150px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-edit-remove {
	background-position: -182px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-remove {
	background-position: -180px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-edit-edit.leaflet-disabled {
	background-position: -212px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-edit.leaflet-disabled {
	background-position: -210px -1px;
}

.leaflet-draw-toolbar .leaflet-draw-edit-remove.leaflet-disabled {
	background-position: -242px -2px;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-edit-remove.leaflet-disabled {
	background-position: -240px -2px;
}

/* ================================================================== */
/* Drawing styles
/* ================================================================== */

.leaflet-mouse-marker {
	background-color: #fff;
	cursor: crosshair;
}

.leaflet-draw-tooltip {
	background: rgb(54, 54, 54);
	background: rgba(0, 0, 0, 0.5);
	border: 1px solid transparent;
	-webkit-border-radius: 4px;
	border-radius: 4px;
	color: #fff;
	font: 12px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
	margin-left: 20px;
	margin-top: -21px;
	padding: 4px 8px;
	position: absolute;
	visibility: hidden;
	white-space: nowrap;
	z-index: 6;
}

.leaflet-draw-tooltip:before {
	border-right: 6px solid black;
	border-right-color: rgba(0, 0, 0, 0.5);
	border-top: 6px solid transparent;
	border-bottom: 6px solid transparent;
	content: "";
	position: absolute;
	top: 7px;
	left: -7px;
}

.leaflet-error-draw-tooltip {
	background-color: #F2DEDE;
	border: 1px solid #E6B6BD;
	color: #B94A48;
}

.leaflet-error-draw-tooltip:before {
	border-right-color: #E6B6BD;
}

.leaflet-draw-tooltip-single {
  margin-top: -12px;
}

.leaflet-draw-tooltip-subtext {
	color: #f8d5e4;
}

.leaflet-draw-guide-dash {
	font-size: 1%;
	opacity: 0.6;
	position: absolute;
	width: 5px;
	height: 5px;
}

/* ================================================================== */
/* Edit styles
/* ================================================================== */

.leaflet-edit-marker-selected {
	background-color: rgba(254, 87, 161, 0.1);
	border: 4px dashed rgba(254, 87, 161, 0.6);
	-webkit-border-radius: 4px;
	border-radius: 4px;
	box-sizing: content-box;
}

.leaflet-edit-move {
	cursor: move;
}

.leaflet-edit-resize {
	cursor: pointer;
}

/* ================================================================== */
/* Old IE styles
/* ================================================================== */

.leaflet-oldie .leaflet-draw-toolbar {
	border: 1px solid #999;
}
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
