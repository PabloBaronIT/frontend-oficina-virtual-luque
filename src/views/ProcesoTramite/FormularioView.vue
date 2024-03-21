<template>
  <div v-if="setPermission" class="sector-container">
    <div class="row">
      <h5 style="margin-top: 4vh">
        <img
          :src="this.image"
          alt="Descripción de la imagen"
          style="max-width: 32px; max-height: 32px"
        />
        {{ this.sectorTitle }}
      </h5>
      <h1 class="tituloPrincipal">
        {{ this.titulo }}
        <h4 style="color: #4b4a49; font-weight: 400">
          Ingrese aquí su solicitud en caso de requerir del servicio de <br />
          limpieza en algún lugar en particular <br />
          <!-- //{{ this.descripcion }}// -->
        </h4>
      </h1>
    </div>
    <!-- RECUADRO DE INICIO MUESTRA CADA REQUISITO EN ESPECIFICO PARA CADA TRAMITE-->

    <div class="row" v-if="this.inicio == true">
      <RequisitosComponent />
    </div>
    <!-- ------- -->

    <div class="row" v-else style="margin-top: 5vh">
      <div class="progress-container">
        <div class="progress" id="progress"></div>
        <div class="circle active">1</div>
        <div
          v-for="(item, index) in this.preguntas.length - 1"
          :key="index"
          class="circle"
        >
          {{ index + 2 }}
        </div>
      </div>
      <FormularioComponent
        :questionProp="this.preguntas"
        :precio="this.precio"
        :dispatchProcedure="this.dispatchProcedure"
        :setProcedure="this.setProcedure"
        :outProcedure="this.outProcedure"
        :progreso="this.progreso"
        :retroPogreso="this.retroPogreso"
      />
    </div>

    <!-- BOTONESSSSSSS -->
    <div class="volver" v-if="this.inicio">
      <div style="display: flex; flex-direction: row">
        <router-link
          :to="`/sector/${this.sectorTitle}/${this.$route.query.sectorId}`"
        >
          <img src="./../../assets/images/FlechaIzquierda.svg" alt="imagen" />
        </router-link>

        <h4>Volver atrás</h4>
      </div>
      <div v-if="this.presencial" style="display: flex; flex-direction: row">
        <router-link
          :to="`/turneroweb?tramiteId=${this.procedureId}&optionId=${this.optionId}&subOptionId=${this.subOptionId}`"
        >
          <h4>Reservar Turno</h4>
        </router-link>
        <img src="./../../assets/images/FlechaDerecha.svg" alt="imagen" />
      </div>
      <div
        v-else
        style="display: flex; flex-direction: row"
        @click="
          () => {
            this.inicio = false;
          }
        "
      >
        <h4>Iniciar trámite</h4>
        <img src="./../../assets/images/FlechaDerecha.svg" alt="imagen" />
      </div>
    </div>
  </div>
</template>

<script>
import FormularioComponent from "@/components/Tramites/Proceso/FormularioComponent.vue";
import RequisitosComponent from "@/components/MuniEnLinea/RequisitosComponent.vue";
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";

