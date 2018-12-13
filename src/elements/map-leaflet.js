/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-spinner/paper-spinner.js";

// import * as L from "leaflet/dist/leaflet-src.esm.js";
/*global L*/
/*global JNC*/
import "./leaflet-style.js";

/**
* @polymer
* @extends HTMLElement
*/
class MapLeaflet extends PolymerElement {
  static get template() {
    return html`

      <style include="leaflet-style">
          :host {
            display: block;
            overflow: hidden;
          }

          #map {
            height: calc(100% - 64px);
            width: 100%;
            border: none;
            position: absolute;
          }

          paper-spinner {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            z-index:1;
          }
      </style>

        <paper-spinner active$="[[loading]]"></paper-spinner>
        <div id="map"></div>

    `;
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      redraw: {
        type: String,
        observer: "redrawMap"
      },
      theme: {
        type: Boolean,
        observer: "_themer",
      },
    };
  }

  constructor() {
    super();

    this.path = document.getElementsByTagName('base')[0].href;

    var load_script = function (src) {
      // Initialize scripts queue
      if (load_script.scripts === undefined) {
        load_script.scripts = [];
        load_script.index = -1;
        load_script.loading = false;
        load_script.next = function () {
          if (load_script.loading) return;

          // Load the next queue item
          load_script.loading = true;
          var item = load_script.scripts[++load_script.index];
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = item.src;
          // When complete, start next item in queue and resolve this item's promise
          script.onload = () => {
            load_script.loading = false;
            if (load_script.index < load_script.scripts.length - 1) load_script.next();
            item.resolve();
          };
          script.onerror = (error) => {
            console.log(error);
            this._map();
          };
          head.appendChild(script);
        }.bind(this);
      }

      // Adding a script to the queue
      if (src) {
        // Check if already added
        for (var i = 0; i < load_script.scripts.length; i++) {
          if (load_script.scripts[i].src == src) return load_script.scripts[i].promise;
        }
        // Add to the queue
        var item = {
          src: src
        };
        item.promise = new Promise(resolve => {
          item.resolve = resolve;
        });
        load_script.scripts.push(item);
        load_script.next();
      }

      // Return the promise of the last queue item
      return load_script.scripts[load_script.scripts.length - 1].promise;
    }.bind(this);

    load_script("/files/leaflet.js")
      .then(function () {

        load_script("https://webapiv2.navionics.com/dist/webapi/webapi.min.no-dep.js")
          .then(function () {
            console.log("Navionics loaded");
            this._map();
          }.bind(this));

      }.bind(this));

  }

  redrawMap() {
    if (this.map) {
      this.map.invalidateSize(true);
    }
  }

  _themer() {
    if (this.thm) {
      //this.map.remove();
      //this._map();
      if (this.theme) {
        this.map.removeLayer(this.normalDayGrey);
        this.normalNightGrey.addTo(this.map);
      } else {
        this.map.removeLayer(this.normalNightGrey);
        this.normalDayGrey.addTo(this.map);
      }
    }
    this.thm = true;
  }

  _getCommonBaseLayers() {

    //var baseLayer = L.tileLayer(layer, {
    //  attribution: '<a href="https://carto.com" target="_blank">CARTO</a>, <a href="https://www.navionics.com" target="_blank">Navionics</a>'
    //});

    //var satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //  attribution: '<a href="http://www.esri.com/">Esri</a>, <a href="https://www.navionics.com" target="_blank">Navionics</a>'
    //});

    //var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>, <a href="https://www.navionics.com" target="_blank">Navionics</a>'
    //});

    //var topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    //  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>, <a href="https://opentopomap.org">OpenTopoMap</a>, <a href="https://www.navionics.com" target="_blank">Navionics</a>'
    //});

    //baseLayer.addTo(map);

    var sizer;
    var mobiler;

    if (window.devicePixelRatio > 1.25) {
      sizer = '512';
      mobiler = 'Mobile';
    } else {
      sizer = '256';
      mobiler = '';
    }

    var hereapp = 'NdkMrMurjWfHaNu81iK1';
    var herecode = 'N_t7P1-PshyISTb5oKd7Dg';

    this.normalDayGrey = L.tileLayer.provider('HERE.normalDayGrey' + mobiler, {
      app_id: hereapp,
      app_code: herecode,
      subdomains: '1',
      size: sizer
    });

    this.normalNightGrey = L.tileLayer.provider('HERE.normalNightGrey' + mobiler, {
      app_id: hereapp,
      app_code: herecode,
      subdomains: '1',
      size: sizer
    });

    this.satelliteDay = L.tileLayer.provider('HERE.satelliteDay', {
      app_id: hereapp,
      app_code: herecode,
      subdomains: '1',
      size: sizer
    });

    this.terrainDay = L.tileLayer.provider('HERE.terrainDay' + mobiler, {
      app_id: hereapp,
      app_code: herecode,
      subdomains: '1',
      size: sizer
    });

    if (this.theme) {
      this.normalNightGrey.addTo(this.map);
    } else {
      this.normalDayGrey.addTo(this.map);
    }

    return {
      "Day": this.normalDayGrey,
      "Night": this.normalNightGrey,
      "Satelite": this.satelliteDay,
      "Topographic": this.terrainDay,
    };

  }

  _locate() {

    this.locate = L.control.locate({
      position: 'topleft', // set the location of the control
      layer: undefined, // use your own layer for the location marker, creates a new layer by default
      drawCircle: false, // controls whether a circle is drawn that shows the uncertainty about the location
      setView: 'untilPan', // automatically sets the map view to the user's location, enabled if `follow` is true
      keepCurrentZoomLevel: false, // keep the current map zoom level when displaying the user's location. (if `false`, use maxZoom)
      stopFollowingOnDrag: false, // stop following when the map is dragged if `follow` is true (deprecated, see below)
      remainActive: false, // if true locate control remains active on click even if the user's location is in view.
      markerClass: L.circleMarker, // L.circleMarker or L.marker
      circleStyle: {}, // change the style of the circle around the user's location
      markerStyle: {},
      followCircleStyle: {}, // set difference for the style of the circle around the user's location while following
      followMarkerStyle: {},
      icon: 'locationon', // class for icon, fa-location-arrow or fa-map-marker
      iconLoading: 'locationoff', // class for loading icon
      iconElementTag: 'div', // tag for the icon element, span or i
      circlePadding: [0, 0], // padding around accuracy circle, value is passed to setBounds
      metric: true, // use metric or imperial units
      onLocationError: function (err) {
        alert(err.message);
        //toast0.text = 'Can\'t find your location.';
        //toast0.open();
        //ga('send', 'event', 'error', 'GPS Napaka');
      }, // define an error callback function
      onLocationOutsideMapBounds: function (context) { // called when outside map boundaries
        alert(context.options.strings.outsideMapBoundsMsg);
        //ga('send', 'event', 'error', 'GPS Napaka');
      },
      showPopup: true, // display a popup when the user click on the inner marker
      strings: {
        title: "Pokaži kje se nahajam", // title of the locate control
        metersUnit: "metrov", // string for metric units
        feetUnit: "feet", // string for imperial units
        popup: "Ti si v območju {distance} {unit} od te točke", // text to appear if user clicks on circle
        outsideMapBoundsMsg: "Zgleda da se nahajaš izven območja zemljevida" // default message for onLocationOutsideMapBounds
      },
      locateOptions: {
        enableHighAccuracy: true,
        maxZoom: 15,
        minZoom: 14,
      } // define location options e.g enableHighAccuracy: true or maxZoom: 10
    });

    this.locate.addTo(this.map);

  }

