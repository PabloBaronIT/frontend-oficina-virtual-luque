<template>
  <!-- Sidebar -->
  <div class="nav-container" v-if="this.role !== 'MUNI_ROLE'" id="sidebarMenu">
    <!--el los usuarios que tienen representados ,el linck de inicio no se muestra hasta que seleccionar a quien representar-->

    <div class="tusGestiones">
      <!-- <h3 class="tus"><strong>Tus</strong></h3>
      <h1 style="margin-top: 20px" class="tituloDegrade">gestiones</h1>
      <h3 class="estes tituloDegrade">donde estés</h3> -->
    </div>

    <div class="navUser">
      <router-link v-show="setPermission" :to="`/munienlinea`" class="bn3">
        <h5>Inicio</h5>
      </router-link>
      <router-link v-show="setPermission" :to="`/tramites`" class="bn3">
        <h5>Presentadas</h5>
      </router-link>

      <router-link v-show="setPermission" :to="`/notificaciones`" class="bn3">
        <h5>Notificaciones</h5>
      </router-link>
      <router-link v-show="setPermission" :to="`/turneroweb`" class="bn3">
        <h5>Turnos</h5>
      </router-link>
    </div>
    <router-link
      v-show="setPermission"
      :to="`/notificaciones`"
      class="inpuestos"
    >
      <img src="./../../assets/images/MuniTeLlama.svg" alt="" />
    </router-link>

    <!-- nav del mmunicipal -->
    <nav v-if="this.role == 'MUNI_ROLE'" id="sidebarMenu" class="btn-container">
      <router-link v-show="permission" :to="`/muni`" class="bn3">
        Back
      </router-link>

      <input @click="logOf" class="bn3" type="button" value="Cerrar Sesion" />
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      ruta: this.$router.currentRoute.value.fullPath,
      usuario: localStorage.getItem("name"),
      apellido: localStorage.getItem("lastname"),
      dni: localStorage.getItem("cuil"),
      permission: false,
      user_id: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
      user: null,
    };
  },
  created() {
    this.role = localStorage.getItem("role");
    if (this.$store.state.user?.cuil) {
      this.permission = true;
    }
  },
  watch: {},
  computed: {
    setPermission() {
      if (this.$store.state.user?.cuil) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {},
};
</script>

<style scoped>
/* CSS NUEVO */
.nav-container {
  color: var(--text-color);
  position: fixed;
  margin-top: 14vh;
  display: flex;
  flex-direction: column;
  width: 18vw;
  height: 100vh;
  background: #f0f0f0;
  background-image: url("./../../assets/images/FondoNavLuque.svg");
  background-repeat: repeat;
  background-position: inherit;
}
.tusGestiones {
  position: relative;
  top: 12%;
  height: 15vh;
  width: 100%;
  padding-left: 1.5vw;
  background-image: url("./../../../public/img/tus-gestiones.png");
  background-repeat: no-repeat;
  background-position: center;
}
.tus {
  position: absolute;
  left: 2.5vw;
  font-weight: 900;
  color: #038638;
}
.tituloDegrade {
  background: linear-gradient(277deg, #ffcc03 -14.38%, #019939 55.14%);

  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.estes {
  position: absolute;
  font-weight: 900;
  left: 2.5vw;
  top: 9vh;

  /* bottom: 1.5vh; */
}
.estes h3 {
  font-size: 900;
}
.navUser {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 60%;
  align-items: center;
}
.bn3 {
  height: 25%;
  width: 13.5vw;
  border: 0.16em solid rgb(255, 255, 255);
  text-align: center;
  background-image: linear-gradient(90deg, #00c3a8 4.26%, #ffb900 126.04%);

  border-top-right-radius: 20px;
  transition: all 0.2s;
  border-style: none;
  color: white;
  margin-bottom: 2.5vh;
  padding-top: 1vh;
}
.inpuestos {
  position: relative;
  top: 1%;
  width: 13.5vw;
  height: 10vh;
  border-top-right-radius: 20px;
  left: 2vw;
  background-image: linear-gradient(to right, #ffb900 -14.87%, #ff2745 108.09%);
  /* padding-left: 1vw; */
  padding-top: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
nav {
  padding: 15px;
}
nav a {
  color: white;
  font-size: 15px;
}
h5 {
  color: white;
  font-weight: 700;
  font-size: 17.5px;
  font-style: normal;
  line-height: normal;
  /* font-size: 25px; */
}
a {
  text-decoration: none;
}
/* ----------------------------------------------- */

/* CSS */

@media (max-width: 1200px) {
  h5 {
    font-size: 15px;
  }
}
@media (max-width: 1000px) {
  h5 {
    font-size: 15px;
  }
}
@media (max-width: 800px) {
  .nav-container {
    display: none;
  }
}
.nameRepresntative {
  cursor: pointer;
  color: #2c5777;
}
</style>
