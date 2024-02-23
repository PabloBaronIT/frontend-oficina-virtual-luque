<template>
  <div class="mapContenedor">
    <p>Arrastre el pin sobre el mapa hacia la dirección que desea indicar:</p>

    <GMapMap
      :center="center"
      ref="myMapRef"
      :zoom="14"
      map-type-id="terrain"
      style=""
      class="mapa"
    >
      <GMapMarker
        :position="this.markerPosition"
        :clickable="false"
        :draggable="true"
        @dragend="updateMarkerPosition"
      />
    </GMapMap>
  </div>
</template>

<script>
// import { GoogleMap, Marker } from "vue3-google-map";
export default {
  name: "MapaLocation",
  props: {
    setTextInput: Function,
  },
  data() {
    return {
      lat: "",
      lng: "",
      selectedLocation: null,
      center: { lat: "", lng: "" },
      markerPosition: { lat: 0, lng: 0 },
      updateMarkerPosition: (event) => {
        // console.log(event.latLng.lat(), event.latLng.lng());
        this.markerPosition.lat = event.latLng.lat();
        this.markerPosition.lng = event.latLng.lng();

        this.asd();
        // console.log(this.markerPosition.lat?.toFixed(7));
        // console.log(this.markerPosition.lng?.toFixed(7));
      },
    };
  },
  //   components: { GoogleMap, Marker },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        console.log(coordinates, "coordiantes");
        (this.center.lat = coordinates.lat),
          (this.center.lng = coordinates.lng);
        this.markerPosition.lat = coordinates.lat;
        this.markerPosition.lng = coordinates.lng;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    asd() {
      this.setTextInput(
        this.markerPosition.lat.toFixed(7),
        this.markerPosition.lng.toFixed(7)
      );
    },
  },
};
</script>
<style scoped>
p {
  color: #4b4a49;
}
.mapContenedor {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.mapa {
  min-width: 715px;
  height: 360px;
  margin: auto;
}
@media (max-width: 800px) {
  .mapa {
    min-width: 500px;
    height: 360px;
    margin: auto;
  }
}
</style>
