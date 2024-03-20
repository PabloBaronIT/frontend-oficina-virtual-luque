<template>
  <div class="contenedor">
    <div class="boxIzquierdoHombre">
      <div class="logos">
        <img
          src="./../../assets/images/LogoBlancoLuque.svg"
          alt="logoMuni"
          class="width: 100%;"
        />
        <img
          src="./../../assets/images/LogoEnLineaBlanco.svg"
          alt="logoMuni"
          class="logo"
        />
      </div>
    </div>
    <div class="capa"></div>

    <div class="boxDerecho">
      <div class="bienvenida">
        <h1>¡BIENVENIDO!</h1>
        <p>
          Presentá aquí todos tus trámites y gestiones de manera rápida y
          simple, sin horarios y desde el lugar que vos elijas.
        </p>
      </div>
      <div class="internoBox">
        <h1>INGRESÁ CON</h1>
        <button class="btn btn-outline-secondary botonCidi">
          <a href="https://cidi.test.cba.gov.ar/Cuenta/Login?app=551"
            ><img src="./../../../public/img/LogoCidi.png" alt="imagen cidi"
          /></a>
        </button>
        <p>Accedé a todos los trámites y servicios</p>
        <div class="linea"></div>
        <p>También podés acceder sin usuario de CIDI</p>
        <div
          class="botonServicios"
          @click="() => (this.modalFormulario = true)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            class="svgCirculo"
          >
            <path
              d="M27.7567 5.32361C15.3213 5.32361 5.2041 15.4408 5.2041 27.8762C5.2041 40.3116 15.3213 50.4288 27.7567 50.4288C40.1921 50.4288 50.3093 40.3116 50.3093 27.8762C50.3093 15.4408 40.1921 5.32361 27.7567 5.32361ZM22.3116 17.9899C23.6853 16.5338 25.6185 15.7325 27.7567 15.7325C29.8949 15.7325 31.8107 16.5392 33.1899 18.0029C34.5875 19.4862 35.2674 21.4791 35.1069 23.6216C34.786 27.8762 31.4898 31.3458 27.7567 31.3458C24.0236 31.3458 20.7209 27.8762 20.4065 23.6205C20.2471 21.4606 20.9259 19.4613 22.3116 17.9899ZM27.7567 46.9592C25.2092 46.9609 22.6873 46.451 20.3405 45.4598C17.9938 44.4685 15.87 43.0162 14.095 41.1888C15.1116 39.7391 16.4068 38.5065 17.9051 37.563C20.6689 35.7913 24.1667 34.8155 27.7567 34.8155C31.3467 34.8155 34.8445 35.7913 37.605 37.563C39.1046 38.506 40.401 39.7387 41.4184 41.1888C39.6436 43.0163 37.5198 44.4689 35.173 45.4601C32.8262 46.4513 30.3042 46.9611 27.7567 46.9592Z"
              fill="#019939"
            />
          </svg>
          <p>Accedé con servicios limitados</p>
        </div>
      </div>
    </div>

    <!-- MODAL DE FACE-GOOGLE-USUARIO Y CONTRASEÑA -->
    <div class="modalFormulario" v-if="this.modalFormulario">
      <div style="position: absolute; right: 2rem">
        <i
          class="bi bi-x-square-fill close"
          @click="() => (this.modalFormulario = false)"
        ></i>
      </div>
      <form style="width: 50%; margin: auto">
        <FormKit
          type="form"
          id="registration-example"
          :actions="false"
          incomplete-message="Aun no has completado todos los campos."
        >
          <FormKit
            v-model="cuil"
            type="number"
            name="cuil"
            label="CUIL"
            placeholder="cuil"
            validation="required|length:11,11|number"
            :validation-messages="{
              required: 'Ingresa el CUIL sin simbolos ni espacios',
              number: 'Ingresar solo nùmeros',
              length: 'El CUIL debe tener 11 caracteres',
            }"
          />
          <FormKit
            v-model="password"
            type="password"
            name="password"
            label="Contraseña"
            placeholder="clave"
          />
          <p class="error">{{ this.msj }}</p>
        </FormKit>
      </form>

      <div class="botones">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="log"
          style="color: #000"
        >
          Ingresar
        </button>
        <button type="button" class="btn btn-outline-secondary">
          <router-link to="/crear-cuenta"> Crear cuenta </router-link>
        </button>
        <GoogleLogin
          :callback="callback"
          style="margin: auto; margin-top: 5%"
        />
        <button class="button face" @click="logInWithFacebook">
          <i class="bi bi-facebook" style="font-size: 25px"></i>
          ingresar con facebook
        </button>
      </div>
    </div>
    <div class="prueba-container l" v-if="loading">
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
  </div>
