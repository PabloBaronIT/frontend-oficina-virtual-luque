<template>
  <div>
    <!-- Mostrar los tramites
     correspondientes al sector seleccionado -->
    <div style="display: flex; flex-direction: row; font-size: 50px">
      <img
        :src="this.tramitesApi[0]?.category?.description"
        alt="imagen"
        class="imagenSector"
      />
      <h1 class="tituloPrincipal">
        {{ this.$route.params.sectorTitle }}
        <h4 style="color: #4b4a49; font-weight: 400; margin-top: 1rem">
          Por favor, elige aqui el tipo de solicitud que queres realizar.
        </h4>
      </h1>
    </div>

    <div v-if="msj" class="sinTramites">
      <h2>No hay trámites para esta categoría por el momento</h2>
    </div>
    <!-- SE MUESTRAN LOS TRAMITES CORREPONDIENTES A CADA CATEGORIA -->
    <div class="tramites">
      <div
        v-for="tramite in tramitesApi"
        :key="tramite.id"
        class="cardTramites"
      >
        <div v-if="tramite.level.level <= this.nivel" class="card-body">
          <!-- <router-link
            :to="`/formulario/cuestionario/${tramite.title}/${tramite.id}?sectorTitle=${this.$route.params.sectorTitle}&sectorId=${this.$route.params.sectorId}`"
          >
            <h5>
              {{ tramite.title }}
            </h5>
          </router-link> -->
          <router-link
            :to="`/sector/${this.$route.params.sectorTitle}/${this.$route.params.sectorId}/${tramite.id} ?tramiteTitle=${tramite.title}&tramiteId=${tramite.id}`"
          >
            <h5>
              {{ tramite.title }}
            </h5>
          </router-link>
        </div>

        <div v-else @click="ModalNivel(tramite.id)" class="card-body">
          <h5>
            {{ tramite.title }}
          </h5>
        </div>
        <!--MODAL DE NIVEL 2 DE CIDI-->
        <div
          v-if="modalNivel === true && this.id == tramite.id"
          class="modalEstado"
        >
          <div class="modal-content">
            <div class="modalTop">
              <i class="bi bi-x-square-fill close" @click="closeModalNivel"></i>
            </div>
            <h5>Trámite no disponible.</h5>
            <p>
              para poder realizar este trámite usted debe tener
              <strong>nivel 2</strong> en Cidi.
              <br />

              <a
                href="https://cidi.cba.gov.ar/portal-publico/acceso"
                target="blak"
                class="linkCidi"
              >
                Ver más...</a
              >
            </p>
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
</template>
<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";

export default {
  data() {
    return {
      id: null,
      title: "",
      hover: false,
      tramitesApi: [],
      msj: false,
      modal: false,
      modalNivel: false,
      nivel: localStorage.getItem("nivel"),
      sectorId: "",
    };
  },
  created() {
    // get tramites para la vista sectores con el id de categoria sacado del path con vue router
    //console.log(this.$route.params);
    this.GetProcedure();
    this.sectorId = this.$route.params.sectorId;
  },

  methods: {
    GetProcedure() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(
          "/oficina/categories/category/procedure/" +
            this.$route.params.sectorId
        )

        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            for (let i = 0; i < response.data.Procedures.length; i++) {
              this.tramitesApi.push(response.data.Procedures[i]);
            }
          }
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 401) {
            this.$router.push("/micuenta-update");
          }
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.GetProcedure();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.GetProcedure();
            }
          }
        });
    },

    verRequisitos(id) {
      this.modal = true;
      this.id = id;
    },
    ModalNivel(id) {
      this.modalNivel = true;
      this.id = id;
    },
    closeModalNivel() {
      this.modalNivel = false;
    },
    close() {
      this.modal = false;
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {},
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
}
.imagenSector {
  width: 6vw;
  height: 7vh;
  margin-top: 4vh;
}
.sinTramites {
  margin-top: 4rem;
  text-align: center;
  width: 100%;
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
  text-align: left;
  cursor: pointer;
  border: none;
}
.cardTramites h5 {
  font-size: 17px;
  color: #9b9a9a;
}
.card-body {
  background: white;
  min-height: 80px;
  min-width: 100%;
  text-align: left;
  padding-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
}
.cardTramites a {
  text-decoration: none;
  color: #9b9a9a;
}
h5 {
  font-size: 24px;
  font-weight: 700;
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

.tramites {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: auto;
  margin-top: 6vh;
  margin-bottom: 10%;
  /* padding-left: 3vw; */
  width: 80%;
  /* grid-auto-rows: minmax(100%, auto); */
}
.modalEstado {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 2rem;
  right: -0.8rem;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 30vh;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.modal-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}
.modal-content a {
  text-decoration: none;
  color: #4b4a49;
}
.linkCidi {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.tramites input:hover {
  background: var(--blue);
  color: var(--red);
}
.volver {
  position: absolute;
  bottom: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 4vw;
}
.volver h4 {
  margin-left: 14px;
  color: #4b4a49;
  font-style: normal;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  margin-top: 1.5vh;
}
.modalTop {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
.close {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
}
/* ------------------------------------ */

/* img {
  max-width: 50px;
} */

@media (max-width: 1000px) {
  h1 {
    font-size: 30px;
  }
  h4 {
    font-size: 20px;
  }
}
@media (max-width: 800px) {
  .tramites {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1vw;
    margin: auto;
    margin-left: 3vw;
    /* grid-auto-rows: minmax(100px, auto); */
  }
  .cardTramites {
    width: 30vw;
  }
  svg {
    width: 40px;
    height: 40px;
  }
  .tituloPrincipal {
    font-weight: 700;
    font-size: 45px;
  }
}
@media (max-width: 600px) {
  .tramites {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1vw;
    margin: auto;
    margin-left: 3vw;
    min-height: 50vh;
    /* grid-auto-rows: minmax(100px, auto); */
  }
  .cardTramites {
    width: 30vw;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  .tituloPrincipal {
    font-weight: 700;
    font-size: 30px;
  }
}
</style>
