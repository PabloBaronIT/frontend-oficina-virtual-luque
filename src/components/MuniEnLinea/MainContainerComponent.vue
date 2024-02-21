<template>
  <!-- Componente principal del vecino usado en vista HomeVecinoView -->
  <div v-if="!loading">
    <div class="row">
      <h1>¿Qué gestión querés realizar?</h1>
    </div>
    <div class="row">
      <SearchComponent />
    </div>

    <!--VISTA  DE TRAMITES -->
    <div class="containerTabs">
      <div class="row row-cols-2">
        <div
          class="col-6 text-center"
          @mouseover="this.setClass"
          @mouseout="this.NotSetClass"
        >
          <div class="tabs">
            <h5>Trámites administrativos</h5>
            <div :class="{ activeHover: hoverCategorias }"></div>
          </div>
          <div class="gridcontainer">
            <div v-for="sector in categorias" :key="sector.Id">
              <router-link
                :to="`/sector/${sector.title}/${sector.id}`"
                class="card scale-up-center"
                style="text-decoration: none; color: #222"
              >
                <div class="card-body">
                  <div>
                    <img :src="sector.description" alt="imagen" />
                  </div>
                  <div style="margin-left: 15px">
                    <h5>
                      {{ sector.title }}
                    </h5>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="col-6 text-center"
          @mouseover="this.setServisClass"
          @mouseout="this.NotServisClass"
        >
          <div class="tabs">
            <h5>Servicios y reclamos</h5>
            <div :class="{ activeHover: hoverServicios }"></div>
          </div>

          <div class="gridcontainer">
            <div v-for="sector in servicios" :key="sector.Id">
              <router-link
                :to="`/sector/${sector.title}/${sector.id}`"
                class="card scale-up-center"
                style="text-decoration: none; color: #222"
              >
                <div class="card-body">
                  <div>
                    <img :src="sector.description" alt="imagen" />
                  </div>
                  <div style="margin-left: 15px">
                    <h5 style="text-decoration: none">
                      {{ sector.title }}
                    </h5>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- OTRAS GESTIONES -->
    <!-- <div class="otrosTramites"> -->
    <div class="gestiones">
      <h5>Si no encontrás tu gestión o tenés dudas, ingresá aquí</h5>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="19"
        viewBox="0 0 13 19"
        fill="none"
      >
        <path
          d="M3 16L9.54348 9.5L3 3"
          stroke="#00C3A8"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <button class="botonGestiones"><h5>Otras gestiones</h5></button>
    </div>
    <!-- </div> -->
    <!-- RENTAS Y AFIP, ETC -->
    <div class="accesos">
      <h5>
        Si tu gestión es para Rentas o Afip, también te facilitamos el acceso:
      </h5>
      <div class="items">
        <a
          href="https://www.rentascordoba.gob.ar/inicio/"
          style="text-decoration: none"
          target="_blank"
          ><img src="./../../assets/images/Rentas.svg" alt=""
        /></a>
        <a
          href="https://www.afip.gob.ar/landing/default.asp"
          style="text-decoration: none"
          target="_blank"
          ><img src="./../../assets/images/Afip.svg"
        /></a>
        <a
          href="https://www.anses.gob.ar/"
          style="text-decoration: none"
          target="_blank"
          ><img src="./../../assets/images/Anses.svg" alt=""
        /></a>
        <a
          href="https://www.dnrpa.gov.ar/portal_dnrpa/"
          style="text-decoration: none"
          target="_blank"
          ><img src="./../../assets/images/DNRPA.svg" alt=""
        /></a>
      </div>
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
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import axios from "axios";
import { BASE_URL } from "@/env";
import SearchComponent from "../Search/SearchComponent.vue";
import { googleLogout } from "vue3-google-login";

export default {
  name: "MainCointainerComponent",
  components: {
    SearchComponent,
  },
  data() {
    return {
      categorias: [],
      servicios: null,
      hoverCategorias: false,
      hoverServicios: false,
      browser: null,
      loading: true,
    };
  },

  created() {
    let sUsrAg = navigator.userAgent;

    console.log(sUsrAg);

    if (sUsrAg.indexOf("Chrome") > -1) {
      this.browser = "Google Chrome";
      console.log(this.browser);
    } else {
      this.browser = "desconocido";
      console.log(this.browser);
    }

    // Haciendo Get de categorias con axios desde el componente para evitar fallos de token
    // Trae imagenes, id y titulo de categoria
    // const script = document.createElement("script");
    // script.id = "amoforms_script_1183376";
    // script.async = true;
    // script.charset = "utf-8";
    // script.src =
    //   "https://forms.kommo.com/forms/assets/js/amoforms.js?1692267763";
    // document.head.appendChild(script);
    // script.onload = () => {
    //   this.initializeAmoForms();
    //   console.log;
    // };
    this.getCategories();
    window.addEventListener("popstate", this.handleBackButton);
  },
  methods: {
    setClass() {
      this.hoverCategorias = true;
    },
    NotSetClass() {
      this.hoverCategorias = false;
    },
    setServisClass() {
      this.hoverServicios = true;
    },
    NotServisClass() {
      this.hoverServicios = false;
    },
    initializeAmoForms() {
      !(function (a, m, o, c, r) {
        (a[o + c] = a[o + c] || {
          setMeta: function (p) {
            this.params = (this.params || []).concat([p]);
          },
        }),
          (a[o + r] =
            a[o + r] ||
            function (f) {
              a[o + r].f = (a[o + r].f || []).concat([f]);
            }),
          a[o + r]({
            id: "1183376",
            hash: "7eb5e7ce44edb738085bbc2bb3a57d24",
            locale: "es",
          }),
          (a[o + m] =
            a[o + m] ||
            function (f, k) {
              a[o + m].f = (a[o + m].f || []).concat([[f, k]]);
            });
      })(window, 0, "amo_forms_", "params", "load", "loaded");
    },

    getCategories() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/categories/categories")
        .then((response) => {
          console.log(response.data);
          this.categorias = response.data.Categories.Procedures;

          this.servicios = response.data.Categories.Services;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getCategories();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getCategories();
            }
          }
          if (error.response.status === 401) {
            console.log(error.response.status);
            this.$router.push("micuenta-update");
          }
        });
    },
    handleBackButton() {
      alert("usted esta por salir de nuestra pagina");
      this.logOf();
    },
    logOf() {
      localStorage.clear();
      this.dispatchOutLogin();
      location.reload();
      this.$router.push("login");
      googleLogout();
      document.cookie = "cidi=; max-age=0";
      // window.dispatchEvent(
      //   new CustomEvent("token-localstorage-changed", {
      //     detail: {
      //       storage: localStorage.getItem("token"),
      //     },
      //   })
      // );
    },
    dispatchOutLogin() {
      this.$store.dispatch("mockOutAction");
    },
  },
};
</script>

