<template>
  <div class="sector-container" v-if="setPermission && !this.loading">
    <h1 class="tituloPrincipal">
      Notificaciones
      <h4 style="color: #4b4a49; font-weight: 400; margin-top: 1rem">
        Échale un vistazo a tus notificaciones hasta la fecha.
      </h4>
    </h1>
    <!-- BUSCADOR -->
    <div class="contenedor">
      <input
        type="text"
        name="titulo"
        id=""
        class="inputTitulo"
        v-model="this.value"
        placeholder="INGRESA UNA PALABRA RELACIONADA."
      />
      <img
        src="./../../assets/images/Search.svg"
        alt=""
        @click="this.searchValue"
      />
    </div>
    <!-- ENCABEZADO DE NOTIFICACIONES -->
    <div class="encabezado">
      <div class="iconos">
        <i class="bi bi-square"></i>
        <i class="bi bi-filter"></i>
        <i class="bi bi-envelope-open"></i>
        <i class="bi bi-share-fill"></i>
      </div>
      <div class="contador">
        <p>Elemento por pagina: 10</p>
        <div class="nav">
          <img
            class="svg"
            @click="backPagina"
            src="./../../assets/images/previous.svg"
            alt=""
            v-if="this.pagina > 1"
          />
          <!-- <div class="pagNum">
                {{ this.pagina }}
              </div> -->

          <img
            @click="nextPag"
            class="svg"
            src="./../../assets/images/next.svg"
            alt=""
            v-if="this.communications?.length === 10"
          />
        </div>
      </div>
    </div>
    <div class="linea"></div>
    <div class="subencabezado">
      <h5>
        <i class="bi bi-bell" style="margin-right: 1vw"></i>Notificaciones
      </h5>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 42%;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          style="margin-right: 1vw"
        >
          <path
            d="M6.25687 9C7.72727 9 8.91926 7.86672 8.91926 6.46875C8.91926 5.07078 7.72727 3.9375 6.25687 3.9375C4.78647 3.9375 3.59448 5.07078 3.59448 6.46875C3.59448 7.86672 4.78647 9 6.25687 9Z"
            fill="#019939"
          />
          <path
            d="M9.28891 10.4062C8.24762 9.90352 7.09835 9.70312 6.25674 9.70312C4.60828 9.70312 1.22778 10.6643 1.22778 12.5859V14.0625H6.77443V13.4975C6.77443 12.8296 7.07025 12.1598 7.58794 11.6016C8.00098 11.1558 8.57931 10.742 9.28891 10.4062Z"
            fill="#019939"
          />
          <path
            d="M13.2087 10.125C11.2833 10.125 7.44019 11.2556 7.44019 13.5V15.1875H18.9772V13.5C18.9772 11.2556 15.1341 10.125 13.2087 10.125Z"
            fill="#019939"
          />
          <path
            d="M13.2086 9C15.0058 9 16.4627 7.61488 16.4627 5.90625C16.4627 4.19762 15.0058 2.8125 13.2086 2.8125C11.4115 2.8125 9.95459 4.19762 9.95459 5.90625C9.95459 7.61488 11.4115 9 13.2086 9Z"
            fill="#019939"
          />
        </svg>
        <h5>Compartidas conmigo</h5>
      </div>
      <h5><i class="bi bi-phone" style="margin-right: 1vw"></i>SMS</h5>
    </div>
    <!-- <div> -->
    <TablaNotificacionesComponent
      :communications="this.communications"
      :getCommunication="this.getCommunication"
    />
    <!-- </div> -->
    <!-- LISTADO DE COMUNICACIONES -->

    <!-- <CardNotificacionComponentVue
      :dato="communication"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      :v-if="communications.length && this.loading === false"
      v-for="(communication, index) in communications"
      :key="index"
      @click="setComunicacion(index)"
    /> -->
    <div :v-if="this.message && this.loading === false" class="sinTramites">
      <h2>{{ this.message }}</h2>
    </div>
    <h1></h1>
    <!-- MODAL VISTA DE LA COMUNICACION-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="this.selectCommunication"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fs-5" id="exampleModalLabel">
              Comunicado: {{ this.selectCommunication.subject || "" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              {{ this.selectCommunication.message || "" }}
            </p>

            <!-- <div style="display: flex; justify-content: space-around">
              <p>
                Firmado por:
                <strong>{{ this.selectCommunication.Firma }}</strong>
              </p>
              <p>
                {{ this.selectCommunication.Fecha }}
              </p>
            </div> -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="volver">
      <router-link to="/munienlinea">
        <img src="./../../assets/images/FlechaIzquierda.svg" alt="imagen" />
      </router-link>

      <h4>Volver al Inicio</h4>
    </div>
  </div>
  <div class="prueba-container l" v-else>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
// import CardNotificacionComponentVue from "../../components/Notificaciones/CardNotificacionComponent.vue";
// import SearchNotificacionesComponent from "@/components/SearchNotificaciones/SearchNotificacionesComponent.vue";
import TablaNotificacionesComponent from "@/components/Notificaciones/TablaNotificacionesComponent.vue";
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";

import { BASE_URL } from "@/env";

export default {
  name: "NotificacionesView",
  components: {
    // CardNotificacionComponentVue,
    // SearchNotificacionesComponent,
    TablaNotificacionesComponent,
  },

  data() {
    return {
      communications: [],
      //cidiCookie: "",
      loading: true,
      selectCommunication: null,
      message: null,
      value: "",
      pagina: 1,
    };
  },
  created() {
    this.getCommunication();
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
  methods: {
    getCommunication() {
      this.loading = true;
      //console.log(this.cidiCookie);
      this.communications = [];
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(`/communications/my-communications?page=${this.pagina}`)
        .then((response) => {
          this.loading = false;
          this.message = "";
          console.log(response.data);
          let comunicaciones = response.data.Communications;

          for (let i = 0; i < comunicaciones.length; i++) {
            const element = comunicaciones[i];

            this.communications.push(element);
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status === 401) {
            console.log(error.response.status, "soy el error 401");

            this.$router.push("micuenta-update");
          }
          if (error.response.status === 404) {
            this.message = error.response.data.message;
            this.loading = false;
          }

          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getCommunication();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getCommunication();
            }
          }
        });
    },
    setComunicacion(index) {
      this.selectCommunication = this.communications[index];
      console.log(this.selectCommunication, "soy la comunicacionw");
    },
    searchValue() {
      console.log(this.value);
    },
    nextPag() {
      this.pagina++;
      this.getCommunication();
    },
    backPagina() {
      this.pagina--;
      this.getCommunication();
    },
  },
};
</script>

<style scoped>
/* CSS NUEVO */
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 700;
  font-size: 42px;
  margin-top: 4vh;
  font-style: normal;
  line-height: normal;
  /* margin-top: 7vh; */
  /* margin-left: 4vw; */
}
.divTitulos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 1vw;
  border-bottom: 1px solid #9b9a9a;
  text-align: left;
  border-radius: 0px 20px 0px 0px;
}
.divTitulos p {
  color: #4b4a49;
  font-weight: 600;
  font-size: 16px;
}
.sector-container {
  /* width: 100%; */
  width: 82%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-left: 4%;
  padding-right: 4%;
  padding-bottom: 8%;

  width: 82%;
  /* background-color: #f5f5f5; */
  position: absolute;
  right: 0;
  padding-top: 10%;
  /* padding-bottom: 10%; */

  /* background: var(--grey-bk); */
}
.encabezado {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 73vw;
  padding: 16px 8px;
  align-items: center;
}
.subencabezado {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 39vw;

  padding: 16px 8px;
}
.iconos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 10vw;
}
.nav {
  align-self: flex-start;
  margin-top: 1vh;
  /* display: flex;
  
  flex-direction: row;
  justify-content: center; */
  /* width: 8vw; */
}
.svg {
  max-width: 15px;
  margin-left: 1rem;
}
.contador {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.linea {
  width: 73vw;
  height: 1px;
  background: #4b4a49;
}
h5 {
  font-weight: 700;
  color: #019939;
}

.volver {
  position: absolute;
  bottom: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 4vw;
}
.volver h4 {
  margin-left: 14px;
  margin-right: 14px;
  color: #4b4a49;
  font-style: normal;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  margin-top: 1.5vh;
}
.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
}

