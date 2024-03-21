<template>
  <div class="turnos-container">
    <h1 class="tituloPrincipal">Turnero</h1>
    <h4 style="color: #4b4a49; font-weight: 400; margin-top: 1rem">
      Selecciona fecha y horario disponibles.
    </h4>
    <div class="turnero">
      <div class="row">
        <div style="display: flex; flex-direction: column; width: 100%">
          <h6>Fecha del turno:</h6>
          <!-- <datepicker v-model="picked" @closed="this.SetDate" /> -->
          <input type="date" v-model="this.date" @change="SetDate" />
        </div>
      </div>
      <div class="row">
        <div style="display: flex; flex-direction: column; width: 100%">
          <h6>Hora del turno:</h6>

          <select
            name="hora"
            id=""
            :disabled="this.date ? false : true"
            v-model="this.hour"
            @change="SetHour"
          >
            <option :value="hora" v-for="hora in horas" :key="hora">
              {{ `${hora.inicio} - ${hora.final}` }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <button class="boton" @click="submitData">Confirmar Turno</button>
      </div>
    </div>
  </div>
</template>

<script>
// import Datepicker from "vue3-datepicker";
export default {
  name: "TurneroView",
  data() {
    return {
      date: "",
      hour: null,
      horas: [
        {
          inicio: "08:00",
          final: "08:30",
        },
        {
          inicio: "08:30",
          final: "09:00",
        },
        {
          inicio: "09:00",
          final: "09:30",
        },
        {
          inicio: "09:30",
          final: "10:00",
        },
        {
          inicio: "10:00",
          final: "10:30",
        },
        {
          inicio: "10:30",
          final: "11:00",
        },
      ],
    };
  },
  components: {
    // Datepicker,
  },
  methods: {
    SetDate() {
      console.log(this.date);
    },
    SetHour() {
      console.log(this.hour);
    },
    submitData() {
      console.log(this.date, this.hour, "soy la fecha y la hora");
    },
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
/* .row1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
} */
select,
input[type="date"] {
  width: 50%;
  margin: auto;
  border-radius: 10px;
  padding: 2%;
  margin-bottom: 5%;
}
.boton {
  width: 20%;
  min-height: 50px;
  margin: auto;
  background: #00c3a8;
  border-radius: 10px;
  border: none;
  color: #f5f5f5;
}
</style>