var procedure = {
  title: "",
  // userId: "",
  // categoryId: null,
  // statusId: 1,
  procedureId: null,
  // selected: null,
  // questions: [],
  // date: new Date(),
  questions: [],
  fecha: new Date().toLocaleDateString(),
  precio: "",
  sectorTitle: "",
  // formularioTitle: "",
};
export default {
  name: "FormularioView",
  data() {
    return {
      // Extrayendo  datos de categoria y tramite desde el path con VUE ROUTER
      procedureId: "",
      optionId: "",
      subOpcionId: "",
      category: this.$route.params,
      // length: null,
      preguntas: "",
      precio: "",
      inicio: true,
      descripcion: "",
      titulo: "",
      currentActive: 0,
      sector: "",
      image: "",
      presencial: false,
    };
  },
  components: {
    FormularioComponent,
    RequisitosComponent,
  },
  created() {
    // Get a los templates de procedures para enviarlos por pro a formulario componente
    this.sectorTitle = this.$route.query.sectorTitle;
    // this.formularioTitle = this.$route.params.formularioTitle;
    this.getTemplate();
    procedure.questions = [];
    (this.procedureId = parseInt(this.$route.params.tramiteId)),
      (this.optionId =
        this.$route.query.opcionTramite === "null"
          ? null
          : parseInt(this.$route.query.opcionTramite)),
      (this.subOptionId =
        this.$route.query.subOpcionTramite === "null"
          ? null
          : parseInt(this.$route.query.subOpcionTramite));
  },
  methods: {
    setProcedure(asd) {
      procedure.questions.push(asd);
    },
    outProcedure() {
      procedure.questions.pop();
    },
    back() {
      this.$router.go(-1);
    },
    dispatchProcedure() {
      this.$store.dispatch("saveP", procedure);
    },
    getTemplate() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .post("/oficina/procedures/template", {
          procedureId: parseInt(this.$route.params.tramiteId),
          optionId:
            this.$route.query.opcionTramite === "null"
              ? null
              : parseInt(this.$route.query.opcionTramite),
          subOptionId:
            this.$route.query.subOpcionTramite === "null"
              ? null
              : parseInt(this.$route.query.subOpcionTramite),
        })
        .then((response) => {
          console.log(response.data);
          this.preguntas =
            response.data.Template["questionProcedure"] ||
            response.data.Template["questionProcedureOption"] ||
            response.data.Template["questionProcedureSubOption"];
          this.precio = parseInt(response.data.Template.price);
          // this.descripcion = response.data.Template.description;
          // procedure.procedureId = response.data.Template.id;
          this.image = response.data.Template.category?.description || "";
          // console.log("este es el descripcion:", this.descripcion);
          // parseInt(r.id);
          // console.log(this.procedureId, "soy el procedureId");
          procedure.title = response.data.Template.title;
          procedure.precio = response.data.Template.price;
          this.titulo = response.data.Template.title;
          this.presencial = false;
          // this.sector = response.data.Template.category.title;

          // this.length = r.question.length;
          // console.log(this.preguntas, "soy las preguntasssssss");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getTemplate();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getTemplate();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
        });
    },
    progreso() {
      this.currentActive++;
      if (this.currentActive >= this.preguntas.length) {
        this.currentActive = this.preguntas.length - 1;
      }

      this.update();
    },
    retroPogreso() {
      this.currentActive--;
      this.removeClass();
    },
    removeClass() {
      const circles = document.querySelectorAll(".circle");
      const progress = document.getElementById("progress");
      circles[this.currentActive + 1].classList.remove("active");
      const actives = document.querySelectorAll(".active");

      progress.style.width =
        ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
    },
    update() {
      const circles = document.querySelectorAll(".circle");
      const progress = document.getElementById("progress");

      circles[this.currentActive].classList.add("active");
      // circles.forEach((circle, idx) => {
      //   console.log(idx, "soy el index");
      //   if (idx < this.currentActive) {
      //     circle.classList.add("active");
      //   }
      // });
      const actives = document.querySelectorAll(".active");

      progress.style.width =
        (actives.length / (circles.length + 1)) * 100 + "%";
    },
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
};
</script>

<style scoped>
/*  */

.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  min-width: 10vw;
  width: 10vw;
  margin: auto;
  margin-top: 2rem;
  z-index: 2;
}

.progress {
  background: linear-gradient(90deg, #00c3a8 4.26%, #ffb900 126.04%);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  width: 0%;
  z-index: -1;
  transition: 0.4s ease;
}

.circle {
  background-color: #d9d9d9;
  color: #4b4a49;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--line-border-empty);
  transition: 0.4s ease;
}

.circle.active {
  background-image: linear-gradient(90deg, #00c3a8 4.26%, #ffb900 126.04%);
  color: #fff;
}

/*  */
.sector-container {
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
  /*  */
  padding-left: 4%;
  padding-right: 4%;
}
.recuadro {
  background: #fff;
  width: 70%;
  height: 20%;
  margin: auto;
  text-align: center;
  padding: 4%;
  margin-top: 5vh;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 0px 20px;
  margin-bottom: 7%;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 700;
  font-size: 42px;
  margin-top: -1%;
  font-style: normal;
  line-height: normal;
}
h5 {
  color: #4b4a49;
  font-weight: 400;
  font-size: 17.5px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.volver {
  position: absolute;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: 12%;
  margin: auto;
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
a {
  text-decoration: none;
}

@media (max-width: 800px) {
  .tituloPrincipal {
    font-weight: 700;
    font-size: 40px;
  }
  .recuadro {
    width: 90%;
  }
  .sector-container {
    width: 100%;
    padding-top: 15%;
  }
  .volver {
    bottom: 12%;
  }
}
@media (max-width: 1000px) {
  .recuadro h5 {
    font-size: 15px;
  }
  .sector-container {
    padding-top: 15%;
  }
  .volver {
    bottom: 12%;
  }
}
</style>
