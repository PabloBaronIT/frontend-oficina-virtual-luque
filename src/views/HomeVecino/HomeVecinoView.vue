<template>
  <main v-if="setPermission">
    <MainContainerComponent />
    <!-- <div v-else class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div> -->
  </main>
</template>

<script>
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";
// window.onload = function () {
//   window.location.hash = "no-back-button";
//   window.location.hash = "Again-No-back-button";
//   window.onhashchange.hash = "no-back-button";
// };
export default {
  name: "HomeVecinoView",
  components: {
    MainContainerComponent,
  },

  data() {
    return {};
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
main {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 7%;
  /*  */
  padding-left: 4%;
  padding-right: 4%;
  /* z-index: 5; */
  /* height: auto; */
  /* top: 17%; */
}
@media (max-width: 800px) {
  main {
    height: auto;
    width: 100%;
  }
}
</style>
