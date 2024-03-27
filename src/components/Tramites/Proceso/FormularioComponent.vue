<template>
  <div class="contenedor">
    <div v-if="this.loading" class="spinner-border" role="status">
      <span></span>
    </div>
    <!-- TITULO -->
    <div class="topquestion" v-if="this.preguntas">
      <h5>
        {{ this.preguntas[this.paso]?.question?.title }}
      </h5>
    </div>
    <!--DETALLES DE OPCIONES-->
    <!-- PARA VER MAPA Y PODER ESCRIBIR DIRECCION -->

    <div
      v-if="
        this.preguntas[this.paso]?.question?.title === 'Indique la ubicación'
      "
    >
      <div class="questions">
        <div class="tipoMap">
          <div class="inputCalle">
            <label>Calle</label>
            <input
              class="form-control text-number-input"
              type="text"
              v-model="this.calle"
            />
            <label>Nro.</label>
            <input
              class="form-control text-number-input"
              type="number"
              v-model="this.numero"
            />
          </div>
          <div class="entreCalles">
            <label>Entre calles</label>
            <input
              class="form-control text-number-input"
              type="text"
              v-model="this.entrecalles"
            />
          </div>
        </div>
        <div class="tipoMap">
          <MapaLocationComponentVue :setTextInput="this.setTextInput" />
        </div>
      </div>
    </div>
    <!-- DETALLE DE DEMAS PREGUNTAS QUE NO NSEAN INDICAR UBICACION  -->
    <div
      :v-if="
        this.preguntas[this.paso]?.questionOption?.length >= 1 &&
        this.paso > this.preguntas.length &&
        this.preguntas[this.paso]?.question?.title !== 'Indique la ubicación'
      "
      v-for="(item, index) in this.preguntas[this.paso]?.questionOption"
      :key="item.id"
      class="questions"
    >
      <!-- INPUT TIPO RADIO -->
      <div v-if="item.type == 'radio'" class="optionsRadio">
        <div class="tipoRadio">
          <input
            :name="this.preguntas[this.paso]?.question?.title"
            :type="item.type"
            v-model="this.selected"
            :value="index + 1"
          />
          <div>
            <label :for="item.title" class="option-text">
              {{ item.title }}</label
            >
            <br />
          </div>
        </div>
      </div>

      <!-- INPUT TIPO TEXTO -->
      <div
        v-if="
          item.title !== `Indique la ubicación:` &&
          item.title !== `Detalles de la ubicación:` &&
          item.type === 'text'
        "
        class="tipoTexto"
      >
        <label for=""> {{ item.title }}</label>

        <input
          class="form-control text-number-input"
          style="width: 27vw"
          :type="item.type"
          v-model="this.textInput"
        />
      </div>
      <div
        v-if="
          item.title !== `Indique la ubicación:` &&
          item.title !== `Detalles de la ubicación:` &&
          item.type === 'number'
        "
        class="tipoTexto"
        style="align-items: center"
      >
        <br />
        <label for="">
          {{ item.description }}
        </label>
        <input
          class="form-control text-number-input"
          style="width: 27vw"
          :type="item.type"
          v-model="this.textInput"
        />
      </div>

      <!-- INPUT TIPO FILE -->

      <div v-if="item.type == 'file'" class="file-container">
        <div v-if="!asd" class="file-intro">
          <img alt="" id="img-preview" class="imgFile" v-if="this.fileSelect" />
          <i
            class="bi bi-card-image"
            style="font-size: 35px; color: #00c3a8"
            v-else
          ></i>

          <!-- <hr /> -->
          <input
            accept=".jpg, .jpeg, .png, .webp"
            :type="item.type"
            v-model="this.fileSelect"
            id="img-uploader"
            @change="selectFile($event)"
            v-if="!this.fileSelect"
          />

          <!--INPUT PARA SUBIR EL ARCHIVO-->
          <input
            v-else
            class="m-2 btn btnColor"
            type="button"
            value="Subir archivo"
            @click="postFile()"
          />
        </div>
        <div v-else class="cargado">
          <img
            src="@/assets/images/red-check-mark-icon.svg"
            alt=""
            id="img-preview"
            class="imgFile"
          />
          <p>Archivo cargado</p>
        </div>
      </div>
    </div>

    <p class="error" v-show="validation == false">
      Debe seleccionar una opcion para continuar
    </p>
    <div class="volver">
      <div style="display: flex; flex-direction: row" @click="back()">
        <img src="./../../../assets/images/FlechaIzquierda.svg" alt="imagen" />
        <h4>Volver atrás</h4>
      </div>
      <div
        style="display: flex; flex-direction: row"
        @click="
          () => {
            this.preNext();
          }
        "
        v-if="this.paso + 1 < this.preguntas.length"
      >
        <h4>Siguiente</h4>
        <img src="./../../../assets/images/FlechaDerecha.svg" alt="imagen" />
      </div>
    </div>

    <!-- Si esta en el ultimo paso se habilita el submitt -->
    <!--INPUT PARA ENVIAR TODAS LAS RESPUESTAS-->

    <div v-if="this.paso + 1 === this.preguntas.length" class="btn-submit">
      <!-- <div v-if="this.mensajeTrue" class="error">
        <p>
          {{ this.mensaje }}
        </p>
      </div> -->
      <input
        class="botonSubmit"
        type="button"
        value="Enviar"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="submitt"
      />
    </div>

    <!-- MODAL -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-if="this.mensajeTrue">
          <div class="modal-body">
            <p>{{ this.mensaje?.message }}</p>
            <!-- <h6>Tu solicitud ha sido presentada exitosamente.</h6> -->
            <p>N° de trámite: {{ this.mensaje?.procedure_history_id || "" }}</p>
            <p>
              Podés seguir el estado de tu solicitud en la sección Presentadas
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="
                () => {
                  this.$router.push(`/munienlinea`);
                }
              "
            >
              Close
            </button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "@/env";
