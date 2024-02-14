<template>
  <div class="form-container">
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from "@/components/Login&Register/LoginComponent.vue";

export default {
  name: "LoginView",
  components: {
    LoginComponent,
  },
  created() {
    localStorage.clear();

    window.dispatchEvent(
      new CustomEvent("token-localstorage-changed", {
        detail: {
          storage: localStorage.getItem("token"),
        },
      }),
    );
  },
};
</script>

<style scoped>
.form-container {
  width: 100vw;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
