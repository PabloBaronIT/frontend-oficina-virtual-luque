<template>
  <div class="container">
    <div class="containerSearch">
      <input
        type="text"
        class="search"
        v-model="this.value"
        placeholder="Escribinos algo relacionado o elegí alguna opción de abajo"
        @keyup="this.searchValue"
      />

      <img src="./../../assets/images/Search.svg" alt="" class="circuloVerde" />
    </div>
    <div v-if="this.values" style="position: absolute; z-index: 15; width: 96%">
      <div class="vistaValues" v-for="item in this.values" :key="item.id">
        <router-link
          :to="`/formulario/cuestionario/${item.title}/${item.id}?sectorTitle=${this.$route.params.sectorTitle}&sectorId=${this.$route.params.sectorId}`"
        >
          <a>{{ item.title }}</a>
        </router-link>
        <!-- <p>
          {{ item.title }}
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
import setToken from "@/middlewares/setToken";

export default {
  name: "SearchComponent",
  data() {
    return {
      value: "",
      values: null,
    };
  },
  methods: {
    searchValue() {
      console.log(this.value);
      if (this.value != "") {
        console.log("no soy null");

        const apiClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/oficina/procedures/search-procedures", {
            query: this.value,
          })
          .then((response) => {
            this.values = response.data.Search;
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              if (error.response.data.message === "Token de usuario expirado") {
                setToken();
                this.searchValue();
              }
              if (
                error.response.data.message ===
                "Token de representante expirado"
              ) {
                setTokenRelations();
                this.searchValue();
              }
            }
            if (error.response.status === 401) {
              this.$router.push("micuenta-update");
            }
          });
      } else {
        console.log(" soy null");
        this.values = null;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin-bottom: 4rem;
  margin-top: -15px;
}
.containerSearch {
  width: 75%;
  position: relative;
  /* display: flex; */
  /* flex-direction: row; */
  /* margin-top: 4rem; */
}
.search {
  width: 100%;
  position: relative;
  height: 7vh;
  border-color: transparent;
  padding-left: 1rem;
  border-radius: 0px 20px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
}
.vistaValues {
  width: 70%;
  background: white;
  text-align: left;
  /* margin-left: 5vw; */
  height: 45px;
  padding-left: 1rem;
  z-index: 15;
  border-bottom: solid 1px grey;
}
.circuloVerde {
  position: absolute;
  /* z-index: 15; */
  right: 2rem;
  /* top: -0.2rem; */
  /* margin-left: 2rem; */
  height: 45px;
  width: 45px;
  border-radius: 50%;
  /* padding-left: 11px; */
  cursor: pointer;
}
.vistaValues a {
  cursor: pointer;
  text-decoration: none;
  color: black;
}
@media (max-width: 1000px) {
  .circuloVerde {
    right: 5%;
    top: 10%;
    height: 35px;
    width: 35px;
  }
  .containerSearch {
    width: 90%;
    position: relative;
  }
}
@media (max-width: 800px) {
  .search {
    width: 90%;
    margin-left: 0;
  }
  .container {
    width: 90%;
  }
  .containerSearch {
    width: 90%;
    position: relative;
  }
  .circuloVerde {
    right: 12%;
    top: 10%;
    height: 35px;
    width: 35px;
  }
}
@media (max-width: 600px) {
  .search {
    width: 100%;
    margin-left: 0;
  }
  .container {
    width: 95%;
    margin-left: 4%;
  }
  .containerSearch {
    width: 95%;
    position: relative;
  }
}
</style>
