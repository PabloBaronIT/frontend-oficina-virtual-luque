<template>
  <div style="width: 100%">
    <div v-if="!this.loading" class="container">
      <p>Ingrese su nueva contraseña:</p>
      <div class="medio">
        <input
          type="password"
          class="inputPassword"
          v-model="this.newPassword"
          @keyup="validation"
        />
        <p v-if="this.error">{{ this.error }}</p>
        <button
          type="button"
          class="btn btn-primary boton"
          @click="this.setPassword"
        >
          Asignar
        </button>
        <p v-if="this.cambiado">{{ this.cambiado }}</p>
      </div>
    </div>
    <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setTokenMuni from "@/middlewares/setTokenMuni";
import { PASSWORD_HEADER, BASE_URL } from "@/env";

export default {
  name: "AsignarPasswordView",
  data() {
    return {
      newPassword: "",
      loading: false,
      error: "",
      cambiado: null,
      user: null,
    };
  },
  created() {
    this.loading = false;
  },
  methods: {
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    validation() {
      let asd = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

      if (!asd.test(this.newPassword)) {
        this.error = "Mínimo 8 caracteres, al menos una letra y un número:";
      } else {
        this.error = "";
      }
    },
    getMyProfile() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
          "access-user-header": PASSWORD_HEADER,
        },
      });
      apiClient
        .get("/municipales/muni-profile")
        .then((response) => {
          console.log(response.data);
          this.user = response.data.MuniProfile.muni;
          this.dispatchLogin();
          window.localStorage.setItem(
            "name",
            response.data.MuniProfile.muni.firstname,
          );
          window.localStorage.setItem(
            "lastname",
            response.data.MuniProfile.muni.lastname,
          );
          window.localStorage.setItem(
            "cuil",
            response.data.MuniProfile.muni.cuil,
          );
          window.localStorage.setItem(
            "email",
            response.data.MuniProfile.muni.email,
          );
          window.localStorage.setItem("id", response.data.MuniProfile.muni.id);
          window.localStorage.setItem(
            "fecha-creacion",
            response.data.MuniProfile.muni.created_at,
          );
          window.localStorage.setItem(
            "role",
            response.data.MuniProfile.muni.role,
          );
          this.$router.push("/muni");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.getMyProfile();
            }
          }
        });
    },
    setPassword() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put("/municipales/change-first-time-password", {
          change_password: this.newPassword,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.cambiado = response.data.message;
            this.getMyProfile();
          }
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.setPassword();
            }
          }
        });
    },
  },
};
</script>
<style scoped>
.container {
  width: 90%;
  background: white;
  padding: 2rem 0px;
  border-radius: 20px;
  margin-top: 10rem;
}
select {
  width: 50%;
  margin-top: 1.5rem;
  margin: auto;
}
.medio {
  display: flex;
  flex-direction: column;
  height: 10rem;
}
.medio input {
  width: 50%;
  margin: auto;
  border-radius: 0px 10px;
}
.boton {
  width: 30%;
  margin: auto;
}
</style>
