<template>
  <div class="main" v-if="setPermission">
    <div class="container">
      <div class="prueba-container l" v-if="this.loading">
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
      <div class="prueba-container" id="elemento" v-else>
        <h2>Último paso:</h2>
        <p>
          Este tramite es arancelado, una vez que se <br />
          procese el pago podra descargar su comprobante.
        </p>
        <PagarComponent :setLoading="this.setLoading" />

        <button
          type="button"
          class="btn btn-primary detalle"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Ver detalles de trámite
        </button>

        <!-- MODAL DE DETALLE DE TRAMITE -->
        <div
          class="modal fade asd"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          >
            <div
              class="modal-content"
              id="content"
              style="width: 100%; height: 100%; font-size: 15px"
            >
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Detalle:
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  padding: 0px 1rem;
                "
              >
                <p>
                  Usuario:{{ this.$store.state.user.firstname }} {{ " " }}
                  {{ this.$store.state.user.lastname }}
                </p>
                <p>cuil:{{ this.$store.state.user.cuil }}</p>
              </div>
              <div class="modal-body text-start">
                <h2>
                  {{ this.$store.state.procedure[0].title || "" }}
                </h2>
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 0px 1rem;
                  "
                >
                  <p>Fecha: {{ this.$store.state.procedure[0].fecha || "" }}</p>
                  <p>
                    Valor: {{ this.$store.state.procedure[0].precio || "" }}
                  </p>
                </div>

                <p>respuetas:</p>
                <div
                  v-for="(ans, key) in this.$store.state.procedure[0].questions"
                  :key="key"
                  class="answer"
                >
                  <p>{{ ans.question_option_history[0].answer || "" }}</p>
                </div>
              </div>
              <div class="footerCoprobante">
                <div>
                  <p>Declaro que los datos asignados son verdaderos.</p>
                </div>
                <div
                  v-if="this.$store.state.representante"
                  class="textRepresentative"
                >
                  Este trámite fue presentado por
                  <strong>
                    {{ this.$store.state.representante.firstname }}
                    {{ this.$store.state.representante.lastname }} en
                  </strong>

                  representacion de
                  <strong>
                    {{ this.$store.state.user.firstname }}
                    {{ this.$store.state.user.lastname }}
                  </strong>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="button" @click="download" class="btn btn-primary">
                  Descargar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagarComponent from "@/components/Pagos/PagarComponent.vue";
import jsPDF from "jspdf";

export default {
  name: "PagoView",
  data() {
    return {
      loading: true,
      comprobante: false,
    };
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
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  components: { PagarComponent },
  methods: {
    download() {
      // window.print();
      let asd = document.getElementById("content");
      var doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4",
      });

      doc.html(asd, {
        y: 2,
        x: 2,

        callback: function (doc) {
          doc.save("ConstanciaPago.pdf");
        },
      });
    },
    verComprobante() {
      this.comprobante = !this.comprobante;
    },
    setLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;

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
.asd {
  word-break: break-all;
}

.container {
  width: 90%;
  margin: auto;
}

.comprobante {
  position: absolute;
  top: 0;
}

.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.l {
  flex-direction: row;
}

p {
  font-weight: 10;
}

h2 {
  color: var(--red);
}
.detalle {
  margin-top: 2rem;
}
@media (max-width: 1000px) {
  .main {
    height: 100%;
  }
}
@media (max-width: 800px) {
  .main {
    width: 100%;
    height: 100%;
  }
  .detalle {
    margin-top: 2rem;
  }
}

.footerCoprobante {
  width: 100%;
  font-size: 15px;
}
.textRepresentative {
  color: var(--red);
  padding: 1rem;
  border-top: 1px solid black;
}
</style>
