<template>
  <div class="container" v-if="this.setPermission">
    <h2>Para poder ingresar a nuestra web, debe completar sus datos:</h2>
    <FormKit
      type="form"
      id="registration-example"
      :actions="false"
      incomplete-message="Aun no has completado todos los campos."
      @keyup="this.validar"
    >
      <div class="interno">
        <div class="row">
          <div class="col">
            <FormKit
              v-model="this.firstname"
              type="text"
              name="name"
              label="Nombre"
              placeholder="Nombre"
              validation="required|length:3,30|alpha:latin"
              :validation-messages="{
                required: 'Ingresa un nombre',
                length: 'El nombre debe tener entre 3 y 30 letras',
                alpha: 'No se admiten nùmeros ni sìmbolos',
              }"
            />
          </div>
          <div class="col">
            <FormKit
              v-model="this.lastname"
              type="text"
              name="lastname"
              label="Apellido"
              placeholder="Apellido"
              validation="required|length:3,30|text|alpha:latin"
              :validation-messages="{
                required: 'Ingresa un apellido',
                length: 'El apellido debe tener entre 3 y 30 letras',
                alpha: 'No se admiten nùmeros ni sìmbolos',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <FormKit
              v-model="this.cuil"
              type="number"
              name="cuil"
              label="CUIL"
              placeholder="CUIL"
              validation="required|number|length:11,11"
              help="Ingresar solo numeros"
              :validation-messages="{
                required: 'Ingresa el CUIL sin simbolos ni espacios',
                number: 'Ingresar solo nùmeros',
                length: 'El CUIL debe tener 11 caracteres',
              }"
            />
          </div>
          <div class="col">
            <FormKit
              v-model="this.postCode"
              type="number"
              name="postCode"
              label="Codigo Postal"
              placeholder="Codigo Postal"
              validation="required|number|length:4,4"
              help="Ingresar solo numeros"
              :validation-messages="{
                required: 'Ingresa codigo postal sin simbolos ni espacios',
                number: 'Ingresar solo nùmeros',
                length: 'El Código Postal debe tener 4 caractéres',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <FormKit
              v-model="this.adress"
              type="text"
              name="adress"
              label="Direccion"
              placeholder="Direccion"
              validation="required|length:3,30"
              :validation-messages="{
                required: 'Ingresa una dirección',
                length: 'Debe tener entre 3 a 30 caractéres',
              }"
            />
          </div>
          <div class="col">
            <FormKit
              v-model="this.city"
              type="text"
              name="city"
              label="Ciudad"
              placeholder="Ciudad"
              validation="required|length:3,30"
              :validation-messages="{
                required: 'Ingresa una Ciudad',
                length: 'Debe tener entre 3 a 30 caracteres',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <FormKit
              v-model="this.email"
              type="email"
              name="email"
              label="Tu email"
              placeholder="ejemplo@ejemplo.com"
              validation="required|email"
              :validation-messages="{
                required: 'Ingresa tu email',
                email: 'Email invalido',
              }"
            />
          </div>
          <div class="col">
            <FormKit
              v-model="this.telefono"
              type="number"
              name="telefono"
              label="Telefóno"
              placeholder="Teléfono"
              validation="required|number|length:6,20"
              help="Ingresar solo numeros"
              :validation-messages="{
                required:
                  'Ingresa el codigo de area y telefono sin 0 ni 15 y sin espacios',
                number: 'Ingresar solo nùmeros',
                length:
                  'Debe ingresar al menos 6 caracteres, y hasta 30, como máximo',
              }"
            />
          </div>
        </div>
        <div class="row-center">
          <h3>Elige tu ávatar</h3>
          <div
            style="display: flex; flex-direction: row; justify-content: center"
          >
            <div
              v-for="(item, index) in this.avatar"
              :key="index"
              @click="this.selectAvatar(item.linck)"
            >
              <img :src="item.linck" alt="imagen" />
            </div>
          </div>
        </div>

        <div class="submitt">
          <div class="alert alert-success" role="alert" v-if="this.registrado">
            {{ this.message }}
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="this.message && !this.registrado"
          >
            {{ this.message }}
          </div>
          <input
            class="btn btn-primary btn-lg botonSubmit"
            type="button"
            value="Registrar"
            @click="registrar"
            :disabled="this.disabled"
          />
        </div>
      </div>
    </FormKit>
  </div>
