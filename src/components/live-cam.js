import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/notification-icons.js';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import '../elements/geo-location.js';
import '../elements/fullscreen-api.js';
import '../elements/fullscreen-icon-button.js';

const databaseRef = firebase.database().ref();
export const cameraRef = databaseRef.child("camera");

class LiveCam extends PolymerElement {

  static get template() {
    return html `
      <style>
      :host {
        display: block;
        box-sizing: border-box;
        --paper-toolbar-background: var(--paper-blue-600);
        --paper-items-selection-bar-color: var(--paper-blue-600);
        --paper-item-ink: var(--paper-blue-600);
      }

     iron-image {
       --iron-image-width: 100%;
       margin-bottom: -7px;
       --iron-image-placeholder: {
         width: 100%;
       }
     }

     .full {
       margin-top: -170px;
       margin-left: 13px;
       position: absolute;
     }


     paper-icon-button{
       color: #000;
       margin-bottom: 10px;
       --paper-icon-button-ink-color: #000;
       border-radius: 50%;
       width: 36px;
       height: 36px;
       background-color: #fff
     }

     fullscreen-icon-button {
       color: #000;
       --paper-icon-button-ink-color: #000;
       border-radius: 50%;
       width: 36px;
       height: 36px;
       padding: 0;
       background-color: #fff
     }

     .cam {
       width: 309px;
       height: 175px;
       position: relative;
     }

     #video {
       width: 100%;
       height: 100%;
       object-fit: inherit;
     }

     paper-icon-button.play {
       color: #F44336;
       --paper-icon-button-ink-color: #F44336;
     }


     paper-dropdown-menu {
       width: 100%;
       padding: 0 10px;
     }

     paper-item {
     --paper-item-selected: {
         background-color: #90CAF9;
     };

     --paper-item-focused: {
         background-color: #1e88e5;
     };

     --paper-item-focused-before: {
         background-color: #1e88e5;
     };
    }

    .yellow-button {
      text-transform: none;
      color: #eeff41;
      font-weight: bold;
    }

    .cont {
      font-size: 12px;
      min-width: 180px;
      overflow-x: hidden;
      min-height: 36px;
      border-bottom: 1px solid #f0f0f0;
    }
    paper-spinner {
      position:absolute;
      margin-left: -14px;
      left:50%;
      top:50%"
    }

      </style>

      <geo-location latitude="{{lat}}" longitude="{{lng}}"></geo-location>

      <div class="cam">

        <paper-spinner active$="[[loadin]]"></paper-spinner>
        <video poster$="[[poster]]" id="video" preload="none"></video>

        <div class="full">
          <paper-icon-button class$="video {{videoClass}}" on-tap="videoClick" icon="notification:live-tv" active={{active}} hidden="{{disabled}}"></paper-icon-button>
          <fullscreen-icon-button target="#video" class="fullscreen" title="fullscreen" tabindex="0" alt="fullscreen" onclick="ga('send', 'event', 'Kamera', 'Fullscreen');"></fullscreen-icon-button>
        </div>

      </div>

      <paper-dropdown-menu label="{{selectcam}}" style="margin-top:-8px;margin-bottom:-8px">
        <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="id" selected="{{tabselect}}">
          <paper-item class="cont" hidden$="[[cameras.sipiran04]]" id="sipiran04" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Piran');">
            Piran
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.sipiran03]]" id="sipiran03" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Piran Tartini');">
            Piran&nbsp;-&nbsp;Tartini
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.sipiranpunta]]" id="sipiranpunta" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Piran Panorama');">
            Piran&nbsp;-&nbsp;Panorama
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.podvodna]]" id="podvodna" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Piran Podvodna');">
            Piran&nbsp;-&nbsp;Podvodna
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siportoroz03]]" id="siportoroz03" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Portorož');">
            Portorož
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siportoroz05]]" id="siportoroz05" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Portorož Panorama 1');">
            Portorož&nbsp;Panorama&nbsp;1
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siportoroz04]]" id="siportoroz04" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Portorož Panorama 2');">
            Portorož&nbsp;Panorama&nbsp;2
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.sifiesa01]]" id="sifiesa01" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Fiesa');">
            Fiesa
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.sistrunjan01]]" id="sistrunjan01" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Strunjan');">
            Strunjan
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.sisolinesecovlje]]" id="sisolinesecovlje" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Soline');">
            Seča&nbsp;Soline
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siljpz1]]" id="siljpz1" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'AP Porotorož');">
            AP&nbsp;Portorož
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.izola]]" id="izola" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Izola');">
            Izola
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siizola1]]" id="siizola1" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Izola San Simon');">
            Izola&nbsp;San&nbsp;Simon
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siizola3]]" id="siizola3" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Izola Panorama');">
            Izola&nbsp;Panorama
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siwcKOPERMARKOVECn]]" id="siwcKOPERMARKOVECn" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Markovec');">
            Markovec
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.siwcKOPERMARKOVECe]]" id="siwcKOPERMARKOVECe" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Koper');">
            Koper
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.trst]]" id="trst" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Trst');">
            Trst
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.kanegra]]" id="kanegra" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Kanegra');">
            Kanegra
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrgolfadriatic1]]" id="hrgolfadriatic1" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Crveni Vrh');">
            Crveni Vrh
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrsavudrija1]]" id="hrsavudrija1" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Savudrija');">
            Savudrija
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrumag4]]" id="hrumag4" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Umag');">
            Umag
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrnovigrad1]]" id="hrnovigrad1" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Novigrad');">
            Novigrad
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrporec03]]" id="hrporec03" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Poreč');">
            Poreč
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrporec1]]" id="hrporec1" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Poreč Marina');">
            Poreč Marina
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrrovinj2]]" id="hrrovinj2" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Rovinj');">
            Rovinj&nbsp;Panorama
          </paper-item>
          <paper-item class="cont" hidden$="[[cameras.hrrovinj3]]" id="hrrovinj3" on-tap="onTabSelect" onclick="ga('send', 'event', 'Kamera', 'Rovinj Center');">
            Rovinj&nbsp;Center
          </paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

      <paper-toast id="noVideo" duration="0">
        <b><i18n-msg msgid="camoffline">Kamera ni dosegljiva</i18n-msg></b> <paper-button on-click="camerastop" onclick="noVideo.toggle();" class="yellow-button">Stop</paper-button>
      </paper-toast>
    `;
  }

