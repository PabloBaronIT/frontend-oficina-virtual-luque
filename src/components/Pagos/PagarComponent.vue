<template>
  <div class="containerA">
    <!-- <div class="img">
      <img src="@/assets/mastercard.svg" alt="" />
      <img src="@/assets/visa.svg" alt="" />

      <img class="pagotic" src="@/assets/pagotic.svg" alt="" />
    </div> -->

    <div class="text">
      <b>{{ this.$store.state.procedure[0].title }}</b>
      <h2>Trámite arancelado</h2>
      <p>
        Este trámite tiene un valor total de ${{
          this.$store.state.procedure[0].precio
        }}
        <b></b>
      </p>
      <input
        class="btn"
        type="button"
        value="Abonar mi trámite"
        @click="submitPago"
      />

      <!-- <input class="cancel" type="button" value="Cancelar" @click="cancel" /> -->
    </div>
    <div
      class="alert alert-success"
      role="alert"
      v-if="this.modal"
      style="word-wrap: break-word"
    >
      Abra el siguiente link en el navegador Google Chrome para realizar su pago
      <a href=""> {{ this.link }}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";

export default {
  name: "PagarComponent",
  created() {
    this.procedure_amount = this.$route.query.precio;
    this.idTramitePago = parseInt(this.$route.params.idTramite);
    // console.log(
    //   this.procedure_amount,
    //   this.idTramitePago,
    //   "soy precio  e idtramite"
    // );

    let sUsrAg = navigator.userAgent;

    console.log(sUsrAg);

    if (sUsrAg.indexOf("Chrome") > -1) {
      this.browser = "Google Chrome";
    } else {
      this.browser = "desconocido";
    }
    // else if (sUsrAg.indexOf("Safari") > -1) {
    //   this.browser = "Apple Safari";
    // } else if (sUsrAg.indexOf("Opera") > -1) {
    //   this.browser = "Opera";
    // } else if (sUsrAg.indexOf("Firefox") > -1) {
    //   this.browser = "Mozilla Firefox";
    // } else if (sUsrAg.indexOf("MSIE") > -1) {
    //   this.browser = "Microsoft Internet Explorer";
    // } else if (sUsrAg.indexOf("Edg/") > -1) {
    //   this.browser = "Microsofot Edge";
    // }

    console.log("Usted está utilizando: " + this.browser);
  },
  data() {
    return {
      procedure_amount: "",
      idTramitePago: "",
      modal: false,
      link: "",
      browser: "",
    };
  },
  props: {
    setLoading: Function,
  },
  methods: {
    submitPago() {
      this.setLoading();
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/payment-procedure", {
          procedure_history_id: this.idTramitePago,
          procedure_amount: this.procedure_amount,
        })
        .then((response) => {
          console.log(response.data);
          if (this.browser === "Google Chrome") {
            this.setLoading();
            window.location.href = response.data.Url;
          } else {
            this.setLoading();
            this.link = response.data.Url;
            this.modal = true;
          }
          //window.location.href = response.data.redirectURL;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.submitPago();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.submitPago();
            }
          }
        });
    },
  },
};
</script>
<style scoped>
.cancel {
  border: none;
  background: none;
  font-weight: 100;
  text-decoration: underline;
  color: var(--text-color);
}

.pagotic {
  max-width: 100px;
}

.containerA {
  border: 1px solid var(--green);
  padding: 0;
  /* display: flex; */
  /* flex-flow: row wrap; */
  /* flex-direction: row; */
  height: 150px;
  width: 60%;
  margin-bottom: 5%;
}

.text {
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img {
  width: 20%;
  background: var(--green);
}

.btn {
  background: var(--green);
  color: #000;
  width: 80%;
}

img {
  max-width: 40px;
  margin: 10px;
}
h2 {
  color: #128d44;
}
@media (max-width: 800px) {
  .btn {
    width: 100%;
  }
  .containerA {
    width: 100%;
  }
}
@media (max-width: 1000px) {
  .btn {
    width: 50%;
  }
  .containerA {
    width: 100%;
  }
}
@media (max-width: 1200px) {
  .btn {
    width: 50%;
  }
  .containerA {
    width: 100%;
  }
}
</style>
