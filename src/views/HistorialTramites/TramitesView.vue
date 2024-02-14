<template>
  <div class="sector-container" v-if="setPermission && !this.loading">
    <h1 class="tituloPrincipal">
      Presentadas
      <h4 style="color: #4b4a49; font-weight: 100">
        Gestiones presentadas hasta la fecha.
      </h4>
    </h1>
    <Tabla :setLoading="this.setLoading" />
  </div>
  <div class="prueba-container l" v-else>
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
</template>

<script>
import Tabla from "@/components/Tramites/TablaComponent.vue";
export default {
  name: "TramitesView",
  components: {
    Tabla,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.loading = false;
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
    setLoading() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
main {
  /* width: 100%; */
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-left: 4%;
  padding-right: 4%;
  /* padding-bottom: 120px; */

  width: 82%;
  /* background-color: #f5f5f5; */
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
}
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  font-size: 50px;
  margin-top: 4vh;
}
.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;
}
.sector-container {
  /* width: 100%; */
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-left: 4%;
  padding-right: 4%;
  /* padding-bottom: 120px; */

  width: 82%;
  /* background-color: #f5f5f5; */
  position: absolute;
  right: 0;
  padding-top: 10%;
  padding-bottom: 10%;

  /* background: var(--grey-bk); */
}
.l {
  flex-direction: row;
}
/* h1 {
  margin-top: 4vh;
  margin-left: 4vw;
  margin-bottom: 4vh;
} */
.sector-container {
  /* width: 100%; */
  /* height: auto; */
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.menu {
  width: 100%;
  display: flex;
  justify-content: left;
  text-align: left;
}
h4 {
  width: 100%;
  text-align: left;
  color: var(--blue);
}

main {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;

  flex-flow: column wrap;
  background: var(--grey-bk);
}

@media (max-width: 800px) {
  .main-container {
    width: 100%;
    height: auto;
  }
  .tituloPrincipal {
    color: #4b4a49;

    font-weight: 700;
    font-size: 50px;
  }
  .sector-container {
    width: 100%;
    padding-top: 12%;
  }
}
@media (max-width: 600px) {
  .tituloPrincipal {
    font-weight: 700;
    font-size: 30px;
  }
  .main-container {
    width: 100%;
    height: auto;
  }
}
</style>
