<template>
  <div class="contenedor">
    <div style="display: flex; flex-direction: row; font-size: 50px">
      <h1 class="tituloPrincipal">
        {{ this.$route.params.sectorTitle }}
        <h5>({{ this.$route.query.tramiteTitle }})</h5>
        <h4 style="color: #4b4a49; font-weight: 400; margin-top: 1rem">
          Por favor, elige aqui el tipo de solicitud que queres realizar.
        </h4>
      </h1>
    </div>
    <div class="tramites">
      <div
        v-for="tramite in tramitesApi"
        :key="tramite.id"
        class="cardTramites"
      >
        <div class="card-body" @click="setOpcionId(tramite.id)">
          <router-link
            :to="`/formulario/cuestionario/${tramite.titulo.toLowerCase()}/${
              this.$route.params.tramiteId
            }?sectorTitle=${this.$route.params.sectorTitle}&sectorId=${
              this.$route.params.sectorId
            }`"
          >
            <!-- <router-link
            :to="`/formulario/cuestionario/${this.$route.params.tramite}/${this.$route.params.tramiteId}`"
          > -->
            <h5>{{ tramite.titulo }}</h5>
          </router-link>
        </div>
      </div>
    </div>
    <p class="error" v-show="this.error === true">
      Debe seleccionar una opción para continuar.
    </p>
    <div class="volver">
      <div style="display: flex; flex-direction: row">
        <router-link :to="`/sector/${sector}/${sectorId}`">
          <img src="./../../assets/images/FlechaIzquierda.svg" alt="imagen" />
        </router-link>

        <h4>Volver atrás</h4>
      </div>

      <div style="display: flex; flex-direction: row" @click="nextTramite">
        <h4>Iniciar trámite</h4>
        <img src="./../../assets/images/FlechaDerecha.svg" alt="imagen" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/env";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
export default {
  name: "subcategoriaComponent",
  data() {
    return {
      tramitesApi: [
        { titulo: "AUTOMOTOR", id: 1 },
        { titulo: "INMUEBLE", id: 2 },
        { titulo: "COMERCIO", id: 3 },
        { titulo: "IMPUESTOS", id: 4 },
      ],
      opcionId: null,
      sector: "",
      sectorId: "",
      error: false,
    };
  },
  created() {
    this.sector = this.$route.params.sectorTitle;
    this.sectorId = this.$route.params.sectorId;
    //SE BUSCAN LAS SUBCATEGORIAS EN LA BD
    // this.getSubCategoria();
  },
  methods: {
    setOpcionId(id) {
      this.opcionId = id;
      console.log(this.opcionId, "soy el id de la opcion de tramite");
    },
    getSubCategoria() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getSubCategoria();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getSubCategoria();
            }
          } else {
            this.mensaje = "Se ha producido un error, vuelva a interntarlo.";
          }
        });
    },
    nextTramite() {
      if (!this.opcionId || this.opcionId === null || this.opcionId === "") {
        this.error = true;
      } else {
        alert("gracias por elegir munienlinea");
      }
    },
  },
};
</script>
<style scoped>
.contenedor {
  width: 100%;
  position: relative;
  margin: auto;
  padding-bottom: 15%;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 700;
  font-size: 42px;
  margin-top: 4vh;
  font-style: normal;
  line-height: normal;
}
.tramites {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin: auto;
  margin-top: 6vh;
  width: 80%;
}
.cardTramites {
  position: relative;
  background: var(--grey-bk);
  border-radius: 8px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-height: 90px;
  background: white;
  padding: 3px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  border: none;
}
.cardTramites h5 {
  font-size: 17px;
  color: #9b9a9a;
  font-weight: 700;
}
.card-body {
  background: white;
  min-height: 80px;
  min-width: 100%;
  text-align: center;
  padding-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
}
.cardTramites a {
  text-decoration: none;
  color: #9b9a9a;
}
.cardTramites:hover {
  background: linear-gradient(
    to right,
    #ff6928,
    #ff8219,
    #ff9a08,
    #ecab00,
    #d7b909,
    #c2c627,
    #96ca4b,
    #6ccb6d,
    #3fc88d,
    #00c3a8
  );
}
.volver {
  position: absolute;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.5%;
  bottom: 0%;
}

.volver h4 {
  margin-left: 14px;
  margin-right: 14px;
  color: #4b4a49;
  font-style: normal;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  margin-top: 9%;
}
.error {
  color: #00c3a8;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin-top: 2%;
}
</style>
