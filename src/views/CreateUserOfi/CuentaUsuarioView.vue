<template>
  <div class="nav-container">
    <router-link :to="`/`" class="imagenlogo">
      <img src="./../../assets/images/logo-muni.svg" alt="Sacanta" />
    </router-link>
    <h1>Crear cuenta</h1>
  </div>
  <section>
    <h4>
      Registra tus datos para crear tu cuenta, luego ingresá a nuestra oficina
      virtual.
    </h4>
    <RegisterComponentVue />
    <footer>
      <div class="linea"></div>

      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div class="grupoRedes">
          <i class="bi bi-facebook redes"></i>
          <i class="bi bi-instagram redes"></i>
          <i class="bi bi-envelope-fill redes"></i>
        </div>
        <h6 style="margin-right: 2rem; margin-top: 1rem">
          <strong>Municipalidad de Sacanta | </strong>
          25 de Mayo 292, Sacanta, Córdoba | CP X5945 | TEL.: 03533 15 417923
        </h6>
      </div>
    </footer>
  </section>
</template>
<script>
import RegisterComponentVue from "@/components/Login&Register/RegisterComponent.vue";
export default {
  name: "CuentaUsuario",
  components: {
    RegisterComponentVue,
  },
};
</script>
<style scoped>
.nav-container {
  height: 5%;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* padding-top: 1rem; */
  /* padding-left: 0; */
}
.imagenlogo {
  width: 40%;
  height: 10%;
  /* position: relative; */
  /* margin-left: 2.6vw; */
}
section {
  /* width: 100vw;
  height: 100vh;*/

  padding-top: 2rem;
  background-color: #f5f5f5;
  /* margin-bottom: 20%; */
  text-align: center;
  margin-top: 5%;
}

h1 {
  /* margin-left: 8%; */
  margin-top: 4%;
  font-size: 50px;
  color: #019939;
}
.grupoRedes {
  margin-left: 3%;
  width: 11%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.redes {
  background: linear-gradient(
    to right,
    #ffcc03,
    #ffa800,
    #fb8200,
    #f3590d,
    #e52320
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-size: 35px;
}
h6 {
  font-size: 18px;
  font-weight: 400;
  color: #858585;
}
.linea {
  height: 5px;
  width: 100%;
  background-image: linear-gradient(
    to right,
    #f9b100,
    #fa9400,
    #f87400,
    #f45011,
    #ec1c21
  );
  margin-bottom: 10px;
}
@media (max-width: 1200px) {
  .redes {
    font-size: 35px;
  }
  .grupoRedes {
    width: 12%;
  }
  h6 {
    font-size: 15px;
    font-weight: 200;
  }
}
@media (max-width: 1000px) {
  .redes {
    font-size: 25px;
  }
  .grupoRedes {
    width: 12%;
  }
  h6 {
    font-size: 12px;
    font-weight: 200;
  }
}
</style>
