<template>
  <div class="turnos-container">
    <h1 class="tituloPrincipal">Turnero</h1>
    <h4 style="color: #4b4a49; font-weight: 400; margin-top: 1rem">
      Selecciona el área, el trámite y la fecha para ver los horarios
      disponibles.
    </h4>
    <div class="turnero">
      <div class="row1">
        <div style="display: flex; flex-direction: column; width: 50%">
          <h3>Area</h3>
          <select name="area" id="" v-model="this.area">
            <option selected value="Area" disabled>Area</option>
            <option value="Corralon">Corralon</option>
            <option value="Renta" selected>Renta</option>
          </select>
        </div>
        <div style="display: flex; flex-direction: column; width: 50%">
          <h3>Tramite</h3>
          <select
            name="tramite"
            id=""
            v-model="this.tramite"
            :disabled="this.area != null ? false : true"
          >
            <option value="Tramite 1">Tramite 1</option>
            <option value="Tramite 2" selected>Tramite 2</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TurneroView",
  data() {
    return {
      area: null,
      tramite: null,
      fecha: null,
      hora: null,
    };
  },
};
</script>
<style scoped>
.turnos-container {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 4%;
  padding-right: 4%;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 700;
  font-size: 42px;
  margin-top: 4vh;
  font-style: normal;
  line-height: normal;
}
.turnero {
  height: 60vh;
  width: 60vw;
  margin: auto;
  margin-top: 3rem;
  background: white;
  display: flex;
  flex-direction: column;
  /* align-content: center; */
  text-align: center;
  padding-top: 5%;
}
.row1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  background: red;
}
select {
  width: 90%;
  border-radius: 10px;
  height: 3rem;
  margin: auto;
}
</style>
