<template>
  <main class="flex-container">
    <div class="top">
      <h5>Haz recibido un mensaje</h5>
      <h5>
        {{ new Date(dato.created_at).toLocaleDateString() }}
      </h5>
    </div>
    <div
      class="descripcion"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <h4>{{ dato.subject }}</h4>

      <!-- <div class="leido" v-if="dato.LeidoPortal === `S`"><p>Leido</p></div> -->
    </div>
  </main>
</template>
<script>
export default {
  name: "CardNotificacionesComponent",
  props: {
    dato: Object,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
h5 {
  color: white;
  font-weight: 900;
  font-size: 24px;
}
.flex-container {
  width: 90%;
  height: auto;
  /* border-top-left-radius: 30px; */
  /* border-top-right-radius: 30px; */
  box-shadow: 5px 5px 12px #444;
  text-align: left;
  margin: auto;
  margin-top: 1rem;
  cursor: pointer;
}
.top {
  background-image: linear-gradient(
    to right,
    #399943,
    #4ea242,
    #62aa40,
    #75b23f,
    #88ba3e
  );
  width: 100%;
  color: white;
  /* padding-left: 2rem; */
  height: 4rem;
  /* border-top-left-radius: 30px; */
  /* border-top-right-radius: 30px; */
  padding: 1rem;
  /* padding: 0 1rem; */

  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.descripcion {
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.leido {
  height: 1.5rem;
  width: 4rem;
  background: green;
  align-items: center;
  padding-left: 0.7rem;
  justify-content: center;
  border-radius: 10px;
  color: white;
}
</style>