_draw() {

  this.mymarkerscluster = L.markerClusterGroup({
    removeOutsideVisibleBounds: false,
    maxClusterRadius: 45
  });

  this.editableLayers = new L.FeatureGroup();

    var MyCustomMarker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: '../images/map/marker-icon-2x.png'
      }
    });

    var options = {
      position: 'topleft',
      draw: {
        polyline: false,
        polygon: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: {
          icon: new MyCustomMarker()
        },
      },
      edit: {
        featureGroup: this.editableLayers, //REQUIRED!!
        remove: true
      }
    };

    var drawControl = new L.Control.Draw(options);
    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType,
        layer = e.layer;

      if (type === 'marker') {
        layer.bindPopup('A popup!');
      }

      this.editableLayers.addLayer(layer);

    }.bind(this));



    //this.mymarkerscluster.addLayer(this.editableLayers);
    //this.mymarkerscluster.addTo(this.map);
    this.map.addLayer(this.editableLayers);

}

  _map() {

    L.Icon.Default.imagePath = "images/map/";

    var map = L.map(this.$.map, {
      fullscreenControl: true,
      detectRetina: true,
      timeDimension: true,
      reuseTiles: true,
      zoom: 9,
    }).on('load', function () {
      this.loading = false;
    }.bind(this));

    this.map = map;
    map.setView([45.5282, 13.5681], 9);
    map.options.maxZoom = 19;


    L.Control.TimeDimensionCustom = L.Control.TimeDimension.extend({

    });
    var timeDimensionControl = new L.Control.TimeDimensionCustom({
      speedSlider: true,
      loopButton: true,
      limitSliders: true,
      minBufferReady: 2,
      buffer: 7,
      minSpeed: 0.5,
      maxSpeed: 2,
      playerOptions: {
        loop: true
      }
    });

    var testWMS = "https://ogcie.iblsoft.com/metocean/wms";
    //var valov = "https://nrt.cmems-du.eu/thredds/wms/sv04-med-hcmr-wav-an-fc-h"
    //var eumetsat = "https://eumetview.eumetsat.int/geoserv/wms"


    var padavineLayer = L.tileLayer.wms(testWMS, {
      layers: 'gefs-precipication-6h', // isobaric levels, or -agl for above ground levels
      format: 'image/png; mode=8bit',
      transparent: true,
      opacity: 0.3,
      crs: L.CRS.EPSG4326,
      zIndex: 2,
      attribution: 'OGC MetOcean'
    });

    var veterLayer = L.tileLayer.wms(testWMS, {
      layers: 'gfs-wind-agl', // isobaric levels, or -agl for above ground levels
      format: 'image/png; mode=8bit',
      zIndex: 2,
      transparent: true,
      opacity: 0.7,
      crs: L.CRS.EPSG4326,
      attribution: 'OGC MetOcean'
    });

    var temperaturaLayer = L.tileLayer.wms(testWMS, {
      layers: 'gefs-temperature-agl', // isobaric levels, or -agl for above ground levels
      format: 'image/png; mode=8bit',
      zIndex: 2,
      transparent: true,
      opacity: 0.3,
      crs: L.CRS.EPSG4326,
      attribution: 'OGC MetOcean'
    });

    var proxy = 'https://x.bazdara.com/proxy.php';

    var padavine = L.timeDimension.layer.wms(padavineLayer, {
      proxy: proxy,
      updateTimeDimension: true,
      setDefaultTime: true,
      wmsVersion: "1.3.0"
    });

    var veter = L.timeDimension.layer.wms(veterLayer, {
      proxy: proxy,
      updateTimeDimension: true,
      setDefaultTime: true,
      wmsVersion: "1.3.0"
    });

    var temper = L.timeDimension.layer.wms(temperaturaLayer, {
      proxy: proxy,
      updateTimeDimension: true,
      setDefaultTime: true,
      wmsVersion: "1.3.0"
    });

    //padavine.addTo(map3);

    var trafikLayer = L.tileLayer('https://tiles.marinetraffic.com/ais_helpers/shiptilesingle.aspx?output=png&sat=1&grouping=shiptype&tile_size=256&legends=1&zoom={z}&X={x}&Y={y}', {

      attribution: '<a href="https://www.marinetraffic.com target="_blank">MarineTraffic</a>'
    });

    var strele = L.tileLayer('https://tiles.lightningmaps.org/?x={x}&y={y}&z={z}&s=256&t=4', {
      attribution: '<a href="https://lightningmaps.org" target="_blank">Lightning Maps</a>'
    });

    var seaLayer = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
      attribution: '<a href="https://openseamap.org" target="_blank">OpenSea Map</a>'
    });

    this.baseLayers = this._getCommonBaseLayers(map); // see baselayers.js

    this.markerscluster = L.markerClusterGroup({
      removeOutsideVisibleBounds: false,
      maxClusterRadius: 45
    });

    this._locate();
    this._draw();

    var navionic;
    var groupedOverlays;

    try {
      navionic = new JNC.Leaflet.NavionicsOverlay({
        navKey: 'Navionics_webapi_01983',
        chartType: JNC.NAVIONICS_CHARTS.SONARCHART,
        isTransparent: true,
        safetyDepth: JNC.SAFETY_DEPTH_LEVEL.LEVEL4,
        zIndex: 1
      });

      //navionic.addTo(map);

      groupedOverlays = {
        "Pomorstvo": {
          "Navionics": navionic,
          "Pomorski promet": trafikLayer,
          "Pomorske oznake": seaLayer
        },
        "Pozicije": {
          "Pristanišča": this.markerscluster,
          "Moje pozicije": this.mymarkerscluster
        },
        "Vreme": {
          "Napoved padavin": padavine,
          "Napoved vetera": veter,
          "Napoved temperature": temper,
          "Trenutno strele": strele
        }
      };

    } catch (e) {
      navionic = trafikLayer;
      seaLayer.addTo(map);
      console.log('Navionics maps are offline');
      console.log(e);

      groupedOverlays = {
        "Pomorstvo": {
          "Pomorski promet": trafikLayer,
          "Pomorske oznake": seaLayer,
        },
        "Pozicije": {
          "Pristanišča": this.markerscluster,
          "Moje pozicije": this.editableLayers
        },
        "Vreme": {
          "Napoved padavin": padavine,
          "Napoved vetera": veter,
          "Napoved temperature": temper,
          "Trenutno strele": strele
        }
      };
    }

    map.on('tileerror', function (error, tile) {
      console.log(error);
      console.log(tile);
    });


    this._scales = L.control.scale({
      position: 'bottomright'
    });
    this._scales.addTo(map);



    var testLegend = L.control({
      position: 'bottomleft'
    });
    var testLegend2 = L.control({
      position: 'bottomleft'
    });

    testLegend.onAdd = function () {
      var src = testWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=gefs-precipication-6h&STYLE=default";
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
        '<img style="width:216px" src="' + src + '" alt="legend">';
      return div;
    };

    testLegend2.onAdd = function () {
      var src = testWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=gefs-temperature-agl&STYLE=default";
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
        '<img style="width:216px" src="' + src + '" alt="legend">';
      return div;
    };
    //testLegend.addTo(map);

    this.add1 = "0";
    this.add2 = "0";
    this.add3 = "0";
    this.add4 = "0";

    map.on('popupopen', function (e) {
      var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
      px.y -= e.popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      map.panTo(map.unproject(px), {
        animate: true
      }); // pan to new center
    });

    map.on('overlayadd', function (groupedOverlays) {
      if (groupedOverlays.name == 'Napoved padavin') {

        if (this.add2 == "0" && this.add3 == "0") {
          timeDimensionControl.addTo(map);
        }
        testLegend.addTo(map);

        this.add1 = "1";
        //ga('send', 'event', 'view', 'Map Padavine');
      } else if (groupedOverlays.name == 'Napoved vetera') {

        if (this.add1 == "0" && this.add3 == "0") {
          timeDimensionControl.addTo(map);
        }

        this.add2 = "1";
        //ga('send', 'event', 'view', 'Map Veter');
      } else if (groupedOverlays.name == 'Napoved temperature') {

        if (this.add1 == "0" && this.add2 == "0") {
          timeDimensionControl.addTo(map);
        }
        testLegend2.addTo(map);

        this.add3 = "1";
        //ga('send', 'event', 'view', 'Map Temperatura');
      } else if (groupedOverlays.name == 'Val') {

        if (this.add1 == "0" && this.add2 == "0") {
          timeDimensionControl.addTo(map);
        }

        this.add4 = "1";
        //ga('send', 'event', 'view', 'Map Temperatura');
      } else if (groupedOverlays.name == 'Navionics') {
        var zoomLev = map.getZoom();
        if (zoomLev > 16) {
          map.setZoom(16);
        }
        map.options.maxZoom = 16;
        //ga('send', 'event', 'view', 'Map Navionics');
      } else if (groupedOverlays.name == 'Pomorske oznake') {
        //ga('send', 'event', 'view', 'Map Sea Marks');
      } else if (groupedOverlays.name == 'Pomorski promet') {
        //ga('send', 'event', 'view', 'Map Marine Traffic');
      }




    }.bind(this));

    map.on('overlayremove', function (groupedOverlays) {
      if (groupedOverlays.name == 'Napoved padavin') {
        map.removeControl(testLegend);

        if (this.add2 == "0" && this.add3 == "0") {
          map.removeControl(timeDimensionControl);
        }

        this.add1 = "0";
      } else if (groupedOverlays.name == 'Napoved vetera') {
        //map.removeControl(velocityLegend);
        if (this.add1 == "0" && this.add3 == "0") {
          map.removeControl(timeDimensionControl);
        }
        this.add2 = "0";
      } else if (groupedOverlays.name == 'Napoved temperature') {
        //map.removeControl(velocityLegend);
        map.removeControl(testLegend2);
        if (this.add1 == "0" && this.add2 == "0") {
          map.removeControl(timeDimensionControl);
        }
        this.add3 = "0";
      } else if (groupedOverlays.name == 'Navionics') {
        map.options.maxZoom = 18;
      } else if (groupedOverlays.name == 'Pomorske oznake') {
        //ga('send', 'event', 'view', 'Map Sea Marks');
      } else if (groupedOverlays.name == 'Pomorski promet') {
        //ga('send', 'event', 'view', 'Map Marine Traffic');
      }
    }.bind(this));

    L.control.groupedLayers(this.baseLayers, groupedOverlays).addTo(map);

    map.timeDimension.on('timeload', function () {
      this.loading = false;
    }.bind(this));

    // `fullscreenchange` Event that's fired when entering or exiting fullscreen.
    map.on('fullscreenchange', function () {
      if (map.isFullscreen()) {
        console.log('entered fullscreen');
        //ga('send', 'event', 'view', 'FullScreen Navigacija');
      } else {
        console.log('exited fullscreen');
        map.invalidateSize(true);
      }
    });

    map.on("zoomend", function () {
      //ga('send', 'event', 'view', 'Zoom Navigacija');
    });

    map.on('locationfound', function () {
      //ga('send', 'event', 'view', 'GPS Navigacija');
    });

    function onEachFeature(feature, layer) {

      var popupContent =
        '<style>.warning{padding:5px;background-color:#D32F2F;color:#fff;margin-bottom:15px}h2{width:240px;text-align:center;font-size:16px}.poper{margin-right:5px;}.pop{height:340px;overflow-y:auto;overflow-x:hidden}@media (max-width:720px) and (orientation:landscape){.pop{height:200px}}@media (min-width:721px){h2{width:550px}.pop{font-size:14px;text-align:justify;height:390px}}@media (min-width:1199px){h2{width:750px}.pop{font-size:14px;text-align:justify;height:530px}}.leaflet-popup-content{margin-top:16px;margin-left:5px;margin-right:0px;margin-bottom:12px}.pop::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);background-color:#F5F5F5;}.pop::-webkit-scrollbar{width:6px;background-color:#F5F5F5;}.pop::-webkit-scrollbar-thumb{background-color:#1e88e5;}</style><div class="pop"><div class="poper">';

      popupContent += '<h2>' + feature.properties.Name + '</h2>';

      if (feature.properties && feature.properties.img) {
        popupContent += '<div style="margin-bottom:24px"><img id="slika" src="https://x.bazdara.com/pristan/' + feature.properties.img +
          '.jpg" style="max-width:100%" /><fullscreen-icon-button target="#slika" class="fullscreen" title="fullscreen" tabindex="0" alt="fullscreen" style="margin-top:-52px;margin-left:15px"></fullscreen-icon-button></div>';
      }

      if (feature.properties && feature.properties.img2) {
        popupContent += '<div style="margin-bottom:24px"><img id="slika2" src="https://x.bazdara.com/pristan/' + feature.properties.img2 +
          '.png" style="max-width:100%" /><fullscreen-icon-button target="#slika2" class="fullscreen" title="fullscreen" tabindex="0" alt="fullscreen" style="margin-top:-52px;margin-left:15px"></fullscreen-icon-button></div>';
      }


      if (feature.properties && feature.properties.warning) {
        popupContent += '<div class="warning">';

        if (feature.properties.lang) {
          popupContent += '<span lang="' + feature.properties.lang + '">';
        }

        popupContent += feature.properties.warning;

        if (feature.properties.lang) {
          popupContent += '</span>';
        }

        popupContent += '</div>';
      }

      if (feature.properties && feature.properties.description) {

        if (feature.properties.lang) {
          popupContent += '<span lang="' + feature.properties.lang + '">';
        }
        popupContent += feature.properties.description;

        if (feature.properties.lang) {
          popupContent += '</span>';
        }

      }

      popupContent += '</div></div>';


      layer.bindPopup(popupContent, {
        'maxWidth': 'auto',
        'className': 'custompop'
      });
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://x.bazdara.com/pristan/pristani.json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {

        var harbour = L.icon({
          iconUrl: this.path + 'images/map/harbour.png',
          iconSize: [18, 18], // size of the icon
        });

        var anchor = L.icon({
          iconUrl: this.path + 'images/map/anchor.png',
          iconSize: [18, 18], // size of the icon
        });

        var lighthouse = L.icon({
          iconUrl: this.path + 'images/map/lighthouse.png',
          iconSize: [18, 18], // size of the icon
        });

        var buoy = L.icon({
          iconUrl: this.path + 'images/map/buoy.png',
          iconSize: [18, 18], // size of the icon
        });

        var wreck = L.icon({
          iconUrl: this.path + 'images/map/wreck.png',
          iconSize: [18, 18], // size of the icon
        });

        var pristan = L.geoJSON(JSON.parse(xhr.responseText), {

          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {

            if (feature.properties.type == "harbour") {
              return L.marker(latlng, {
                icon: harbour
              });
            } else if (feature.properties.type == "anchor") {
              return L.marker(latlng, {
                icon: anchor
              });
            } else if (feature.properties.type == "lighthouse") {
              return L.marker(latlng, {
                icon: lighthouse
              });
            } else if (feature.properties.type == "buoy") {
              return L.marker(latlng, {
                icon: buoy
              });
            } else if (feature.properties.type == "wreck") {
              return L.marker(latlng, {
                icon: wreck
              });
            }

          }

        });

        this.markerscluster.addLayer(pristan);
        this.markerscluster.addTo(map);
      }
    }.bind(this);
    xhr.send();

  }
}

window.customElements.define("map-leaflet", MapLeaflet);
