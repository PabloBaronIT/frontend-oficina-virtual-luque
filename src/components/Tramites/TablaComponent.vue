<template>
  <div class="tabla-container">
    <div style="margin-bottom: 3vh; position: relative">
      <i
        class="bi bi-arrow-clockwise reset"
        style="font-size: 28px"
        @click="this.getMyProcedure"
      ></i>
      <SearchPresentadasComponent :setactivos="this.setActivos" />
    </div>
    <!-- TABLA DE TRAMITES -->
    <div class="modalTramite">
      <div class="divTitulos">
        <p>N° GESTIÓN</p>
        <p>FECHA</p>
        <p>TÍTULO</p>
        <!-- <p>{{ this.pagina }}</p> -->
        <div class="nav">
          <div class="pagNum">{{ this.pagina }} de 1</div>
          <img
            class="svg"
            @click="backTramites"
            src="./../../assets/images/previous.svg"
            alt=""
            v-if="this.pagina > 1"
          />

          <img
            @click="nextPag"
            class="svg"
            src="./../../assets/images/next.svg"
            alt=""
            v-if="this.l === 10"
          />
        </div>
        <p>
          <img src="./../../assets/images/DescargaColor.svg" alt="" srcset="" />
        </p>
      </div>
      <div v-for="(item, index) in this.activos" :key="index">
        <div class="encabezado">
          <!-- <p>{{ item.titulo }}</p> -->
          <p
            style="cursor: pointer"
            @click="verTramite(item.id)"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {{ item.id }}
          </p>
          <p
            style="cursor: pointer"
            @click="verTramite(item.id)"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {{ item.estado }}
          </p>
          <p
            style="cursor: pointer"
            @click="verTramite(item.id)"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {{ item.categoria }}
          </p>
          <p></p>
          <p @click="this.open(item.id)">
            <img src="./../../assets/images/Descargar.svg" alt="" />
          </p>
        </div>

        <div :class="item.open ? `open` : `noOpen`">
          <p>Historial del tramite {{ item.id }}:</p>
          <p>
            Fecha de presentación:
            {{ new Date(this.presentacionTramite).toLocaleDateString() }}
            <img
              src="./../../assets/images/Descargar.svg"
              alt=""
              @click="createPDFsubmitt(item.id)"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            />
          </p>
          <p v-if="this.inicioTramite">
            Fecha de Inicio:
            {{ new Date(this.inicioTramite).toLocaleDateString() }}
          </p>
          <div v-if="this.requerimientoTramite">
            <p v-for="element in this.requerimientoTramite" :key="element.id">
              Fecha de Requerimiento/s:

              {{ new Date(element.created_at).toLocaleDateString() }} -
              <img
                src="./../../assets/images/Descargar.svg"
                alt=""
                @click="createPDFrequirement(item.id, element.id)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />
            </p>
          </div>

          <p v-if="this.finalizacionTramite">
            Fecha de Finalización:
            {{ new Date(this.finalizacionTramite).toLocaleDateString() }}
            <img
              src="./../../assets/images/Descargar.svg"
              alt=""
              @click="createPDFfinalized(item.id)"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            />
          </p>
        </div>
      </div>
      <!-- MODAL NUEVO DE VISTA DE TRAMITE -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Tramite: {{ this.selectTramite?.procedure?.id }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- <div class="data-container"> -->
              <div>Tramite n°:{{ this.selectTramite?.procedure?.id }}</div>

              <p>
                Nombre de trámite:
                {{ this.selectTramite?.procedure?.procedure.title }}
                <br />

                Estado:{{ this.selectTramite?.procedure?.status.status }}
              </p>
              <div>
                <h5>Ultima comunicación de su trámite:</h5>
                <p>
                  {{
                    this.selectTramite?.procedure?.communication[
                      this.selectTramite.procedure.communication.length - 1
                    ].message
                  }}
                </p>
              </div>
              <!-- SI EXISTE REQUERIMIENTO ACTIVO SE PUEDE VER Y CONTESTAR -->
              <div
                v-if="
                  this.selectTramite?.procedure?.requirementHistory.length >=
                    1 &&
                  this.selectTramite.procedure.requirementHistory[
                    this.selectTramite.procedure.requirementHistory.length - 1
                  ].active === true
                "
                class="requerimiento"
              >
                <p>
                  Requerimiento:
                  <strong>{{
                    this.selectTramite?.procedure?.requirementHistory[
                      this.selectTramite.procedure.requirementHistory.length - 1
                    ].info_req
                  }}</strong>
                </p>

                <!--BOTON PARA MODAL DE RESPUESTA AL REQUERIMIENTO-->
                <input
                  type="button"
                  value="Responder"
                  @click="
                    OpenModalRespuesta(
                      this.selectTramite?.procedure?.requirementHistory[
                        this.selectTramite.procedure.requirementHistory.length -
                          1
                      ].id
                    )
                  "
                  class="botonSubmit"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                />
              </div>
              <!-- SI EXISTEN DOCUMENTOS RELACIONADOS A ESTE TRAMITE SE PUEDEN VER Y DESCARGAR -->
              <div
                v-if="this.selectTramite?.procedure?.documents.length >= 1"
                class="divDocumentos"
              >
                <h5>Documentación disponible para descargar</h5>
                <div
                  v-for="item in this.selectTramite?.procedure?.documents"
                  :key="item.id"
                  style="display: flex; flex-direction: row"
                >
                  <p>*{{ item.title }}</p>
                  <a target="_blank" :href="`${item.link}`">Descargar </a>
                </div>
              </div>
              <!-- </div> -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <!-- <button type="button" class="btn btn-primary">
                Save changes
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--MODAL PARA RESPONDER AL REQUERIMIENTO-->

    <div
      class="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              <h5 v-if="!this.message">Respuesta:</h5>
              <p>Nº Tramite: {{ this.idTramite }}</p>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!--RESPUESTA ESCRITA-->

            <div class="response" v-if="!message">
              <label for="asunto">Respuesta</label>
              <textarea
                aria-multiline="true"
                name="asunto"
                id=""
                v-model="this.respuestaA"
              />

              <!--SUBIR ARCHIVOS-->

              <div class="file-container2">
                <div v-if="!asd" class="file-intro">
                  <img
                    alt=""
                    id="img-preview"
                    class="imgFile"
                    src="@/assets/images/upload.svg"
                  />
                  <hr />
                  <input
                    accept=".jpg, .jpeg, .png, .webp"
                    type="file"
                    id="img-uploader"
                    @change="selectFile($event)"
                  />

                  <!--INPUT PARA SUBIR EL ARCHIVO-->
                  <div class="fileup">
                    <input
                      v-if="this.file"
                      class="m-2 btn btn-secondary"
                      type="button"
                      value="Subir archivo"
                      @click="postFile()"
                    />
                  </div>
                </div>
                <!--CUANDO SE TEMRINO DE CARGAR EL ARCHIVO-->

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

              <input
                class="botonSubmit"
                type="button"
                value="Enviar"
                @click="sentRespuesta"
                v-if="this.respuestaA || this.respuestaB"
              />
            </div>
          </div>
          <div class="modal-footer">
            <h3 v-if="message" class="enviado">{{ this.message }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PARA PDF -->

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              <h3>Constancia</h3>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              v-if="pdfSubmitt"
              style="width: 100%; margin: auto"
              id="content1"
            >
              <div class="modal-top">
                <h4>Constancia de trámite Nº: {{ this.pdfSubmitt.id }}</h4>
              </div>
              <h5>Nombre: {{ this.pdfSubmitt.procedure.title }}</h5>
              <p>
                Fecha de creación:
                {{ new Date(this.pdfSubmitt?.created_at).toLocaleDateString() }}
              </p>
              <p style="width: 100%">
                {{ this.pdfSubmitt.communication[0]?.message }}
              </p>
              <p>
                Usuario Municipal asignado:
                <strong
                  >{{ this.pdfSubmitt.userMuni.firstname }}
                  {{ this.pdfSubmitt.userMuni.lastname }}</strong
                >
              </p>
              <p>
                Fecha de emisión:
                {{
                  new Date(this.pdfSubmitt?.actual_date).toLocaleDateString()
                }}
              </p>
            </div>
            <div
              v-if="pdfRequirement"
              id="content2"
              style="width: 90%; margin: auto"
            >
              <div class="modal-top">
                <h4>
                  Constancia de requerimiento Nº:
                  {{ this.pdfRequirement.procedureHistory.id }}
                </h4>
              </div>
              <h5>Nombre: {{ this.pdfRequirement.title }}</h5>
              <p>
                Fecha de creación:
                {{
                  new Date(this.pdfRequirement?.created_at).toLocaleDateString()
                }}
              </p>
              <p>
                Fecha de cierre de requerimiento:
                {{
                  new Date(
                    this.pdfRequirement?.finalized_at
                  ).toLocaleDateString()
                }}
              </p>
              <p style="width: 100%">{{ this.pdfRequirement.info_req }}</p>

              <p>
                Fecha de emisión:
                {{
                  new Date(
                    this.pdfRequirement?.actual_date
                  ).toLocaleDateString()
                }}
              </p>
            </div>
            <!-- PARA FINALIZACION -->
            <div
              v-if="this.pdfFinalized"
              id="content3"
              style="width: 90%; margin: auto"
            >
              <div class="modal-top">
                <h4>
                  Constancia de finalización trámite Nº:
                  {{ this.pdfFinalized.id }}
                </h4>
              </div>
              <h5>Nombre: {{ this.pdfFinalized.procedure.title }}</h5>
              <p>
                Fecha de finalización:
                {{
                  new Date(
                    this.pdfFinalized?.resolution__date
                  ).toLocaleDateString()
                }}
              </p>
              <p style="width: 100%">
                {{ this.pdfFinalized.communication[0].message }}
              </p>
              <p>
                Usuario Municipal asignado:
                <strong
                  >{{ this.pdfFinalized.userMuni.firstname }}
                  {{ this.pdfFinalized.userMuni.lastname }}</strong
                >
              </p>
              <p>
                Fecha de emisión:
                {{
                  new Date(this.pdfFinalized?.actual_date).toLocaleDateString()
                }}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="download(this.content)"
              class="btn btn-primary"
            >
              Descargar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <h2 v-if="this.msj !== ''" class="sinTramites">{{ this.msj }}</h2>
    <div class="volver">
      <router-link to="/munienlinea">
        <img src="./../../assets/images/FlechaIzquierda.svg" alt="imagen" />
      </router-link>

      <h4>Volver al Inicio</h4>
    </div>
    <!-- <div class="volver">
      <router-link to="/munienlinea">
        <img src="./../../assets/images/FlechaIzquierda.svg" alt="imagen" />
      </router-link>

      <h4>Volver al Inicio</h4>
    </div> -->
  </div>
</template>

<script>
// import dbService from "@/services/dbService";
import axios from "axios";
import SearchPresentadasComponent from "@/components/SearchPresentadas/SearchPresentadasComponent.vue";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "@/env";
import jsPDF from "jspdf";
export default {
  props: {
    setLoading: Function,
  },

  data() {
    return {
      loading: false,
      msj: "",
      length: null,
      activos: [],
      cont: 0,
      l: 0,
      paginas: null,
      modalComunicaciones: false,
      modalVista: false,
      modalresponse: false,
      selectTramite: null,
      selectRequerimiento: null,
      respuestaA: null,
      respuestaB: [],
      asd: false,
      file: "",
      pagina: 1,
      idTramite: null,
      comunicaciones: "",
      presentacionTramite: null,
      inicioTramite: null,
      requerimientoTramite: null,
      finalizacionTramite: null,
      pdfSubmitt: null,
      pdfRequirement: null,
      pdfFinalized: null,
      modalPDF: false,
      content: "",
    };
  },
  components: {
    SearchPresentadasComponent,
  },
  created() {
    //Pedir solamente los que vengan desde una prop del status
    this.getMyProcedure();

    // this.getComunicaciones();
  },
  methods: {
    download(content) {
      // window.print();
      let asd = document.getElementById("content" + content);
      var doc = new jsPDF("p", "pt", "A4");

      doc.html(asd, {
        y: 2,
        x: 2,

        callback: function (doc) {
          doc.save("Constancia.pdf");
        },
      });
    },
    verTramite(id) {
      //console.log("soy el trmite,", id);
      this.idTramite = id;
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/my-procedure/" + id)
        .then((response) => {
          console.log(response.data);
          this.selectTramite = response.data.MyProcedure;
          // this.modalVista = true;
        })
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.verTramite(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.verTramite(id);
            }
          }
        });
    },
    getMyProcedure() {
      this.activos = [];
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });

      apiClient
        .get(`/oficina/procedures/history/my-procedures?page=${this.pagina}`)
        .then((response) => {
          let h = response.data.MyProcedures;

          console.log(response + "mis tramites");
          this.l = h.length;

          for (let i = 0; i < h.length; i++) {
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

            let iso = h[i].updated_at;
            let date = new Date(iso);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            //Carga del procedure
            p.id = h[i].id;
            p.fecha = `${day}/${month}/${year}`;
            p.categoria = h[i].category.title;
            p.estado = h[i].status.status;
            p.titulo = h[i].procedure.title;
            p.comunicaciones = h[i].communicationCount;

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

            this.activos.push(p);

            //console.log(p);
          }

          this.length = response.data.MyProcedures.length;

          //this.cantTramites();
          this.setLoading();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProcedure();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProcedure();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
          if (error.response.status === 404) {
            this.msj = "No hay mas trámites que mostrar";
          }
          this.setLoading();
          // this.msj = error.response.data.message;
        });
    },
    getComunicaciones(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/my-procedure/" + id)
        .then((response) => {
          console.log(response.data);
          this.comunicaciones =
            response.data.MyProcedure.procedure.communication[
              response.data.MyProcedure.procedure.communication.length - 1
            ];
          this.openModalComunicaciones(id);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getComunicaciones(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getComunicaciones(id);
            }
          }
          //console.log(err.response.data);
        });
    },
    openModalComunicaciones(id) {
      this.selectTramite = id;
      this.modalComunicaciones = !this.modalComunicaciones;
      //this.comunicado = false;
    },
    OpenModalRespuesta(id) {
      this.selectRequerimiento = id;
      // this.modalresponse = !this.modalresponse;
      console.log(this.selectRequerimiento);
    },
    CloseModalRespuesta() {
      this.modalresponse = false;
      this.respuestaA = "";
      this.respuestaB = "";
      this.file = "";
    },

    selectFile($event) {
      const imgPreview = document.getElementById("img-preview");

      this.file = $event.target.files[0];
      const objectURL = URL.createObjectURL(this.file);
      imgPreview.src = objectURL;
      console.log(this.file, "soy el archivo", objectURL);
    },
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
          // console.log(data);
          console.log(data.secure_url, "secure_url");
          this.respuestaB.push({ file: data.secure_url });
          //this.preNext();
          this.fileSelect = null;
          this.asd = true;
        });

      //console.log(res.secure_url, "soy la url de la imagen");
    },
    //ENVIAR RESPUESTA DE REQUERIMIENTO
    sentRespuesta() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      if (this.respuestaA && this.respuestaB.length >= 1) {
        apiClient
          .post(
            "/requirements/answer-requirement/" + this.selectRequerimiento,
            {
              answer: this.respuestaA,
              documentRequirement: this.respuestaB,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.message = "Respuesta enviada!";
              this.activos = [];
              this.getMyProcedure();
              this.modalComunicaciones = false;
              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.sentRespuesta();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.sentRespuesta();
              }
            }
          });
      }
      if (this.respuestaA && this.respuestaB.length === 0) {
        apiClient
          .post(
            "/requirements/answer-requirement/" + this.selectRequerimiento,
            {
              answer: this.respuestaA,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.message = "Respuesta enviada!";
              this.getMyProcedure();
              this.modalComunicaciones = false;

              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.sentRespuesta();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.sentRespuesta();
              }
            }
          });
      }
      if (!this.respuestaA && Array.isArray(this.respuestaB)) {
        apiClient
          .post(
            "/requirements/answer-requirement/" + this.selectRequerimiento,
            {
              documentRequirement: this.respuestaB,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.message = "Respuesta enviada!";
              this.getMyProcedure();
              this.modalComunicaciones = false;

              this.respuestaA = "";
              this.respuestaB = "";
            }
          })
          .catch((error) => {
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.sentRespuesta();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.sentRespuesta();
              }
            }
          });
      } else {
        this.messageResponse = true;
      }
      console.log(this.respuestaA, this.respuestaB);
    },
    nextPag() {
      this.pagina++;
      this.getMyProcedure();
    },
    backTramites() {
      this.pagina--;
      this.getMyProcedure();
    },
    //ABRIR UN TRAMITE
    open(id) {
      this.activos.forEach((item) => {
        if (item.id === id) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        if (item.open === true) {
          this.getHistory(id);
        }
      });
    },
    //BUSQUEDA DE HISTORIAL DE UN TRAMITE
    getHistory(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/oficina/procedures/timeline/" + id).then((response) => {
        console.log(response.data);
        this.presentacionTramite = response.data.CreatedDate;
        this.inicioTramite = response.data.InProcessDate;
        this.requerimientoTramite = response.data.RequirementDates;
        this.finalizacionTramite = response.data.FinalizedDate;
      });
    },
    createPDFsubmitt(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/submitted-procedure-data/" + id)
        .then((response) => {
          this.pdfSubmitt = response.data;
          this.pdfRequirement = null;
          this.pdfFinalized = null;
          this.content = "1";
          this.modalPDF = true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.createPDFsubmitt(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.createPDFsubmitt(id);
            }
          }
        });
    },
    createPDFrequirement(tramite, id) {
      console.log(tramite, id, "soy el tramite y el requer");
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get(
          "/oficina/procedures/requirement-procedure-data/" + tramite + "/" + id
        )
        .then((response) => {
          console.log(response.data);
          this.pdfRequirement = response.data;
          this.pdfSubmitt = null;
          this.pdfFinalized = null;
          this.content = "2";

          this.modalPDF = true;
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.createPDFrequirement(tramite, id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.createPDFrequirement(tramite, id);
            }
          }
        });
    },
    createPDFfinalized(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/procedures/finalized-procedure-data/" + id)
        .then((response) => {
          console.log(response);
          (this.pdfFinalized = response.data), (this.pdfSubmitt = null);
          this.pdfRequirement = null;
          this.content = "3";

          this.modalPDF = true;
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.createPDFfinalized(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.createPDFfinalized(id);
            }
          }
        });
    },
    setActivos(dato) {
      this.activos = [];
      this.activos.push(dato);
    },
  },
};
</script>

