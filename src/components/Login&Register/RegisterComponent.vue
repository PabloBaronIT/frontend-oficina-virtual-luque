<template>
  <div class="container">
    <FormKit
      type="form"
      id="registration-example"
      :actions="false"
      incomplete-message="Aun no has completado todos los campos."
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
                length: 'El Código Postal debe tener 4 caracteres',
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
                length: 'Debe tener entre 3 a 30 caracteres',
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
            <select
              @change="isPerson($event)"
              name=""
              id=""
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>soy...</option>
              <option value="1">Persona Fisica</option>
              <option value="0">Persona Juridica</option>
            </select>
          </div>
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
        </div>
        <div class="row">
          <div class="col">
            <FormKit
              v-model="this.password"
              type="password"
              name="password"
              label="Contraseña"
              validation="required|length:8,30"
              :validation-messages="{
                length: 'Debe ser mayor a 8 caracteres',
                required: 'Ingresa una contraseña',
              }"
              placeholder="Your password"
            />
          </div>
          <div class="col">
            <FormKit
              v-model="this.confirmPassword"
              type="password"
              name="password_confirm"
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              validation="required|confirm"
              :validation-messages="{
                required: 'Repite la contraseña',
                confirm: 'Las contraseñas no coinciden',
              }"
            />
          </div>
        </div>
        <div>
          <input
            class="btn btn-primary btn-lg botonSubmit"
            type="button"
            value="Registrar"
            @click="registrar"
          />
          <div class="creado" v-if="this.registrado">
            {{ this.message }}
          </div>
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
  name: "RegisterComponent",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cuil: null,
      confirmPassword: "",
      adress: "",
      iSperson: null,
      city: "",
      postCode: "",
      registrado: false,
      message: "",
    };
  },
  methods: {
    isPerson($event) {
      if ($event.target.value === "0") {
        this.isPerson = false;
      } else {
        this.isPerson = true;
      }
    },
    registrar() {
      let registro = {
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        email: this.email,
        cuil: this.cuil,
        city: this.city,
        postCode: this.postCode,
        adress: this.adress,
        isPerson: this.isPerson,
      };
      //console.log(registro);
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/signUp", registro)
        .then((response) => {
          console.log(response.data);
          this.registrado = true;
          this.message = response.data.message;
          this.firstname = "";
          this.lastname = "";
          this.cuil = "";
          this.postCode = "";
          this.adress = "";
          this.city = "";
          this.iSperson = "";
          this.email = "";
          this.confirmPassword = "";
          this.password = "";
          setTimeout(() => {
            this.$router.push("/munienlinea");
          }, 2000);
        })
        .catch(function (error) {
          console.log(error.response);
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
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  background: white;
  padding: 2rem 0px;
  border-radius: 20px;
}
.interno {
  margin: auto;
  width: 80%;
  position: relative;
  padding-bottom: 5rem;
}
select {
  width: 91%;
  margin-top: 1.5rem;
}
.creado {
  margin: auto;
  font-size: 25px;
  color: var(--green);
}
.botonSubmit {
  position: relative;
}
</style>