</template>
<script>
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import axios from "axios";
import { BASE_URL } from "@/env";
export default {
  name: "UpdateDataView",
  data() {
    return {
      firstname: "",
      lastname: "",
      telefono: "",
      email: "",
      cuil: "",
      adress: "",
      city: "",
      postCode: "",
      registrado: false,
      message: "",
      avatarSelect: "",
      user: null,
      avatar: [
        {
          linck:
            "https://res.cloudinary.com/ddko88otf/image/upload/v1691603467/Recurso_10_z2cja8.png",
        },
        {
          linck:
            "https://res.cloudinary.com/ddko88otf/image/upload/v1691603467/Recurso_10_z2cja8.png",
        },
      ],
      disabled: true,
    };
  },
  created() {
    this.getMyProfile();
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
    validar() {
      let asd = /^[0-9]+$/;
      if (
        this.firstname != null &&
        this.lastname != null &&
        this.cuil != null &&
        this.cuil.length > 0 &&
        this.cuil.length === 11 &&
        this.telefono != null &&
        this.telefono.length >= 6 &&
        this.telefono.length < 20 &&
        this.postCode.length === 4 &&
        this.email != null &&
        this.avatarSelect != null &&
        asd.test(this.cuil) &&
        asd.test(this.postCode) &&
        asd.test(this.telefono)
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    selectAvatar(value) {
      this.avatarSelect = value;
    },
    registrar() {
      let registro = {
        email: this.email,
        cuil: this.cuil,
        city: this.city,
        postCode: this.postCode,
        adress: this.adress,
        firstname: this.firstname,
        lastname: this.lastname,
        avatar: this.avatarSelect,
        phoneNumber: this.telefono,
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
          this.registrado = true;
          (this.firstname = ""),
            (this.lastname = ""),
            (this.telefono = ""),
            (this.email = ""),
            (this.cuil = ""),
            (this.adress = ""),
            (this.city = ""),
            (this.postCode = ""),
            this.getMyProfileNew();
          setTimeout(() => {
            this.$router.push("munienlinea");
          }, 2000);
        })
        .catch((error) => {
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
            this.message =
              "No pudimos registrarte, ya existe una cuenta relacionada a este cuil.";
            console.log(error);
          }
        });
    },
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
          //   this.user = response.data.UserProfile.user;
          //   this.dispatchLogin();
          (this.firstname = response.data.UserProfile.user.firstname || null),
            (this.lastname = response.data.UserProfile.user.lastname || null),
            (this.telefono =
              response.data.UserProfile.user.phoneNumber || null),
            (this.email = response.data.UserProfile.user.email || null),
            (this.cuil = response.data.UserProfile.user.cuil || null),
            (this.adress = response.data.UserProfile.user.adress || null),
            (this.city = response.data.UserProfile.user.city || null),
            (this.postCode = response.data.UserProfile.user.postCode || null);
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
    getMyProfileNew() {
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
          // this.user.cidiCookie = this.cidiCookie;
          this.dispatchLogin();
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

          this.loading = false;
          // this.$router.push("munienlinea");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProfileNew();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProfileNew();
            }
          }
        });
    },
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
  },
};
</script>
<style scoped>
.container {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 15%;
  padding-bottom: 10%;
  /*  */
  padding-left: 4%;
  padding-right: 4%;
}

h2 {
  margin-bottom: 5rem;
}
img {
  width: 6rem;
  height: 6rem;
  margin-right: 2rem;
  cursor: pointer;
  border-radius: 50px;
}
img:hover {
  box-shadow: 0px 0px 10px #333;
}
.submitt {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}
</style>
