<template>
  <main v-if="setPermission">
    <MainContainerComponent />
  </main>
</template>

<script>
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";

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
  padding-left: 4%;
  padding-right: 4%;
}
@media (max-width: 800px) {
  main {
    height: auto;
    width: 100%;
  }
}
</style>