  static get properties() {
    return {
      cameras: {
        type: Object,
        reflectToAttribute: true
      },
      lat: {
        type: Number,
      },
      lng: {
        observer: 'numberChanged',
        type: Number,
      },
      town: {
        type: String,
        value: 'si_piran04'
      },
      poster: {
        type: String,
        reflectToAttribute: true
      },
      fullscreenAvailable: {
        type: Boolean,
        reflectToAttribute: true
      },
      loadin: {
        type: Boolean,
        value: true
      },
      custcam: {
        type: String,
        observer: 'camera',
        reflectToAttribute: true
      },
      cams: {
        type: Object,
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get observers() {
    return [
      'fireload(cameras.loaded)'
    ];
  }

  fireload() {

    setInterval(function() {
      this.camera();
    }.bind(this), 300000);
  }

  Deg2Rad(deg) {
    return deg * Math.PI / 180;
  }

  onTabSelect(e) {
    this.loadin = true;
    var button = e.target;
    this.custcam = button.id;
    if (Hls.isSupported()) {
      var hls = new Hls({
        autoStartLoad: true
      });
      video.pause();
      hls.destroy();
      video.load()
      this.videoClass = "";
      this.active = false;
      this.$.noVideo.close();
    }
  }


  PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = this.Deg2Rad(lat1);
    lat2 = this.Deg2Rad(lat2);
    lon1 = this.Deg2Rad(lon1);
    lon2 = this.Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  NearestCity(latitude, longitude, cdn) {
    var mindif = 99999;
    var closest;
    var index;

    var cities = [
      ["si_piran04", 0, 0, "001", "sipiran04"],
      ["si_piran04", 46.0569, 14.5058, "001", "sipiran04"],
      ["si_piran04", 45.524841, 13.567059, "001", "sipiran04"],
      ["si_piran03", 45.528666, 13.568362, "001", "sipiran03"],
      ["si_piranpunta", 45.5283129, 13.5659228, "001", "sipiranpunta"],
      ["podvodna", 99, 99, "https://x.bazdara.com/mbss/mbss.stream/playlist.m3u8?DVR", "podvodna"],
      ["si_fiesa01", 45.525243, 13.582448, "003", "sifiesa01"],
      ["si_strunjan01", 45.527656, 13.603306, "003", "sistrunjan01"],
      ["si_portoroz03", 45.512827, 13.5933043, "001", "siportoroz03"],
      ["si_portoroz05", 45.512260, 13.594525, "001", "siportoroz05"],
      ["si_portoroz04", 45.511023, 13.594466, "003", "siportoroz04"],
      ["si_ljpz1", 45.473511, 13.6139783, "002", "siljpz1"],
      ["izola", 45.533596, 13.651651, "002", "izola"],
      ["si_izola3", 45.531197, 13.634514, "001", "siizola3"],
      ["si_izola1", 45.532097, 13.645430, "001", "siizola1"],
      ["siwc_KOPER_MARKOVEC_e", 45.546163, 13.709389, "002", "siwcKOPERMARKOVECe"],
      ["siwc_KOPER_MARKOVEC_n", 45.546729, 13.693094, "002", "siwcKOPERMARKOVECn"],
      ["hr_novigrad1", 45.318399, 13.562551, "002", "hrnovigrad1"],
      ["hr_umag4", 45.435882, 13.523732, "001", "hrumag4"],
      ["hr_porec03", 45.227733, 13.589623, "001", "hrporec03"],
      ["hr_porec1", 45.216387, 13.597995, "001", "hrporec1"],
      ["hr_rovinj2", 45.084720, 13.634840, "002", "hrrovinj2"],
      ["kanegra", 45.487442, 13.559213, "kanegra", "kanegra"],
      ["hr_savudrija1", 45.501171, 13.503542, "001", "hrsavudrija1"],
      ["trst", 45.692709, 13.749297, "002", "trst"],
      ["hr_golfadriatic1", 45.493339, 13.536247, "003", "hrgolfadriatic1"],
      ["si_solinesecovlje", 45.490140, 13.606183, "004", "sisolinesecovlje"],
      ["hr_rovinj3", 45.080280, 13.635722, "001", "hrrovinj3"]
    ];

    for (index = 0; index < cities.length; ++index) {
      var dif = this.PythagorasEquirectangular(latitude, longitude, cities[index][1], cities[index][2]);

      if (dif < mindif) {
        closest = index;
        mindif = dif;
      }

    }

    // echo the nearest city
    return cities[closest][cdn];
  }

  camera() {

    if (this.custcam == "sipiran04") {
      this.lat = "0";
      this.lng = "0";
      this.disa();
    } else if (this.custcam == "sipiran03") {
      this.lat = "45.528666";
      this.lng = "13.568362";
      this.disa();
    } else if (this.custcam == "sipiranpunta") {
      this.lat = "45.5283129";
      this.lng = "13.5659228";
      this.disa();
    } else if (this.custcam == "sifiesa01") {
      this.lat = "45.525243";
      this.lng = "13.582448";
      this.disa();
    } else if (this.custcam == "sistrunjan01") {
      this.lat = "45.527656";
      this.lng = "13.603306";
      this.disa();
    } else if (this.custcam == "siportoroz03") {
      this.lat = "45.512827";
      this.lng = "13.5933043";
      this.disa();
    } else if (this.custcam == "siportoroz05") {
      this.lat = "45.512260";
      this.lng = "13.594525";
      this.disa();
    } else if (this.custcam == "siportoroz04") {
      this.lat = "45.511023";
      this.lng = "13.594466";
      this.disa();
    } else if (this.custcam == "siljpz1") {
      this.lat = "45.473511";
      this.lng = "13.6139783";
      this.disa();
    } else if (this.custcam == "izola") {
      this.lat = "45.533596";
      this.lng = "13.651651";
      this.disabled = true;
    } else if (this.custcam == "siizola3") {
      this.lat = "45.531197";
      this.lng = "13.634514";
      this.disa();
    } else if (this.custcam == "siizola1") {
      this.lat = "45.532097";
      this.lng = "13.645430";
      this.disa();
    } else if (this.custcam == "siwcKOPERMARKOVECe") {
      this.lat = "45.546163";
      this.lng = "13.709389";
      this.disabled = true;
    } else if (this.custcam == "siwcKOPERMARKOVECn") {
      this.lat = "45.546729";
      this.lng = "13.693094";
      this.disabled = true;
    } else if (this.custcam == "hrnovigrad1") {
      this.lat = "45.318399";
      this.lng = "13.562551";
      this.disa();
    } else if (this.custcam == "hrumag4") {
      this.lat = "45.435882";
      this.lng = "13.523732";
      this.disa();
    } else if (this.custcam == "hrporec03") {
      this.lat = "45.227733";
      this.lng = "13.589623";
      this.disa();
    } else if (this.custcam == "hrporec1") {
      this.lat = "45.216387";
      this.lng = "13.597995";
      this.disa();
    } else if (this.custcam == "hrrovinj2") {
      this.lat = "45.084720";
      this.lng = "13.634840";
      this.disa();
    } else if (this.custcam == "trst") {
      this.lat = "45.692709";
      this.lng = "13.749297";
      this.disabled = true;
    } else if (this.custcam == "hrgolfadriatic1") {
      this.lat = "45.493339";
      this.lng = "13.536247";
      this.disa();
    } else if (this.custcam == "hrsavudrija1") {
      this.lat = "45.501171";
      this.lng = "13.503542";
      this.disa();
    } else if (this.custcam == "kanegra") {
      this.lat = "45.487442";
      this.lng = "13.559213";
      this.disabled = true;
    } else if (this.custcam == "podvodna") {
      this.lat = "99";
      this.lng = "99";
      this.disa();
    } else if (this.custcam == "sisolinesecovlje") {
      this.lat = "45.490140";
      this.lng = "13.606183";
      this.disa();
    } else if (this.custcam == "hrrovinj3") {
      this.lat = "45.080280";
      this.lng = "13.635722";
      this.disa();
    }

    this.town = this.NearestCity(this.lat, this.lng, 0)
    this.cdn = this.NearestCity(this.lat, this.lng, 3)
    this.tabselect = this.NearestCity(this.lat, this.lng, 4)

    if (this.tabselect == "kanegra" || this.tabselect == "izola" || this.tabselect == "siwcKOPERMARKOVECe" || this.tabselect == "siwcKOPERMARKOVECn" || this.tabselect == "trst") {
      this.disabled = true;
    }


    var video = this.$.video;

    video.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);

    // hide the controls if they're visible
    if (video.hasAttribute("controls")) {
      video.removeAttribute("controls")
    }

    var storageRef = firebase.storage().ref();

    storageRef.child('camera/' + this.town + '.jpg').getDownloadURL().then(function(url) {
      //var xhr = new XMLHttpRequest();
      //xhr.responseType = 'blob';
      //xhr.onload = function(event) {
      //  var blob = xhr.response;
      //};
      //xhr.open('GET', url);
      //xhr.send();
      this.loadin = false;
      video.poster = url;


      if (Hls.isSupported() || video.canPlayType('application/vnd.apple.mpegurl')) {

      } else {
        this.disabled = true;
      };



    }.bind(this)).catch(function(error) {
      setDelay(function() {
        this.camera();
      }.bind(this), 10000);
    });

  }

  camerastop() {
    if (Hls.isSupported()) {
      var hls = new Hls({
        autoStartLoad: true
      });
    };

    var video = this.$.video;
    this.loadin = true;
    video.pause();
    video.load()
    if (Hls.isSupported()) {
      hls.destroy();
    } else {
      video.src = '';
    }
    this.videoClass = "";
    this.active = false;
    this.camera();
  }

  numberChanged() {
    this.camera();
  }

  disa() {
    if (Hls.isSupported() || video.canPlayType('application/vnd.apple.mpegurl')) {
      this.disabled = false;
    } else {
      this.disabled = true;
    };
  }



  videoFull() {
    var video = this.$.video;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {

      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }

    }
  }

  videoClick() {
    this.loadin = true;

    var video = this.$.video;

    if (Hls.isSupported()) {
      var hls = new Hls({
        autoStartLoad: true
      });

      if (video.paused) {

        if (this.cdn.indexOf('http') > -1) {
          hls.loadSource(this.cdn);
        } else if (this.cdn.indexOf('kanegra') > -1) {
          hls.loadSource(this.cameras.ytkanegra);
        } else {
          hls.loadSource('https://cdn-' + this.cdn + '.whatsupcams.com/hls/' + this.town + '.m3u8');
        }

        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {

        });


        hls.on(Hls.Events.ERROR, function(event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                this.$.noVideo.show();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                this.$.noVideo.show();
                break;
              default:
                // cannot recover
                break;
            }
          }
        }.bind(this));

        video.play();
        this.videoClass = "play";
        this.active = true;
        this.loadin = false;
        ga('send', 'event', 'Kamera', 'Play');

      } else {
        this.loadin = true;
        video.pause();
        hls.destroy();
        video.load()
        this.videoClass = "";
        this.active = false;

        this.camera();

      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {

      if (video.paused) {
        if (this.cdn.indexOf('http') > -1) {
          video.src = this.cdn;
        } else if (this.cdn.indexOf('kanegra') > -1) {
          video.src = this.cameras.ytkanegra;
        } else {
          video.src = 'https://cdn-' + this.cdn + '.whatsupcams.com/hls/' + this.town + '.m3u8';
        }

        this.videoClass = "play";
        this.active = true;
        video.play();
        this.loadin = false;

        ga('send', 'event', 'Kamera', 'Play');

      } else {
        this.loadin = true;
        video.pause();
        video.src = '';
        video.load()
        if (this.cdn.indexOf('http') > -1) {
          video.src = this.cdn;
        } else if (this.cdn.indexOf('kanegra') > -1) {
          video.src = this.cameras.ytkanegra;
        } else {
          video.src = 'https://cdn-' + this.cdn + '.whatsupcams.com/hls/' + this.town + '.m3u8';
        }
        //video.load()
        this.videoClass = "";
        this.active = false;

        this.camera();

      };

    };

  }

  constructor() {
    super();
  }

  ready() {
    super.ready();

    cameraRef.on('value', function(camer) {
      this.cameras = camer.val();
    }.bind(this));

    // load external mapbox-gl.js script
    const hlsjs = document.createElement('script');
    hlsjs.setAttribute('src', '../../node_modules/hls.js/dist/hls.light.min.js');
    document.head.appendChild(hlsjs);

    hlsjs.addEventListener('load', function() {
      // mapboxgl is available here, do whatever you want
      console.log("test");
    })

  }

}

window.customElements.define('live-cam', LiveCam);