<style scoped>
/* CSS NUEVO */
.containerTabs {
  width: 100%;
  margin: auto;
}
.containerTabs h5 {
  margin-bottom: 2rem;
}
.gridcontainer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin: auto;
  grid-auto-rows: minmax(100px, auto);
}
.otrosTramites {
  margin-top: 10vh;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
}
.gestiones {
  background: white;
  height: 6vh;
  width: 70%;
  margin: auto;
  margin-top: 5%;
  border-radius: 0px 20px 0px 20px;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.gestiones svg {
  margin-top: 1.5%;
}
.gestiones h5 {
  margin-top: 0.5rem;
  font-weight: 400;
  color: #9b9a9a;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.botonGestiones {
  height: 6vh;
  width: 25%;
  border: 0.16em solid rgb(255, 255, 255);
  text-align: center;
  background-image: linear-gradient(90deg, #00c3a8 4.26%, #ffb900 126.04%);
  border-radius: 0px 20px 0px 20px;
  transition: all 0.2s;
  border-style: none;
  color: white;
  font-size: 22px;
  margin-left: 1vw;
}
.botonGestiones h5 {
  color: white;
  font-weight: 700;
  font-size: 17px;
  font-style: normal;
  line-height: normal;
}

.accesos {
  text-align: center;
  margin-top: 5vh;
  padding-bottom: 5vh;
}
.accesos h5 {
  font-weight: 400;
  color: #9b9a9a;
  font-weight: 400;
  font-size: 17px;
  font-style: normal;
  line-height: normal;
}
h1 {
  margin-top: 4vh;
  margin-bottom: 4vh;
  font-size: 43px;
  color: #00c3a8;
}
h5 {
  font-weight: 700;
  color: #00c3a8;
  font-size: 18px;
}
.card-body img {
  /* object-fit: cover; */
  width: 90%;
  max-height: 70px;
  margin-bottom: 0;
}

.card {
  background: var(--grey-bk);
  font-weight: bold;
  /* border: none; */
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  width: 95%;
  max-height: 90px;
  border-radius: 8px;
  background-color: white;
  text-align: left;
  padding: 3px;
  margin: auto;
  border: none;
}
.card h5 {
  font-size: 18px;
  color: #9b9a9a;
  font-style: normal;
  font-weight: 700;
}
.card-body {
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  max-height: 80px;

  /* width: 100%; */
}
.card:hover {
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
  /* width: 110%; */
  /* position: relative; */
}

.tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.activeHover {
  position: absolute;
  width: 4vw;
  height: 2px;
  background: linear-gradient(90deg, #ffcc03 -6.36%, #e52320 100%);
}
.items {
  width: 90%;
  /* height: 5%; */
  margin: auto;
  margin-top: 3vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 0px 20px 0px 20px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 0px 7px 0px;
}
.items a {
  margin: 0% 2%;
}
.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 84vw;
}

.l {
  flex-direction: row;
}
/*---------------------------------------------------------------- */

/*
.scale-up-center {
  -webkit-animation: scale-up-center 0.5s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-center 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
} */

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@media (max-width: 1200px) {
  .cuadradospan {
    font-weight: 400;
    font-size: 18px;
    padding-top: 1vh;
  }
  h1 {
    font-size: 40px;
    margin-top: 7%;
  }
  .botonGestiones h5 {
    font-size: 15px;
  }
}
@media (max-width: 1000px) {
  .flex-container {
    width: 100vw;
    height: auto;
  }
  .gridcontainer {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin: auto;
    margin-left: 3vw;
    grid-auto-rows: minmax(100px, auto);
  }
  .fecha {
    text-align: center;
    padding-top: 0;
  }
  .cuadradospan {
    font-weight: 400;
    font-size: 15px;
    padding-top: 1vh;
  }
  h1 {
    font-size: 35px;
    margin-top: 7%;
  }
  .items {
    width: 100%;
  }
}
@media (max-width: 800px) {
  .otrosTramites {
    width: 60vw;
    margin: auto;
  }
  .otrosTramites h5 {
    font-size: 18px;
  }
  .cuadradospan {
    width: 30vw;
    padding-top: 0.7vh;
  }
  h1 {
    text-align: left;
    margin-left: 5%;
    font-size: 30px;
    margin-top: 7%;
  }
  .botonGestiones h5 {
    font-size: 15px;
  }
  .gestiones h5 {
    font-size: 14px;
  }

  .botonGestiones {
    width: 30%;
  }
  .items {
    width: 100%;
  }
}
</style>
