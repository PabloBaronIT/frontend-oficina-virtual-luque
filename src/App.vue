<template>
  <NavTopVue
    v-if="
      this.role != 'MUNI_ROLE' &&
      // this.role != undefined &&
      // this.role != null &&
      this.setPermission
    "
  />
  <div class="main-container">
    <NavComponent
      v-if="
        this.role != 'MUNI_ROLE' &&
        // this.role != undefined &&
        // this.role != null &&
        this.setPermission
      "
    />
    <div class="claseB">
      <FechaComponent
        v-if="
          this.role != 'MUNI_ROLE' &&
          // this.role != undefined &&
          // this.role != null &&
          this.setPermission
        "
      />
      <router-view />
      <div class="footer">
        <FooterComponentVue
          v-if="
            this.role != 'MUNI_ROLE' &&
            // this.role != undefined &&
            // this.role != null &&
            this.setPermission
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";
import NavTopVue from "./components/MuniEnLinea/NavTop.vue";
import FooterComponentVue from "@/components/Footer/FooterComponent.vue";
import FechaComponent from "@/components/Fecha/FechaComponent.vue";
export default {
  data() {
    return {
      role: "",
      cuil: "",
      ancho: "",
      margin: "",
      posision: "",
      derecha: "",
      asd: this.$route.fullPath,
      notLogin: false,
    };
  },
  created() {
    this.role = localStorage.getItem("role") || null;
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
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
    setClass() {
      // console.log(this.asd);
      if (this.asd === "/login" || this.asd !== "/") {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    NavComponent,
    NavTopVue,
    FooterComponentVue,
    FechaComponent,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: light) {
  #app {
    --green: rgb(104, 185, 132);
    --blue: #415f77;
    --lblue: rgb(139, 167, 190);
    --yellow: rgb(240, 169, 47);
    --red: rgb(225, 77, 42);
    --text-color: #2c3e50;
    --grey-bk: #ebebeb;
    --grey: rgba(70, 70, 70, 0.459);
    --white: #fff;
    /* --fondo: linear-gradient(
      to bottom,
      #dcdddf,
      #e4e5e6,
      #ececed,
      #f4f4f5,
      #fcfcfc
    ); */
  }
}

@media (prefers-color-scheme: dark) {
  #app {
    --green: #68b984;
    --blue: #415f77;
    --lblue: #8ba7be;
    --yellow: #f0a92f;
    --red: #e14d2a;
    --text-color: #2c3e50;
    --grey-bk: #ebebeb;
    --grey: rgba(70, 70, 70, 0.459);
    --white: #fff;
    --colorpricipal: #128d44;
    --gradiente: linear-gradient(
      to right,
      #ff6928,
      #ff8219,
      #ff9a08,
      #ecab00,
      #d7b909,
      #c2c627,
      #96ca4b,
      #6ccb6d,
      #3fc88d,
      #00c3a8
    );
  }
}

#app {
  user-select: none;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  /* font-family: "Source Sans 3", sans-serif; */
  font-family: "Montserrat", sans-serif;
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: var(--text-color); */
  margin: 0;
  width: 100vw;
  /* height: auto;  */
  /* width: 100%; */
  background: #f5f5f5;
}
body {
  overflow-y: auto;
}
p {
  color: #9b9a9a;
}
/* ACTUALIZADO */
/* h1 {
  color: #008838;
  font-size: xx-large;
}
h2 {
  color: white;
  font-weight: 500;
}
h3 {
  color: #808081;
  font-weight: 200;
}

h4 {
  color: #019939;
  font-weight: 900;
}
h5 {
  color: #808081;
  font-size: 26px;
  font-weight: 700;
  line-height: normal;
}
h6 {
  color: white;
  font-size: 24px;
  font-weight: 200;
  line-height: normal;
} */
/* ---------------------------- */
</style>

<style scoped>
.claseB {
  width: 100%;
  /* height: 100%; */
  /* right: 0; */
  /* margin-top: 17vh; */
  /* z-index: 5; */
}
.footer {
  position: fixed;
  width: 100%;
  right: 0;
  z-index: 15;
  bottom: 0;
}
.main-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.fixed {
  position: fixed;
  width: 100vw;
}
.login {
  position: absolute;
  width: 81.2vw;
  margin-top: 14vh;
  right: 0;
}
@media (max-width: 800px) {
  #app {
    width: 100vw;
  }
  .claseB {
    width: 100vw;
  }
  .footer {
    /* position: fixed; */
    width: 100%;
    /* right: 0; */
    /* z-index: 15; */
    bottom: 0;
  }
}
</style>
