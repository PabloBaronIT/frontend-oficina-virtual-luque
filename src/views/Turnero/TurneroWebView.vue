<template>
  <div class="turnos-container">
    <h1 class="tituloPrincipal">Turnero</h1>
    <div v-if="!this.ids">
      <h3>{{ this.message }}</h3>

      <div v-if="this.myAppointments" class="turnos">
        <h3>Mis turnos</h3>
        <div v-for="item in this.myAppointments" :key="item.id" class="turno">
          <h6>{{ item.procedure.title }} {{ " " }}</h6>
          <h6>
            {{
              item.procedure?.procedureOption.length
                ? item.procedure?.procedureOption[0].title
                : ""
            }}
          </h6>
          <p>Area: {{ item.area.area_name }}</p>
          <p>Día: {{ new Date(item.day).toLocaleDateString() }}</p>
          <p>Hora: {{ item.time }}</p>
          <p
            class="delete"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="setDeleteId(item.id)"
          >
            cancelar Turno
          </p>
        </div>
      </div>

      <!-- MODAL PARA ELIMINAR Y/O REPROGRAMAR -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <h5>
                Usted puede eliminar su turno y ademas reprogramar el mismo.
                <br />
                Que desea hacer?
              </h5>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="deleteTurno()"
              >
                Solo Eliminar
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="deleteTurno(this.reprogramar)"
              >
                Eliminar y reprogramar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.ids">
      <h4 style="color: #4b4a49; font-weight: 400; margin-top: 1rem">
        Seleccioná una fecha y podrás ver los horarios disponibles.
      </h4>
      <div class="turnero">
        <div class="row">
          <div style="display: flex; flex-direction: column; width: 100%">
            <h6>Fecha del turno:</h6>
            <VueDatePicker
              v-model="date"
              :min-date="new Date()"
              :disabled-week-days="[6, 0]"
              :enable-time-picker="false"
              :month-change-on-scroll="false"
              :format="format"
              @update:model-value="handleDate"
              style="width: 50%; margin: auto; margin-bottom: 5%"
            ></VueDatePicker>
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
              <option :value="time" v-for="time in timesApi" :key="time">
                <p>{{ `${time.inicio} - ${time.final}` }}</p>
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <button
            class="boton"
            @click="submitData"
            v-if="this.date && this.hour"
          >
            Confirmar Turno
          </button>
        </div>
        <div class="row">
          <div v-if="this.mensaje" class="mensaje">
            <p class="mensaje">
              {{ this.mensaje }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/env";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  name: "TurneroView",
  data() {
    return {
      date: null,
      hour: null,
      data: "",
      mensaje: null,
      timesApi: [],
      ids: parseInt(this.$route.query.tramiteId) ? true : false,
      message: null,
      myAppointments: null,
      idDelete: null,
      reprogramar: true,
    };
  },
  created() {
    this.data = {
      procedureId: parseInt(this.$route.query.tramiteId),
      optionId:
        this.$route.query.optionId === "null"
          ? null
          : parseInt(this.$route.query.optionId),
      subOptionId:
        this.$route.query.subOptionId === "null"
          ? null
          : parseInt(this.$route.query.subOptionId),
    };
    this.getTurnos();
  },
  methods: {
    format(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `Fecha seleccionada: ${day}/${month}/${year}`;
    },
    SetHour() {
      this.data.appointmentTime = this.hour?.inicio;
      this.data.appointmentDay = new Date(this.date)
        .toISOString()
        .split("T")[0];
    },
    handleDate(date) {
      this.data.appointmentDay = date.toISOString().split("T")[0];
      console.log(this.data, "soy el dia seleccionado");
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/appointments/find-times", this.data)
        .then((response) => {
          console.log(response.data, "soy los horaria del dia");
          let times = response.data.Times;
          for (let index = 0; index < times.length; index++) {
            let asd = times[index];
            let elemento = asd?.split(":");
            if (elemento[1] === "00") {
              const element = {
                inicio: times[index],
                final: `${elemento[0]}:30`,
              };
              this.timesApi.push(element);
            } else if (elemento[1] === "30") {
              let asd = parseInt(elemento[0]);

              const element = {
                inicio: times[index],
                final: `${asd + 1}:00`,
              };
              this.timesApi.push(element);
            }
          }
          console.log(this.timesApi, "soy los horarios");
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.handleDate();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.handleDate();
            }
          } else {
            this.mensaje = "Se ha producido un error, vuelva a interntarlo.";
          }
        });
    },
    submitData() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/appointments/schedule-appointment", this.data)
        .then((response) => {
          this.date = "";
          this.hour = "";
          this.timesApi = [];
          this.mensaje = response.data.message;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.submitData();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.submitData();
            }
          } else {
            this.mensaje = "Se ha producido un error, vuelva a interntarlo.";
          }
        });
      console.log(this.data, "soy toda la data");
    },
    getTurnos() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/appointments/history/my-appointments?page=1")
        .then((response) => {
          this.myAppointments = response.data.MyAppointments;
          console.log(response.data, "soy los turnos");
        })
        .catch((error) => {
          console.log(error.response.data);
          this.message = error.response.data.message;

          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getTurnos();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getTurnos();
            }
          }
        });
    },
    setDeleteId(id) {
      this.idDelete = id;
    },
    deleteTurno(reprogramar) {
      console.log(this.idDelete, "soy el id del turno");
      if (reprogramar) {
        console.log("quiero reprogramar y eliminar");
        // this.deleteT();
        // this.$router.push("/munienlinea");
      } else {
        console.log("quiero solo eliminar");
        this.deleteT();
        this.$router.push("/munienlinea");
      }
      // const apiClient = axios.create({
      //   baseURL: BASE_URL,
      //   withCredentials: false,
      //   headers: {
      //     "auth-header": localStorage.getItem("token"),
      //   },
      // });
      // apiClient
      //   .post("/appointments/cancel-appointment", {
      //     appointmentId: this.idDelete,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     this.myAppointments = null;
      //     this.getTurnos();
      //   })
      //   .catch((error) => {
      //     console.log(error.response);

      //     if (error.response.status === 500) {
      //       if (error.response.data.message === "Token de usuario expirado") {
      //         setToken();
      //         this.deleteTurno();
      //       }
      //       if (
      //         error.response.data.message === "Token de representante expirado"
      //       ) {
      //         setTokenRelations();
      //         this.deleteTurno();
      //       }
      //     } else {
      //       this.mensaje = "Se ha producido un error, vuelva a interntarlo.";
      //     }
      //   });
    },
    deleteT() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/appointments/cancel-appointment", {
          appointmentId: this.idDelete,
        })
        .then((response) => {
          console.log(response.data);
          this.myAppointments = null;
          this.getTurnos();
        })
        .catch((error) => {
          console.log(error.response);

          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.deleteTurno();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.deleteTurno();
            }
          } else {
            this.mensaje = "Se ha producido un error, vuelva a interntarlo.";
          }
        });
    },
  },
  components: { VueDatePicker },
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
  height: 100%;
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
  border-radius: 16px;
}
/* .row1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
} */
select {
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
.mensaje {
  color: #00c3a8;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

.final {
  margin-left: 10%;
}
.turnos {
  width: 80%;
  margin: auto;
  margin-top: 10%;
  height: auto;
  text-align: left;
}
.turno {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  text-align: center;
  /* padding-top: 2%; */
  padding: 2%;
  background: #4b4a491a;
  border-bottom: 1px black;
  border-bottom-style: dotted;
}
.delete {
  cursor: pointer;
  color: red;
  text-decoration: underline;
  font-size: 12px;
}
</style>