.l {
  flex-direction: row;
}
.contenedor {
  display: flex;
  flex-direction: row;
  width: 58vw;
  margin-top: 3vh;
  margin-bottom: 6vh;
}
input {
  border-radius: 10px;
  background: #ffff;
  width: 10vw;
  height: 6vh;
  /* height: 36px; */
  margin-right: 1vw;
  border: none;
  padding-left: 1rem;
}
input[name="titulo"] {
  width: 33vw;
}
.sinTramites {
  position: relative;
  width: 100%;
  height: 150px;
  text-align: center;
  padding-top: 2rem;
  color: #128d44;
}
/* ------------------------------------------------ */
@media (max-width: 1200px) {
  .subencabezado {
    width: 75vw;
  }
}
@media (max-width: 800px) {
  .tituloPrincipal {
    font-weight: 700;
    font-size: 45px;
  }
  .encabezado {
    width: 95vw;
  }
  .iconos {
    width: 25vw;
  }
  .linea {
    width: 95vw;
  }
  .subencabezado {
    width: 95vw;
  }
  .sector-container {
    width: 100%;
    padding-top: 12%;
  }
}
@media (max-width: 600px) {
  .tituloPrincipal {
    font-weight: 700;
    font-size: 30px;
  }
}
.loading {
  margin: auto;
}
</style>
