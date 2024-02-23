<template>
  <main class="sector-container" v-if="setPermission">
    <Sector />
  </main>
</template>

<script>
import Sector from "../../components/MuniEnLinea/SectorComponent.vue";

export default {
  name: "SectorView",
  components: {
    Sector,
  },
  computed: {
    setPermission() {
      if (this.$store.state.loggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.sector-container {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 4%;
  padding-right: 4%;
}
@media (max-width: 800px) {
  .sector-container {
    width: 100%;
    height: 100%;
    padding-top: 15%;
  }
}
</style>