</template>

<script>
import axios from "axios";
import dbService from "@/services/dbService";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL, FACE_ID } from "@/env";
import { decodeCredential } from "vue3-google-login";

export default {
  name: "LoginComponent",

  data() {
    return {
      face: null,
      cuil: null,
      password: "",
      validacion: false,
      msj: "",
      loading: false,
      user: null,
      representante: null,
      cidiCookie: null,
      datos: null,
      habilitado: null,
      callback: async (response) => {
        // This callback will be triggered when the user selects or login to
        // his Google account from the popup
        event.preventDefault();
        this.loading = true;
        let userData = decodeCredential(response.credential);
        console.log("respuesta de google", userData);
        const apiClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/auth/signIn-providers", {
            firstname: userData.given_name,
            lastname: userData.family_name,
            email: userData.email,
          })
          .then((response) => {
            console.log(response.data);

            let tokenApi = response.data.accessToken;
            let refreshToken = response.data.refreshToken; //REFRESH TOKEN
            let redirect = response.data["redirectURL"];
            localStorage.setItem("token", tokenApi);
            localStorage.setItem("refreshToken", refreshToken);
            this.getMyProfile();
            if (redirect) {
              this.loading = false;

              this.$router.push("micuenta-update");
            } else {
              this.loading = false;

              this.$router.push("munienlinea");
            }
          })
          .catch((error) => {
            this.loading = false;
            this.msj = error.response.data.message;

            console.log(error.data);
          });
      },

      datafacebook: "",
      modalFormulario: false,
    };
  },

  beforeRouteLeave(to, from, next) {
    localStorage.clear();
    next();
  },
  beforeRouteEnter(to, from, next) {
    localStorage.clear();
    next();
  },
  created() {
    //tomo del la ruta la query string para tomar datos del usuario
    localStorage.clear();

    let cidi = this.$route.query.cidi || null;
    console.log(cidi, "soy query de cidi");

    let Cookiess = document.cookie.split(";"); //tomo todas la cookkies
    console.log(Cookiess, "soy las cookies");
    let asd = Cookiess?.filter((element) => {
      //las recorro para buscar la de cidi
      // if (element.includes("cidi")) {
      return element.includes("cidi");
      // }
    });
    console.log(asd);

    let cidiCook = asd[0]?.split("=") || null; //separo la que es de cidi para obtener el valor

    if (cidi) {
      this.loading = true;
      this.cidiCookie = cidi;

      document.cookie = `cidi=${cidi};max-age=120`; //se guarda la clave cidi en las cookies
      //se llama la api de cidi para saber si tienen representados o no
      this.logCidi(cidi);
    }
    if (cidiCook) {
      this.cidiCookie = cidiCook[1];
      console.log(this.cidiCookie, "soy la cookie del cidi");
      this.loading = true;
      this.logCidi(cidiCook[1]);
    }
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
  watch: {
    datafacebook(newValue) {
      if (newValue) {
        this.getLogFace(newValue);
      }
    },
  },
  methods: {
    //LOGIN CON  GOOGLE O FACEBOOCK
    async logInWithFacebook() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();

      window.FB.login(
        (response) => {
          if (response.status == "connected") {
            window.FB.api(
              "/me",
              "GET",
              { fields: "id,name, email" },
              (response) => {
                console.log(response);
                this.datafacebook = {
                  name: response.name.split(" "),
                  email: response.email,
                };
                console.log(
                  this.datafacebook,
                  "soy los datos de face en un estado"
                );
              }
            );
          }
        },
        { scope: "public_profile,email" }
      );
    },
    getLogFace(userData) {
      console.log("estoy en getlogface");
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
      });
      apiClient
        .post("/auth/signIn-providers", {
          firstname: userData.name[0],
          lastname: userData.name[1],
          email: userData.email,
        })
        .then((response) => {
          console.log(response.data);

          let tokenApi = response.data.accessToken;
          let refreshToken = response.data.refreshToken; //REFRESH TOKEN
          let redirect = response.data["redirectURL"];
          localStorage.setItem("token", tokenApi);
          localStorage.setItem("refreshToken", refreshToken);
          this.getMyProfile();
          if (redirect) {
            this.loading = false;

            this.$router.push("micuenta-update");
          } else {
            this.loading = false;

            this.$router.push("munienlinea");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.msj = error.response.data.message;

          console.log(error.data);
        });
    },
    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: FACE_ID, //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v17.0",
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },

    //SE GUARDA EN EL STORE EL USUARIO
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    dispatchCidi() {
      this.$store.dispatch("mockCidiAction", this.cidiCookie);
    },
    dispatchLoginPermission() {
      this.$store.dispatch("mockPaseAction");
    },

    //se guarda los datos del representante
    dispatchRepresentante() {
      this.$store.dispatch("mockRepresentanteAction", this.representante);
    },
    //LOGIN COMUN
    log() {
      this.loading = true;
      let asd = { cuil: this.cuil, password: this.password };
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/signin", asd)

        .then((response) => {
          console.log(response.data);
          let tokenApi = response.data.Tokens.authToken;
          let refreshToken = response.data.Tokens.refreshToken; //REFRESH TOKEN
          localStorage.setItem("token", tokenApi);
          localStorage.setItem("refreshToken", refreshToken);
          this.getMyProfile();
          this.$router.push("munienlinea");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.validacion = false;
          this.msj = error.response.data.message;
        });
    },
    /* ESTE METODO LE ENVIA A LA API DE CIDI LAS HASCOOKIE PARA OBTENER TODOS LOS DATOS Y REPSRESENTADO*/
    logCidi(cidi) {
      this.loading = true;
      this.dispatchCidi();
      //console.log(this.cidiCookie, "cidicookie");
      console.log("entre en el logcidi");
      //SE ENVIA LA QUERY PARA OBTENER TODA LA INFO DEL USUARIO
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
      });
      apiClient
        .post("/auth/cidi/login/" + cidi)

        .then((response) => {
          console.log(response.data, "respuesta api cidi");
          console.log("no hay respuesta de cidi");
          let token = response.data["Tokens"] || null; //token por calve fizcal o sin representados
          let redireccionamiento = response.data["redirectURL"] || null; //redireccionamiento con representados
          let tokenRepresetations =
            response.data["TokenRepresentations"] || null; //token con representados

          if (token) {
            localStorage.setItem("token", token.authToken);
            localStorage.setItem("refreshToken", token.refreshToken);

            this.getMyProfile();
            this.$router.push("munienlinea");
          }

          //si tiene representados
          if (redireccionamiento) {
            window.location.href = response.data.redirectURL;
          }
          if (tokenRepresetations) {
            localStorage.setItem("token", tokenRepresetations.authToken);
            localStorage.setItem(
              "refreshToken",
              tokenRepresetations.refreshToken
            );

            //se buscan los datos del usuario al que representa
            let payload = dbService.getToken(tokenRepresetations.authToken);
            let idRepresentante = payload.representative;
            localStorage.setItem("idRepresentante", idRepresentante);
            this.getMyProfile();
            //se busca los datos del representante
            this.getRepresentante(idRepresentante);
            this.$router.push("munienlinea");
          }
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //FUNCION PARA OBTENER EL PERFIL DEL USUARIO
    getMyProfile() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/user/profile")
        .then((response) => {
          console.log(response.data, "datos de usuariodb");
          this.user = response.data.UserProfile.user;
          this.user.cidiCookie = this.cidiCookie;
          this.dispatchLogin();
          this.dispatchLoginPermission();
          window.localStorage.setItem(
            "role",
            response.data.UserProfile.user.role || null
          );
          window.localStorage.setItem(
            "name",
            response.data.UserProfile.user.firstname || null
          );
          window.localStorage.setItem(
            "lastname",
            response.data.UserProfile.user.lastname || null
          );
          window.localStorage.setItem(
            "cuil",
            response.data.UserProfile.user.cuil || null
          );
          window.localStorage.setItem(
            "adress",
            response.data.UserProfile.user.adress || null
          );
          window.localStorage.setItem(
            "email",
            response.data.UserProfile.user.email || null
          );
          window.localStorage.setItem(
            "id",
            response.data.UserProfile.user.id || null
          );
          window.localStorage.setItem(
            "fecha-creacion",
            response.data.UserProfile.user.created_at || null
          );
          window.localStorage.setItem(
            "nivel",
            response.data.UserProfile.user.level.level || null
          );
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProfile();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProfile();
            }
          }
        });
    },
    getRepresentante(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
          "access-user-header":
            "^Yh19S&^8$yl01&Fagyg8eLxrI8uxypiCpdUdRscjF!xKSSqq",
        },
      });
      apiClient
        .get("/oficina/users/" + id)
        .then((response) => {
          console.log(response.data, "datos representante");

          this.representante = response.data.User;
          localStorage.setItem(
            "representanteFirstname",
            response.data.User.firstname
          );
          localStorage.setItem(
            "representanteLastname",
            response.data.User.lastname
          );

          this.dispatchRepresentante();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getRepresentante(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getRepresentante(id);
            }
          }
        });
    },
  },
};
</script>

