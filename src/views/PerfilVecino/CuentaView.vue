<template>
  <div class="cuenta-container">
    <Datos />
  </div>
</template>

<script>
import Datos from "@/components/MiCuenta/DatosComponent.vue";

export default {
  name: "CuentaView",
  components: {
    Datos,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.cuenta-container {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 15%;
  /*  */
  padding-left: 4%;
  padding-right: 4%;
}
@media (max-width: 800px) {
  .cuenta-container {
    width: 100%;
  }
}
</style>
