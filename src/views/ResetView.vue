<template>
  <div class="form-container">
    <form>
      <label for="new-password"><h2>Nueva contraseña</h2></label>
      <input
        class="form-control w-50 my-5"
        v-model="this.pass"
        type="password"
        id="new-password"
        name="newPassword"
        required
      />
      <input
        class="btn btn-success"
        type="button"
        @click="reset()"
        value="Resetear contraseña"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { BASE_URL } from "@/env";

export default {
  name: "ResetView",
  data() {
    return {
      pass: "",
      token: null,
    };
  },
  created() {
    console.log(this.$route.params);
    this.token = this.$route.params.token;
  },
  methods: {
    reset() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "reset-token": this.token,
        },
      });

      apiClient
        .post(`/auth/reset-password/` + this.token, {
          newPassword: this.pass,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            router.go("/munienlinea");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

form h2 {
  color: var(--red);
}

form {
  background: var(--blue);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 30%;
  height: 50%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
</style>