<style scoped>
/* CSS NUEVO*/
.contenedor {
  width: 100%;
  height: 120vh;
  align-items: center;
}
.boxIzquierdoHombre {
  height: 100%;
  background-image: url("../../../public/img/HombreB.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 100%;
  /* position: absolute; */
  /* left: -20%; */
  /* right: 0; */
  /* margin-top: -14vh; */
}

.boxDerecho {
  width: 45%;
  height: 120%;
  background: rgba(83, 83, 83, 0.2);
  position: absolute;
  right: 0;
  top: 0;
  padding: 4% 0%;
  /* top: -17vh;
  left: -18vw; */
  /* background: linear-gradient(
    158deg,
    #019939 0%,
    #ffcc03 58.89%,
    #e52320 103.81%
  ); */
  z-index: 20;
  backdrop-filter: blur(22.5px);
}

.logo {
  /* max-width: 190px; */
  /* min-height: 98px; */
  width: 25%;
}
/*  */
.bienvenida {
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 8%;
}
h1 {
  color: white;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
p {
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: white;
}
.internoBox {
  height: auto;
  width: 100%;
  margin: auto;
  /* padding-top: 7%; */
  margin-top: 10%;
  text-align: center;
}
.internoBox h1 {
  font-size: 27.34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.botonServicios {
  position: relative;
  /* height: 7.5vh; */
  /* width: 40%; */
  max-width: 348px;
  height: 82px;
  background: white;
  border-radius: 20px;
  margin: auto;
  margin-top: 5%;
  /* padding-top: 1vh; */
  /* padding-right: 1.2vw; */
  padding: 5% 2%;
  text-align: right;
  cursor: pointer;
}
.botonServicios p {
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.svgCirculo {
  position: absolute;
  margin-top: -5%;
  left: 1%;
}
.modalFormulario {
  position: absolute;
  width: 50%;
  height: 75%;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5);
  top: 15%;
  right: 30vw;
  z-index: 21;
  font-size: 15px;
  padding: 2rem;
}
.botones {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 12rem;
  width: 50%;
  margin: auto;
  margin-top: 1rem;
  color: #000;
}
.botones a {
  text-decoration: none;
  color: #000;
}
.face {
  background: #5890ff;
  color: white;
  border-radius: 5px;
  border-color: transparent;
  height: 45px;
  text-align: center;
  width: 75%;
  margin: auto;
}

.linea {
  background: white;
  height: 1px;
  width: 85%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.error {
  color: red;
  font-size: 13px;
  width: 200px;
}
.botonCidi {
  /* width: 30%;
  height: 10vh; */
  margin-top: 2%;
  min-width: 363px;
  min-height: 111px;
  background: white;
  border-radius: 20px;
  margin-bottom: 3%;
}

.botonCidi img {
  /* padding: 0 0 0 0; */
  /* margin: 0 6px 0 0; */
  /* float: left; */
  height: 90%;
  width: 90%;
}
/* h5 {
  color: white;
  font-size: 20px;
} */
.close {
  position: absolute;
  right: 2rem;
  top: 0.5rem;
}
.prueba-container {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 20%;
  /* background: white; */
  z-index: 15;
  position: absolute;
  top: 30%;
  left: 40%;
}
.logos {
  position: absolute;
  /* min-width: 1000px; */
  width: 55%;
  z-index: 10;
  bottom: -15%;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.capa {
  position: absolute;
  /* border-radius: 60px 0px 60px 0px; */
  top: 0;
  background-size: contain;
  z-index: 20;
  width: 100%;

  height: 120%;
  background: linear-gradient(
    226deg,
    rgba(0, 0, 0, 0) 64.05%,
    rgba(0, 0, 0, 0.8) 113.93%
  );
}
/*--------------------------------------------------------------------------  */
@media (max-width: 800px) {
  .deco {
    display: none;
  }

  form {
    width: 70%;
  }
  .boxIzquierdo {
    width: 55%;
  }
  .botonCidi {
    width: 50%;
  }
  .logosMuni {
    justify-content: space-around;
  }
  .botonServicios {
    width: 60%;
  }
  .svgCirculo {
    left: 5%;
  }
  .face {
    font-size: 10px;
    text-align: left;
  }
}
</style>