<style scoped>
/* CSS NUEVO */
.reset {
  position: absolute;
  right: 2rem;
}

.svg {
  max-width: 15px;
  max-height: 15px;
}

.tabla-container {
  width: 90%;
  height: auto;
  margin-top: 5vh;
  justify-content: flex-start;
  margin-bottom: 6%;
}

.modalTramite {
  position: relative;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  border-top-right-radius: 20px;
  margin-bottom: 6%;
}

.divTitulos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 1vw;
  border-bottom: 1px solid #9b9a9a;
  text-align: center;
  border-radius: 0px 20px 0px 0px;
}

.divTitulos p {
  color: #4b4a49;
  font-weight: 600;
  font-size: 16px;
  min-width: 10%;
}

.encabezado {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1vw;
  background: white;
  border-bottom: 1px solid #9b9a9a;
}

.encabezado p {
  font-weight: 400;
  color: #4b4a49;
  min-width: 24%;
  /* width: 40%; */
}

.grafico-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 13;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  /* Need a specific value to work */
  height: auto;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.pdf {
  width: 50vw;
  height: 60vh;
}

.modal-top {
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;
  align-items: flex-start;
}

.data-container {
  display: flex;
  flex-flow: column wrap;
  height: auto;
  width: 90%;
  /* align-items: s; */

  text-align: left;
}

