<template>
  <footer class="general">
    <div class="linea"></div>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div class="grupoRedes">
        <i class="bi bi-facebook redes"></i>
        <i class="bi bi-instagram redes"></i>
        <i class="bi bi-envelope-fill redes"></i>
      </div>
      <h6 style="margin-right: 2rem; margin-top: 1rem">
        Municipalidad de Luque | 9 de Julio 806, Luque, Córdoba | CP X5967 |
        TEL.:03573 49-0113
      </h6>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.general {
  position: relative;
  /* z-index: 17; */
  height: 12%;
  background-color: #f5f5f5;
  width: 82%;
  margin-left: 18%;
  text-align: right;
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
h6 {
  font-size: 17px;
  font-weight: 400;
  color: #858585;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.grupoRedes {
  margin-left: 3vw;
  width: 10vw;
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
@media (max-width: 1200px) {
  .redes {
    font-size: 35px;
  }
  .grupoRedes {
    width: 12vw;
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
    width: 15%;
  }
  h6 {
    font-size: 12px;
    font-weight: 200;
  }
}
@media (max-width: 800px) {
  .general {
    /* position: relative; */
    width: 100%;
    /* z-index: 20; */
    /* width: 100vw; */
    margin-left: 0;
  }
  h6 {
    font-size: 12px;
    font-weight: 200;
  }
  .redes {
    font-size: 25px;
  }
  .grupoRedes {
    width: 15vw;
  }
}
@media (max-width: 600px) {
  .general {
    /* position: relative; */
    width: 100%;
    /* z-index: 20; */
    /* width: 100vw; */
    margin-left: 0;
  }
  h6 {
    font-size: 10px;
    font-weight: 200;
  }
  .redes {
    font-size: 20px;
  }
  .grupoRedes {
    width: 20vw;
  }
}
</style>
