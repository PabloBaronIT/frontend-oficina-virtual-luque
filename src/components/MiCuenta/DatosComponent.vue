<template>
  <div v-if="!this.loading">
    <h1 class="tituloPrincipal">Tus datos</h1>
    <div class="Box-contenedor">
      <div class="boxIzquierdo">
        <div class="cuadro"></div>
        <h5>{{ this.datosUser.fisrtname }} {{ this.datosUser.lastname }}</h5>
        <div
          style="
            height: 30%;
            display: flex;
            flex-direction: column;
            text-align: left;
          "
        >
          <span>
            <i class="bi bi-calendar4-week" style="margin-right: 8px"></i
            >{{ this.fecha }}</span
          >
          <span>
            <i class="bi bi-person-vcard-fill" style="margin-right: 8px"></i
            >{{ this.datosUser.cuil }}</span
          >
          <span>
            <i class="bi bi-phone" style="margin-right: 8px"></i
            >{{ this.datosUser.phoneNumber }}</span
          >
        </div>
      </div>
      <div class="boxDerecho">
        <h5>
          Informacion personal
          <i
            class="bi bi-pencil-fill"
            style="
              font-size: 12px;
              color: #019939;
              margin-left: 1rem;
              cursor: pointer;
            "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          ></i>
        </h5>
        <div class="datos-container">
          <div class="titulos">
            <label for="">Email</label>
            <input
              type="text"
              name=""
              id=""
              :value="this.datosUser.email"
              disabled
            />
          </div>
          <div class="titulos">
            <label for="">Calle</label>
            <input
              type="text"
              name=""
              id=""
              :value="this.datosUser.adress"
              disabled
            />
          </div>
          <div class="titulos">
            <label for="">CP</label>
            <input
              type="text"
              name=""
              id=""
              :value="this.datosUser.postCode"
              disabled
            />
          </div>
          <div class="titulos">
            <label for="">Ciudad</label>
            <input
              type="text"
              name=""
              id=""
              :value="this.datosUser.city"
              disabled
            />
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

    <!-- MODAL PARA EDITAR DATOS -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Edita tus datos:
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="this.actualizado = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="datos-container">
              <div class="titulos">
                <label for="">Nombre</label>
                <input type="text" name="" id="" v-model="this.name" />
              </div>
              <div class="titulos">
                <label for="">Apellido</label>
                <input type="text" name="" id="" v-model="this.lastname" />
              </div>
              <div class="titulos">
                <label for="">Calle</label>
                <input type="text" name="" id="" v-model="this.adress" />
              </div>

              <div class="titulos">
                <label for="">CP</label>
                <input type="text" name="" id="" v-model="this.postCode" />
              </div>
              <div class="titulos">
                <label for="">Ciudad</label>
                <input type="text" name="" id="" v-model="this.city" />
              </div>
              <div class="titulos">
                <label for="">Teléfono</label>
                <input type="text" name="" id="" v-model="this.phoneNumber" />
              </div>
            </div>
            <div
              class="alert alert-success"
              role="alert"
              v-if="this.actualizado"
            >
              {{ this.message }}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="this.actualizado = false"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="!this.actualizado"
              @click="this.registrar"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modalEditar" v-if="this.modal">
      <div>
        <i class="bi bi-x-square-fill close" @click="this.setModal"></i>
      </div>
      <h4>Edita tus datos:</h4>
      <div class="datos-container">
        <div class="titulos">
          <label for="">Nombre</label>
          <input type="text" name="" id="" v-model="this.name" />
        </div>
        <div class="titulos">
          <label for="">Apellido</label>
          <input type="text" name="" id="" v-model="this.lastname" />
        </div>
        <div class="titulos">
          <label for="">Calle</label>
          <input type="text" name="" id="" v-model="this.adress" />
        </div>

        <div class="titulos">
          <label for="">CP</label>
          <input type="text" name="" id="" v-model="this.postCode" />
        </div>
        <div class="titulos">
          <label for="">Ciudad</label>
          <input type="text" name="" id="" v-model="this.city" />
        </div>
        <div class="titulos">
          <label for="">Teléfono</label>
          <input type="text" name="" id="" v-model="this.phoneNumber" />
        </div>
      </div>
      <div class="alert alert-success" role="alert" v-if="this.actualizado">
        {{ this.message }}
      </div>
      <input
        class="botonSubmit"
        type="button"
        v-if="!this.actualizado"
        value="Guardar"
        @click="this.registrar"
      />
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
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
export default {
  name: "DatosCompnent",
  data() {
    return {
      datosUser: "",
      name: "",
      lastname: "",
      cuil: "",
      email: "",
      adress: "",
      fecha_creacion: "",
      city: "",
      phoneNumber: "",
      postCode: "",
      loading: true,
      // modal: false,
      actualizado: false,
      message: "",
    };
  },
  created() {
    // this.getMyProfile();
    setTimeout(() => {
      this.getMyProfile();
    }, 1000);
  },
  computed: {
    fecha() {
      let iso = this.datosUser.created_at;
      let date = new Date(iso);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  methods: {
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
          console.log(response.data);
          this.datosUser = response.data.UserProfile.user;
          this.dispatchLogin();
          this.name = this.datosUser.firstname;
          this.lastname = this.datosUser.lastname;
          this.cuil = this.datosUser.cuil;
          this.email = this.datosUser.email;
          this.adress = this.datosUser.adress;
          this.city = this.datosUser.city;
          this.phoneNumber = this.datosUser.phoneNumber;
          this.nivel = this.datosUser.level.level;
          this.fecha_creacion = this.datosUser.created_at;
          this.postCode = this.datosUser.postCode;
          this.loading = false;
        })
        .catch((error) => {
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
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
        });
    },
    setModal() {
      this.modal = !this.modal;
      this.actualizado = false;
    },
    registrar() {
      let registro = {
        city: this.city,
        postCode: this.postCode,
        adress: this.adress,
        firstname: this.name,
        lastname: this.lastname,
        phoneNumber: this.phoneNumber,
      };

      console.log(registro);
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put("/oficina/user", registro)
        .then((response) => {
          console.log(response.data);

          this.message = response.data.message;
          this.actualizado = true;
          (this.firstname = ""),
            (this.lastname = ""),
            (this.telefono = ""),
            (this.email = ""),
            (this.cuil = ""),
            (this.adress = ""),
            (this.city = ""),
            (this.postCode = ""),
            this.getMyProfile();
          // setTimeout(() => {
          //   this.actualizado = false;
          // }, 2000);
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.registrar();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.registrar();
            }
          }
        });
    },
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.datosUser);
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
}
.boxIzquierdo {
  height: 47vh;
  width: 17vw;
  padding: 16px 20px 18px 18px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
  border-radius: 0px 20px 0px 0px;
  text-align: center;
}
.boxDerecho {
  width: 54vw;
  height: 30vh;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
  padding: 16px 20px 18px 18px;
  border-radius: 0px 20px 0px 0px;
  position: relative;
}
.Box-contenedor {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5vw;
  margin-top: 5%;
  margin-bottom: 10%;
}
h5 {
  font-weight: 900;
  color: #4b4a49;
}
.cuadro {
  height: 19vh;
  background: #d9d9d9;
  margin-bottom: 2vh;
}
.volver {
  position: absolute;
  bottom: 20vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* left: 4vw; */
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
.datos-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 90%;
  position: relative;
  margin: auto;
  margin-top: 2vh;
  align-items: center;
}
input {
  border: none;
  border-bottom: 1px solid black;
  width: 90%;
  font-size: 16px;
}
label {
  font-size: 13px;
}
.titulos {
  display: flex;
  flex-direction: column;
  justify-content: left;
}
/*  */
/* .container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  justify-content: center;
} */

p {
  margin: 20px;
  padding: 10px;

  height: auto;
}

.datos-container img {
  max-width: 20px;
  margin: 0 10px;
  cursor: pointer;
}
.datos-container img:hover {
  max-width: 22px;
  fill: var(--red);
}
.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 84%;
  margin: auto;
}

.l {
  flex-direction: row;
}
.modalEditar {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  width: 60vw; /* Need a specific value to work */
  height: auto;
  padding: 3rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
}

.close {
  position: absolute;
  right: 2rem;
  top: 0.5rem;
}
.botonSubmit {
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
  margin-top: 5vh;
}
@media (max-width: 800px) {
  .Box-contenedor {
    justify-content: space-around;
    width: 100%;
  }
  .boxIzquierdo {
    width: 25%;
    height: 35%;
  }
  .boxDerecho {
    width: 60%;
  }
  .volver {
    bottom: 14%;
  }
}
@media (max-width: 1000px) {
  .volver {
    bottom: 14%;
  }
}
</style>
