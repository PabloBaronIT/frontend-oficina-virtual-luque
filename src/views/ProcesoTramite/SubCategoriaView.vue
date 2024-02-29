<template>
  <div class="subcategoria-container" v-if="setPermission">
    <SubCategoriaComponent />
  </div>
</template>
<script>
import SubCategoriaComponent from "@/components/MuniEnLinea/SubCategoriaComponent.vue";

export default {
  name: "SubCategoriasView",
  components: {
    SubCategoriaComponent,
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
  created() {
    if (!this.setPermission) {
      this.$router.push("/login");
    }
  },
};
</script>
<style scoped>
.subcategoria-container {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 8%;
  padding-left: 4%;
  padding-right: 4%;
}
</style>
