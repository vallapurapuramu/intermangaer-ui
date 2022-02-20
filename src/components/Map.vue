<template>
  <div class="map-container">
    <l-map :center="[42.032974, -99.082029]" :zoom="4" style="height: 500px;" :options="mapOptions">
      <l-choropleth-layer :data="pyDepartmentsData" titleKey="department_name" idKey="department_id" :value="value" :extraValues="extraValues" geojsonIdKey="dpto" :geojson="paraguayGeojson" :colorScale="colorScale">
      </l-choropleth-layer>
    </l-map>
  </div>
</template>

<script>
//import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
import paraguayGeojson from '../data/paraguay.json'
import { pyDepartmentsData } from '../data/py-departments-data'
import {LMap} from 'vue2-leaflet';

export default {
 
  components: { 
    LMap,
       //'l-info-control': InfoControl, 
      //'l-reference-chart': ReferenceChart, 
      'l-choropleth-layer': ChoroplethLayer 
  },
  data() {
    return {
      pyDepartmentsData,
      paraguayGeojson,
      colorScale: ["e7d090", "e9ae7b", "de7062"],
      value: {
        key: "amount_w",
        metric: "% girls"
      },
      extraValues: [{
        key: "amount_m",
        metric: "% boys"
      }],
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: '3d3213',
    }
  },
}
</script>
<style>

</style>