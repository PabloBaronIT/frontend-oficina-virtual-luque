<template>
  <div class="contenedor">
    <input
      type="text"
      name=""
      id=""
      v-model="this.gestion"
      placeholder="Nº GESTIÓN"
    />
    <input type="text" name="" id="" v-model="fecha" placeholder="FECHA" />
    <h5 style="margin-top: 5px"><i class="bi bi-calendar4-week"></i></h5>
    <input
      type="text"
      name="titulo"
      id=""
      class="inputTitulo"
      v-model="titulo"
      placeholder="TITULO"
    />
    <img src="./../../assets/images/Search.svg" alt="" @click="this.search" />
  </div>
  <div v-if="this.message">
    {{ this.message }}
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "@/env";
export default {
  data() {
    return {
      gestion: "",
      fecha: "",
      titulo: "",
      message: "",
    };
  },
  props: {
    setactivos: Function,
  },
  methods: {
    search() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(`/oficina/procedures/my-procedure/${this.gestion}`)
        .then((response) => {
          console.log(response.data.MyProcedure.procedure);
          let h = response.data.MyProcedure.procedure;
          // for (let i = 0; i < h.length; i++) {
          //Procedure
          let p = {
            id: null,
            fecha: null,
            categoria: "",
            estado: "",
            color: "",
            titulo: "",
            comunicaciones: null,
            open: false,
          };

          let iso = h.updated_at;
          let date = new Date(iso);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          //Carga del procedure
          p.id = h.id;
          p.fecha = `${day}/${month}/${year}`;
          p.categoria = h.category.title;
          p.estado = h.status.status;
          p.titulo = h.procedure.title;
          p.comunicaciones = h.communicationCount;

          switch (p.estado) {
            case "PRESENTADO":
              p.color = "var(--green)";
              break;
            case "EN PROCESO":
              p.color = "var(--yellow)";
              break;
            case "PAUSADO POR REQUERIMIENTO":
              p.color = "var(--red)";
              p.requerido = true;
              break;
            case "FINALIZADO":
              p.color = "var(--lblue)";
              break;

            default:
              break;
          }
          this.gestion = "";
          this.setactivos(p);

          //console.log(p);
          // }
        })
        .catch((error) => {
          console.log(error);
          this.message = error.response.data.message;
        });
    },
  },
};
</script>
<style scoped>
.contenedor {
  display: flex;
  flex-direction: row;
  width: 58vw;
}
input {
  border-radius: 10px;
  background: #ffff;
  padding-left: 5px;
  width: 10vw;
  height: 6vh;
  /* height: 36px; */
  margin-right: 1vw;
  border: none;
  padding-left: 1rem;
}
input[name="titulo"] {
  width: 33vw;
  margin-left: 1vw;
}
.circuloVerde {
  /* position: absolute; */
  /* z-index: 15; */
  /* right: -3rem; */
  /* top: 0.2rem; */
  font-size: 28px;
  /* margin-left: 2rem; */
  /* color: linear-gradient(to right, #399943, #4ea242, #62aa40, #75b23f, #88ba3e); */
  height: 50px;
  width: 50px;
  /* border-radius: 50%; */
  /* padding-top: 6px; */
  /* padding-left: 11px; */
  cursor: pointer;
}
@media (max-width: 800px) {
  .contenedor {
    width: 100vw;
    justify-content: left;
  }
  input {
    width: 15vw;
    font-size: 12px;
  }
}
</style>