import MapaLocationComponentVue from "../../Mapa/MapaLocationComponent.vue";
// var procedure = {
//   title: "",
//   userId: "",
//   categoryId: null,
//   statusId: 1,
//   procedureId: null,
//   selected: null,
//   questions: [],
//   date: new Date(),
//   questions: [],
// };

export default {
  name: "FormularioComponent",

  props: {
    questionProp: Array,
    precio: Number,
    dispatchProcedure: Function,
    setProcedure: Function,
    outProcedure: Function,
    progreso: Function,
    retroPogreso: Function,
  },
  components: {
    MapaLocationComponentVue,
  },
  data() {
    return {
      modalReclamo: false,
      paso: 0,
      validation: null,
      loading: false,
      textInput: "",
      coordenadas: "",
      selected: "",
      //submitted: false,
      catId: null,
      file: null,
      fileSelect: null,
      asd: false,
      // idProcedure: null,
      preguntas: null,
      respuestas: [],
      servicio: false,
      mensaje: "",
      mensajeTrue: false,
      sectorTitle: "",
      formularioTitle: "",
      calle: "",
      numero: "",
      entrecalles: "",
      optionId: null,
      subOptionId: null,
      procedureId: null,
    };
  },
  created() {
    // procedure.title = this.title;
    // procedure.userId = localStorage.getItem("id");
    this.loading = true;
    this.setLoading();
    console.log(this.preguntas, "soy las de preguntas");
    this.sectorTitle = this.$route.query.sector;
    this.formularioTitle = this.$route.params.formularioTitle;
    console.log(
      this.procedureId,
      this.optionId,
      this.subOptionId,
      "soy el tramite, la opcion Y subOpcion del tramite"
    );
  },
  methods: {
    setTextInput(a, b) {
      console.log(a, b, "soy las coordenadas");
      let valor = `${a},${b}`;
      this.coordenadas = valor;
    },

    dispatchClean() {
      this.$store.dispatch("cleanAction");
    },

    preNext() {
      if (this.calle != "") {
        this.textInput =
          this.calle + " " + this.numero + " " + this.entrecalles;
      }
      if (
        this.selected == "" &&
        this.textInput == "" &&
        this.coordenadas == ""
      ) {
        this.validation = false;
      } else if (
        this.selected != "" &&
        this.textInput == "" &&
        this.coordenadas == ""
      ) {
        this.next();
        this.progreso();
      } else if (
        this.selected == "" &&
        this.textInput != "" &&
        this.coordenadas == ""
      ) {
        this.next();
        this.progreso();
      } else if (
        this.selected == "" &&
        this.textInput == "" &&
        this.coordenadas != ""
      ) {
        this.next();
        this.progreso();
      } else if (
        this.selected == "" &&
        this.textInput != "" &&
        this.coordenadas != ""
      ) {
        this.next();
        this.progreso();
      }
      this.asd = false;
    },
    //elegir una archivo para enviar
    selectFile($event) {
      const imgPreview = document.getElementById("img-preview");

      this.file = $event.target.files[0];
      const objectURL = URL.createObjectURL(this.file);
      imgPreview.src = objectURL;
      console.log(this.file, "soy el archivo");
    },
    //GUARDAR EL ARCHIVO EN CLAUDINARY Y TOMAR SOLO LA URL
    postFile: async function () {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.textInput = data.secure_url;
          this.asd = true;
          //console.log(data.secure_url, "secure_url");
          //console.log(data);
          console.log(this.textInput, "archivo cargado en textInput");
          //this.preNext();
        });
      this.fileSelect = null;
    },

    //SE GUARDA LA RESPUESTA EN UN ARRAY PARA LUEGO ENVIAR
    next() {
      // let choice = this.selected - 1;
      // let optionTitle = "";

      // if (this.textInput != "") {
      //   optionTitle = this.textInput;
      //   choice = 0;
      // } else {
      //   optionTitle = this.preguntas[this.paso].questionOption[choice].title;
      // }

      // let q = {
      //   question: this.preguntas[this.paso].question.id,
      //   question_option_history: [
      //     {
      //       questionOption: this.preguntas[this.paso].questionOption[choice].id,
      //       answer: optionTitle,
      //     },
      //   ],
      // };

      let choice = this.selected - 1;
      let optionTitle = "";
      let optionTitle2 = "";
      let q = "";
      if (this.textInput != "" && this.coordenadas == "") {
        optionTitle = this.textInput;
        choice = 0;
        q = {
          question: this.preguntas[this.paso]?.question?.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso]?.questionOption[choice].id,
              answer: optionTitle,
            },
          ],
        };
      } else if (this.textInput == "" && this.coordenadas != "") {
        optionTitle = this.coordenadas;
        choice = 1;
        q = {
          question: this.preguntas[this.paso]?.question?.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso]?.questionOption[choice].id,
              answer: optionTitle,
            },
          ],
        };
      } else if (this.textInput != "" && this.coordenadas != "") {
        optionTitle = this.textInput;
        optionTitle2 = this.coordenadas;
        choice = 0;
        // let choice2 = 1;
        q = {
          question: this.preguntas[this.paso]?.question?.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso]?.questionOption[choice].id,
              answer: optionTitle,
            },
            {
              questionOption:
                this.preguntas[this.paso]?.questionOption[choice].id,
              answer: optionTitle2,
            },
          ],
        };
      } else {
        optionTitle = this.preguntas[this.paso]?.questionOption[choice].title;
        q = {
          question: this.preguntas[this.paso]?.question?.id,
          question_option_history: [
            {
              questionOption:
                this.preguntas[this.paso]?.questionOption[choice].id,
              answer: optionTitle,
            },
          ],
        };
      }

      this.setProcedure(q);
      this.respuestas.push(q);
      console.log(this.respuestas, "!respuestas ");
      // this.procedure.questions.push(q);
      //console.log(this.procedure.questions, "RESPUESTAS");
      this.selected = "";
      choice = 0;
      this.calle = "";
      this.numero = "";
      this.entrecalles = "";
      this.textInput = "";
      this.coordenadas = "";
      this.validation = true;
      if (this.paso === this.preguntas?.length - 1) {
        this.paso = this.preguntas?.length - 1;
        // this.loading = true;
      } else {
        this.paso++;
      }
    },

    //ENVIO DE LAS RESPUESTAS -FINAL DEL FORMULARIO-

    submitt() {
      // if (
      //   this.selected == 0 &&
      //   this.textInput == "" &&
      //   this.coordenadas == ""
      // ) {
      //   this.validation = false;
      // } else {
      //   this.validation = true;
      // }
      let asd = {
        procedureId: parseInt(this.$route.params.tramiteId),
        optionId:
          this.$route.query.opcionTramite === "null"
            ? null
            : parseInt(this.$route.query.opcionTramite),
        subOptionId:
          this.$route.query.subOpcionTramite === "null"
            ? null
            : parseInt(this.$route.query.subOpcionTramite),
        questions: this.respuestas,
      };
      if (this.validation) {
        this.preNext();
        this.loading = true;

        const apiClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });

        apiClient
          .post("/oficina/procedures/submit-procedure", asd)
          .then((response) => {
            console.log(response);
            if (response.status === 201) {
              let idTramite = response.data.procedure_history_id;
              this.textInput = "";
              this.mensajeTrue = true;
              this.mensaje = response.data;
              let precioTramite = response.data.procedure_price;

              if (precioTramite > 0) {
                //////TOMAR EL PRECIO DEL TRAMITE PARA SABER SI HAY QUE REDIRIGIR A SIRO
                setTimeout(() => {
                  this.$router.push(
                    `/pago/${idTramite}?precio=${precioTramite}`
                  );
                }, 3000);
              }
              // else {
              // alert(
              //   "Su reclamo fue presentado! Gracias por utilizar nuestra Oficina Virtual"
              // );
              // setTimeout(() => {
              //   this.$router.push(`/munienlinea`);
              // }, 2000);
              // }
              this.dispatchClean();
              this.dispatchProcedure();
              //   //console.log(this.$store.procedure[0]);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 401) {
              alert("No esta autorizado para realizar este tramite.");
              this.$router.replace({ path: "/munienlinea" });
            }
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.submitt();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.submitt();
              }
            } else {
              this.mensajeTrue = true;

              this.mensaje = {
                message: "Se ha producido un error, vuelva a interntarlo.",
              };
            }
          })
          .finally(() => {
            this.loading = false;
          });

        this.loading = false;
        //console.log(this.procedure.questions);
      }
    },
    back() {
      if (this.paso === 0) {
        this.$router.push(
          `/sector/${this.$route.query.sectorTitle}/${this.$route.query.sectorId}`
        );
      } else {
        this.paso = this.paso - 1;
        this.outProcedure();
        this.respuestas.pop();
        this.retroPogreso();
      }
    },
    cancel() {
      this.$router.replace({ path: "/munienlinea" });
      this.preguntas = [];
    },
    ver() {
      var doc = new jsPDF();
      doc.setTextColor(120, 12, 3);
      doc.setFontSize(22);
      //doc.text(20, 20, `${procedure.questions[0].options[0].answer}`);
      doc.setTextColor(20);
      doc.setFontSize(16);
      doc.text(20, 30, "This is some normal sized text underneath.");
      doc.save("a4.pdf");
    },
    setLoading() {
      this.preguntas = this.questionProp;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
/* CSS NUEVO */
.optionsRadio {
  padding-bottom: 2%;
  /* padding-left: 5%; */
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 60%;
  margin: auto;
}
.contenedor {
  margin-bottom: 12%;
  padding-bottom: 5%;
  /* width: 75%; */
  margin: auto;
}
.btnColor {
  background-image: linear-gradient(90deg, #019939 4.26%, #ffcc03 126.04%);
  color: white;
  width: 50%;
  font-size: 14px;
}
h5 {
  color: #019939;
  font-weight: 900;
  font-size: 24px;
}
.volver {
  position: absolute;
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.5%;
  bottom: 7%;
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
.tipoMap {
  /* padding: 1%; */
  width: 82%;
  margin: auto;
  margin-bottom: 10%;
}
.tipoMap input {
  width: 35%;
  /* margin-left: 1rem; */
  border-radius: 10px;
  margin-top: 1rem;
}
.tipoMap label {
  padding-top: 1rem;
  /* margin-left: 1rem; */
  font-weight: 700;
}
.questions {
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
  /* padding-left: 1rem; */
  width: 100%;
  margin: auto;
}

.topquestion {
  /* padding-left: 3rem; */
  padding-top: 1rem;
  margin: auto;
  height: 5rem;
  width: 60%;
}
.topquestion h5 {
  color: #3e3e3e;

  font-size: 21.88px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.tipoTexto {
  /* height: 7rem; */
  /* padding: 1rem; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 82%;
  margin: auto;
  margin-bottom: 10%;
}
.tipoTexto label {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.tipoTexto textarea {
  width: 70%;
  border-radius: 12px;
  margin-left: 2%;
  /* height: 270px; */
}

.tipoTexto input[type="number"] {
  /* width: 40%; */
  margin-left: 1rem;
  height: 3rem;

  border-radius: 10px;
  margin-top: 1rem;
  border: none;
}
.tipoTexto input[type="text"] {
  width: 40%;
  margin-left: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}
.error {
  width: 100%;
  color: #00c3a8;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
}
.tipoRadio {
  display: flex;
  flex-direction: row;
  align-content: center;
}
.tipoRadio input[type="radio"] {
  height: 20px;
  width: 20px;
  margin-top: 10px;
  margin-right: 15px;
}
.botonSubmit {
  width: 100px;
  height: 45px;
  background-color: #00c3a8;
  border-radius: 20px 20px 0px 0px;
  color: white;
  margin-left: 1rem;
  border-style: none;
}
.inputCalle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.inputCalle input {
  width: 40%;
  margin-left: -4%;
}
.entreCalles {
  margin-bottom: 4vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.entreCalles input {
  width: 87%;
  margin-left: 1%;
}
/* ---------- */

.file-container {
  border: 1px var(--grey);
  border-style: dashed;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 30%;
  margin: auto;
  margin-bottom: 2rem;
}

.file-intro {
  display: flex;
  /* flex-flow: column wrap; */
  width: 100%;
  justify-content: center;
}

.file-intro input[type="file"] {
  margin: auto;
  margin-left: 1rem;
}
.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}

.cargado {
  text-align: center;
}
.btn-submit {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  margin-top: -5%;
  height: auto;
  /* margin-bottom: 10rem; */
}

.btn-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: right;
  padding-right: 2rem;
}
.option-text {
  font-size: 1.3em;
}
.modalReclamo {
  position: absolute;
  top: 15rem;
  left: 30rem;
  height: 10rem;
  width: 20rem;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 15;
  text-align: center;
  color: var(--green);
}
@media (max-width: 1200px) {
  .questions {
    width: 70%;
    justify-content: space-around;
    margin: auto;
  }
  .volver {
    bottom: 5%;
  }
  .topquestion {
    width: 60%;
    text-align: center;
  }
}
@media (max-width: 1000px) {
  .topquestion {
    width: 60%;
    text-align: center;
  }
  .questions {
    width: 70%;
    justify-content: space-around;
    margin: auto;
  }
  .volver {
    bottom: 5%;
  }
}
@media (max-width: 800px) {
  .contenedor {
    width: 100%;
  }
  .topquestion {
    width: 60%;
    text-align: center;
  }
  .questions {
    width: 70%;
    justify-content: space-around;
    margin: auto;
  }
  .volver {
    bottom: 5%;
  }
  .tipoTexto {
    width: 100%;
  }
  .tipoTexto input[type="number"] {
    width: 80%;
    /* margin-left: 1rem;
    height: 3rem;

    border-radius: 10px;
    margin-top: 1rem;
    border: none; */
  }
  .tipoTexto input[type="text"] {
    width: 60%;
    margin-left: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
  }
  .file-container {
    margin-bottom: 0;
  }
}

/*













.input-option {
  width: 50%;
}



.option {
  text-align: left;
  margin-top: 10px;
}

.option input {
  margin: 0 0px;
}

p {
  font-weight: 100;
}



 */
</style>