.requerimiento {
  border: solid 1px red;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botonSubmit {
  margin: auto;
  width: 100px;
  height: 45px;
  background-color: var(--green);
  border-radius: 20px 20px 0px 0px;
  color: white;
  border-style: none;
  margin-top: 1rem;
}

.divDocumentos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: rgba(128, 128, 128, 0.473);
  align-items: center;
  margin-top: 2rem;
}

.divDocumentos a {
  margin-left: 2rem;
}

.close {
  position: absolute;
  right: 2rem;
  top: 0.5rem;
}

.pagNum {
  margin: 0 2px;
  font-size: 15px;
}

.nav {
  align-self: flex-start;

  padding-top: 0.5rem;
}

.volver {
  position: absolute;
  bottom: 10%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  left: 4vw;
}

.volver h4 {
  margin-left: 14px;
  color: #808081;
  font-weight: 100;
  margin-top: 1.5vh;
}

.open {
  max-height: 250px;
  text-align: left;
  padding: 1rem;
}

.noOpen {
  max-height: 0;
  overflow: hidden;
}

.modalRespuesta {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 14;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  height: auto;
  width: 500px;
  /* Need a specific value to work */
  border-radius: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  right: 15rem;
}

.response {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.response textarea {
  width: 100%;
}

.file-container2 {
  border: 1px solid var(--grey);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-top: 2rem;
}

.file-intro {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.imgFile {
  height: 4rem;
  width: 4rem;
  margin: auto;
}

.cargado {
  text-align: center;
}

/* .encabezado p {
  width: 40%;
} */
.sinTramites {
  position: relative;
  width: 100%;
  height: 150px;
  text-align: center;
  padding-top: 2rem;
  color: #128d44;
}

.modal-content {
  min-height: 300px;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-top {
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: center;
  align-items: flex-start;
}

.fileup {
  margin: auto;
}

.enviado {
  color: green;
  font-size: 25px;
  margin-left: 2rem;
}

H4 {
  text-align: left;
}

/* ----------------------------------------------------------------------------------- */
.modalComunicacion {
  width: 80%;
  height: auto;
  padding: 1rem;
  position: absolute;
  right: 8rem;
  background: var(--grey-bk);
  z-index: 10;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
}

span {
  font-size: 15px;
  position: absolute;
  right: 4px;
  bottom: 2px;
}

@media (max-width: 800px) {
  .tabla-container {
    width: 95%;
    /* padding-bottom: 15%; */
  }

  .volver {
    bottom: 8%;
  }
}

@media (max-width: 1000px) {
  .tabla-container {
    width: 95%;
    padding-bottom: 10%;
  }

  .volver {
    bottom: 10%;
  }
}

@media (max-width: 480px) {
  .media {
    display: none;
  }
}

.bi {
  font-size: 1.5rem;
  color: black;
  margin: auto;
}
</style>
