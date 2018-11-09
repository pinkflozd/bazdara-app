import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-iconset/iron-iconset.js";

class WeatherIcons extends PolymerElement {
  static get template() {
    return html`
<iron-iconset name="clear" size="128" src="../../esm-bundled/images/vreme/clear.png" width="128" icons="clear"></iron-iconset>

<iron-iconset name="clear_n" size="128" src="../../esm-bundled/images/vreme/clear_n.png" width="128" icons="clear_n"></iron-iconset>

<iron-iconset name="FG" size="128" src="../../esm-bundled/images/vreme/FG.png" width="128" icons="FG"></iron-iconset>

<iron-iconset name="FG_n" size="128" src="../../esm-bundled/images/vreme/FG_n.png" width="128" icons="FG_n"></iron-iconset>

<iron-iconset name="modCloudy" size="128" src="../../esm-bundled/images/vreme/modCloudy.png" width="128" icons="modCloudy"></iron-iconset>

<iron-iconset name="modCloudy_n" size="128" src="../../esm-bundled/images/vreme/modCloudy_n.png" width="128" icons="modCloudy_n"></iron-iconset>

<iron-iconset name="mostClear" size="128" src="../../esm-bundled/images/vreme/mostClear.png" width="128" icons="mostClear"></iron-iconset>

<iron-iconset name="mostClear_n" size="128" src="../../esm-bundled/images/vreme/mostClear_n.png" width="128" icons="mostClear_n"></iron-iconset>

<iron-iconset name="overcast" size="128" src="../../esm-bundled/images/vreme/overcast.png" width="128" icons="overcast"></iron-iconset>
<iron-iconset name="overcast_n" size="128" src="../../esm-bundled/images/vreme/overcast.png" width="128" icons="overcast_n"></iron-iconset>
<iron-iconset name="prevCloudy" size="128" src="../../esm-bundled/images/vreme/overcast.png" width="128" icons="prevCloudy"></iron-iconset>
<iron-iconset name="prevCloudy_n" size="128" src="../../esm-bundled/images/vreme/overcast.png" width="128" icons="prevCloudy_n"></iron-iconset>

<iron-iconset name="partCloudy" size="128" src="../../esm-bundled/images/vreme/partCloudy.png" width="128" icons="partCloudy"></iron-iconset>
<iron-iconset name="partCloudy_n" size="128" src="../../esm-bundled/images/vreme/partCloudy_n.png" width="128" icons="partCloudy_n"></iron-iconset>

<iron-iconset name="slightCloudy" size="128" src="../../esm-bundled/images/vreme/slightCloudy.png" width="128" icons="slightCloudy"></iron-iconset>
<iron-iconset name="slightCloudy_n" size="128" src="../../esm-bundled/images/vreme/slightCloudy_n.png" width="128" icons="slightCloudy_n"></iron-iconset>

<iron-iconset name="prazna" size="128" src="../../esm-bundled/images/vreme/pojavi/prazna.png" width="128" icons="prazna"></iron-iconset>
<iron-iconset name="prazna_n" size="128" src="../../esm-bundled/images/vreme/pojavi/prazna.png" width="128" icons="prazna_n"></iron-iconset>

<iron-iconset name="FG" size="128" src="../../esm-bundled/images/vreme/pojavi/FG.png" width="128" icons="FG"></iron-iconset>
<iron-iconset name="FG_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FG_n.png" width="128" icons="FG_n"></iron-iconset>

<iron-iconset name="TS" size="128" src="../../esm-bundled/images/vreme/pojavi/TS.png" width="128" icons="TS"></iron-iconset>
<iron-iconset name="TS_n" size="128" src="../../esm-bundled/images/vreme/pojavi/TS.png" width="128" icons="TS_n"></iron-iconset>

<iron-iconset name="DZ" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="DZ"></iron-iconset>
<iron-iconset name="lightDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/lightDZ.png" width="128" icons="lightDZ"></iron-iconset>
<iron-iconset name="modDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/modDZ.png" width="128" icons="modDZ"></iron-iconset>
<iron-iconset name="heavyDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="heavyDZ"></iron-iconset>

<iron-iconset name="DZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="DZ_n"></iron-iconset>
<iron-iconset name="lightDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightDZ.png" width="128" icons="lightDZ_n"></iron-iconset>
<iron-iconset name="modDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modDZ.png" width="128" icons="modDZ_n"></iron-iconset>
<iron-iconset name="heavyDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="heavyDZ_n"></iron-iconset>

<iron-iconset name="RA" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="RA"></iron-iconset>
<iron-iconset name="lightRA" size="128" src="../../esm-bundled/images/vreme/pojavi/lightDZ.png" width="128" icons="lightRA"></iron-iconset>
<iron-iconset name="modRA" size="128" src="../../esm-bundled/images/vreme/pojavi/modDZ.png" width="128" icons="modRA"></iron-iconset>
<iron-iconset name="heavyRA" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="heavyRA"></iron-iconset>

<iron-iconset name="RA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="RA_n"></iron-iconset>
<iron-iconset name="lightRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightDZ.png" width="128" icons="lightRA_n"></iron-iconset>
<iron-iconset name="modRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modDZ.png" width="128" icons="modRA_n"></iron-iconset>
<iron-iconset name="heavyRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/DZ.png" width="128" icons="heavyRA_n"></iron-iconset>

<iron-iconset name="FZDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="FZDZ"></iron-iconset>
<iron-iconset name="lightFZDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/lightFZDZ.png" width="128" icons="lightFZDZ"></iron-iconset>
<iron-iconset name="modFZDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/modFZDZ.png" width="128" icons="modFZDZ"></iron-iconset>
<iron-iconset name="heavyFZDZ" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="heavyFZDZ"></iron-iconset>

<iron-iconset name="FZDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="FZDZ_n"></iron-iconset>
<iron-iconset name="lightFZDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightFZDZ.png" width="128" icons="lightFZDZ_n"></iron-iconset>
<iron-iconset name="modFZDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modFZDZ.png" width="128" icons="modFZDZ_n"></iron-iconset>
<iron-iconset name="heavyFZDZ_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="heavyFZDZ_n"></iron-iconset>

<iron-iconset name="FZRA" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="FZRA"></iron-iconset>
<iron-iconset name="lightFZRA" size="128" src="../../esm-bundled/images/vreme/pojavi/lightFZDZ.png" width="128" icons="lightFZRA"></iron-iconset>
<iron-iconset name="modFZRA" size="128" src="../../esm-bundled/images/vreme/pojavi/modFZDZ.png" width="128" icons="modFZRA"></iron-iconset>
<iron-iconset name="heavyFZRA" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="heavyFZRA"></iron-iconset>

<iron-iconset name="FZRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="FZRA_n"></iron-iconset>
<iron-iconset name="lightFZRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightFZDZ.png" width="128" icons="lightFZRA_n"></iron-iconset>
<iron-iconset name="modFZRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modFZDZ.png" width="128" icons="modFZRA_n"></iron-iconset>
<iron-iconset name="heavyFZRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="heavyFZRA_n"></iron-iconset>

<iron-iconset name="SHGR" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="SHGR"></iron-iconset>
<iron-iconset name="lightSHGR" size="128" src="../../esm-bundled/images/vreme/pojavi/lightFZDZ.png" width="128" icons="lightSHGR"></iron-iconset>
<iron-iconset name="modSHGR" size="128" src="../../esm-bundled/images/vreme/pojavi/modFZDZ.png" width="128" icons="modSHGR"></iron-iconset>
<iron-iconset name="heavySHGR" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="heavySHGR"></iron-iconset>

<iron-iconset name="SHGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="SHGR_n"></iron-iconset>
<iron-iconset name="lightSHGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightFZDZ.png" width="128" icons="lightSHGR_n"></iron-iconset>
<iron-iconset name="modSHGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modFZDZ.png" width="128" icons="modSHGR_n"></iron-iconset>
<iron-iconset name="heavySHGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/FZDZ.png" width="128" icons="heavySHGR_n"></iron-iconset>

<iron-iconset name="RASN" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="RASN"></iron-iconset>
<iron-iconset name="lightRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/lightRASN.png" width="128" icons="lightRASN"></iron-iconset>
<iron-iconset name="modRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/modRASN.png" width="128" icons="modRASN"></iron-iconset>
<iron-iconset name="heavyRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="heavyRASN"></iron-iconset>

<iron-iconset name="RASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="RASN_n"></iron-iconset>
<iron-iconset name="lightRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightRASN.png" width="128" icons="lightRASN_n"></iron-iconset>
<iron-iconset name="modRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modRASN.png" width="128" icons="modRASN_n"></iron-iconset>
<iron-iconset name="heavyRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="heavyRASN_n"></iron-iconset>

<iron-iconset name="SHRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="SHRASN"></iron-iconset>
<iron-iconset name="lightSHRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/lightRASN.png" width="128" icons="lightSHRASN"></iron-iconset>
<iron-iconset name="modSHRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/modRASN.png" width="128" icons="modSHRASN"></iron-iconset>
<iron-iconset name="heavySHRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="heavySHRASN"></iron-iconset>

<iron-iconset name="SHRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="SHRASN_n"></iron-iconset>
<iron-iconset name="lightSHRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightRASN.png" width="128" icons="lightSHRASN_n"></iron-iconset>
<iron-iconset name="modSHRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modRASN.png" width="128" icons="modSHRASN_n"></iron-iconset>
<iron-iconset name="heavySHRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="heavySHRASN_n"></iron-iconset>

<iron-iconset name="TSRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="TSRASN"></iron-iconset>
<iron-iconset name="lightTSRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/lightRASN.png" width="128" icons="lightTSRASN"></iron-iconset>
<iron-iconset name="modTSRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/modRASN.png" width="128" icons="modTSRASN"></iron-iconset>
<iron-iconset name="heavyTSRASN" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="heavyTSRASN"></iron-iconset>

<iron-iconset name="TSRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="TSRASN_n"></iron-iconset>
<iron-iconset name="lightTSRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightRASN.png" width="128" icons="lightTSRASN_n"></iron-iconset>
<iron-iconset name="modTSRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modRASN.png" width="128" icons="modTSRASN_n"></iron-iconset>
<iron-iconset name="heavyTSRASN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/RASN.png" width="128" icons="heavyTSRASN_n"></iron-iconset>

<iron-iconset name="SHRA" size="128" src="../../esm-bundled/images/vreme/pojavi/SHRA.png" width="128" icons="SHRA"></iron-iconset>
<iron-iconset name="lightSHRA" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSHRA.png" width="128" icons="lightSHRA"></iron-iconset>
<iron-iconset name="modSHRA" size="128" src="../../esm-bundled/images/vreme/pojavi/modSHRA.png" width="128" icons="modSHRA"></iron-iconset>
<iron-iconset name="heavySHRA" size="128" src="../../esm-bundled/images/vreme/pojavi/SHRA.png" width="128" icons="heavySHRA"></iron-iconset>

<iron-iconset name="SHRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SHRA.png" width="128" icons="SHRA_n"></iron-iconset>
<iron-iconset name="lightSHRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSHRA.png" width="128" icons="lightSHRA_n"></iron-iconset>
<iron-iconset name="modSHRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modSHRA.png" width="128" icons="modSHRA_n"></iron-iconset>
<iron-iconset name="heavySHRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SHRA.png" width="128" icons="heavySHRA_n"></iron-iconset>

<iron-iconset name="SHSN" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="SHSN"></iron-iconset>
<iron-iconset name="lightSHSN" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSHSN.png" width="128" icons="lightSHSN"></iron-iconset>
<iron-iconset name="modSHSN" size="128" src="../../esm-bundled/images/vreme/pojavi/modSHSN.png" width="128" icons="modSHSN"></iron-iconset>
<iron-iconset name="heavySHSN" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="heavySHSN"></iron-iconset>

<iron-iconset name="SHSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="SHSN_n"></iron-iconset>
<iron-iconset name="lightSHSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSHSN.png" width="128" icons="lightSHSN_n"></iron-iconset>
<iron-iconset name="modSHSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modSHSN.png" width="128" icons="modSHSN_n"></iron-iconset>
<iron-iconset name="heavySHSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="heavySHSN_n"></iron-iconset>

<iron-iconset name="TSSN" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="TSSN"></iron-iconset>
<iron-iconset name="lightTSSN" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSHSN.png" width="128" icons="lightTSSN"></iron-iconset>
<iron-iconset name="modTSSN" size="128" src="../../esm-bundled/images/vreme/pojavi/modSHSN.png" width="128" icons="modTSSN"></iron-iconset>
<iron-iconset name="heavyTSSN" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="heavyTSSN"></iron-iconset>

<iron-iconset name="TSSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="TSSN_n"></iron-iconset>
<iron-iconset name="lightTSSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSHSN.png" width="128" icons="lightTSSN_n"></iron-iconset>
<iron-iconset name="modTSSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modSHSN.png" width="128" icons="modTSSN_n"></iron-iconset>
<iron-iconset name="heavyTSSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SHSN.png" width="128" icons="heavyTSSN_n"></iron-iconset>

<iron-iconset name="SN" size="128" src="../../esm-bundled/images/vreme/pojavi/SN.png" width="128" icons="SN"></iron-iconset>
<iron-iconset name="lightSN" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSN.png" width="128" icons="lightSN"></iron-iconset>
<iron-iconset name="modSN" size="128" src="../../esm-bundled/images/vreme/pojavi/modSN.png" width="128" icons="modSN"></iron-iconset>
<iron-iconset name="heavySN" size="128" src="../../esm-bundled/images/vreme/pojavi/SN.png" width="128" icons="heavySN"></iron-iconset>

<iron-iconset name="SN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SN.png" width="128" icons="SN_n"></iron-iconset>
<iron-iconset name="lightSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightSN.png" width="128" icons="lightSN_n"></iron-iconset>
<iron-iconset name="modSN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modSN.png" width="128" icons="modSN_n"></iron-iconset>
<iron-iconset name="heavySN_n" size="128" src="../../esm-bundled/images/vreme/pojavi/SN.png" width="128" icons="heavySN_n"></iron-iconset>

<iron-iconset name="TSGR" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="TSGR"></iron-iconset>
<iron-iconset name="lightTSGR" size="128" src="../../esm-bundled/images/vreme/pojavi/lightTSGR.png" width="128" icons="lightTSGR"></iron-iconset>
<iron-iconset name="modTSGR" size="128" src="../../esm-bundled/images/vreme/pojavi/modTSGR.png" width="128" icons="modTSGR"></iron-iconset>
<iron-iconset name="heavyTSGR" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="heavyTSGR"></iron-iconset>

<iron-iconset name="TSGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="TSGR_n"></iron-iconset>
<iron-iconset name="lightTSGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightTSGR.png" width="128" icons="lightTSGR_n"></iron-iconset>
<iron-iconset name="modTSGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modTSGR.png" width="128" icons="modTSGR_n"></iron-iconset>
<iron-iconset name="heavyTSGR_n" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="heavyTSGR_n"></iron-iconset>

<iron-iconset name="TSRA" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="TSRA"></iron-iconset>
<iron-iconset name="lightTSRA" size="128" src="../../esm-bundled/images/vreme/pojavi/lightTSGR.png" width="128" icons="lightTSRA"></iron-iconset>
<iron-iconset name="modTSRA" size="128" src="../../esm-bundled/images/vreme/pojavi/modTSGR.png" width="128" icons="modTSRA"></iron-iconset>
<iron-iconset name="heavyTSRA" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="heavyTSRA"></iron-iconset>

<iron-iconset name="TSRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="TSRA_n"></iron-iconset>
<iron-iconset name="lightTSRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/lightTSGR.png" width="128" icons="lightTSRA_n"></iron-iconset>
<iron-iconset name="modTSRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/modTSGR.png" width="128" icons="modTSRA_n"></iron-iconset>
<iron-iconset name="heavyTSRA_n" size="128" src="../../esm-bundled/images/vreme/pojavi/TSGR.png" width="128" icons="heavyTSRA_n"></iron-iconset>

<iron-iconset name="lightSea" size="64" src="../../esm-bundled/images/vreme/lightSea.png" width="64" icons="lightSea"></iron-iconset>
<iron-iconset name="modSea" size="64" src="../../esm-bundled/images/vreme/modSea.png" width="64" icons="modSea"></iron-iconset>
<iron-iconset name="heavySea" size="64" src="../../esm-bundled/images/vreme/heavySea.png" width="64" icons="heavySea"></iron-iconset>
`;
  }
}

customElements.define("weather-icons", WeatherIcons);
