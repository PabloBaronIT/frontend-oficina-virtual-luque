<template>
  <div class="carousel-container">
    <Carousel :autoplay="1700" :items-to-show="4" :wrap-around="true">
      <Slide class="tramite">
        <router-link
          :to="`/formulario/1/Habilitación%20de%20negocio/1`"
          class="carousel__item"
        >
          <p>Habilitacion de comercio</p>

          <img src="@/assets/tramitesSVG/dni.svg" />
        </router-link>
      </Slide>
      <Slide class="tramite">
        <router-link :to="`/formulario/Sacar%20turno/1`" class="carousel__item">
          <p>Permiso de construccion</p>

          <img src="@/assets/tramitesSVG/construccion.svg" />
        </router-link>
      </Slide>
      <Slide class="tramite">
        <router-link :to="`/formulario/Sacar%20turno/1`" class="carousel__item">
          <p>Registro civil</p>

          <img src="@/assets/tramitesSVG/registro.svg" />
        </router-link>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "TramitesFrecuentes",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      sectores: [
        {
          id: 1,
          name: "Renovacion de DNI",
          src: "@/assets/busqueda.svg",
        },
        {
          id: 2,
          name: "App Ciudadana",
          src: "jucio.svg",
        },
      ],
    };
  },
});
</script>

<style scoped>
.carousel__item {
  color: var(--text-color);
  text-decoration: none;
  user-select: none;
}

.carousel-container {
  width: 100%;
  cursor: pointer;
  user-select: none;
}

.tramite img {
  width: 50px;
}

.tramite {
  font-size: 0.9em;
  border-radius: 10px;
  border: 1px solid var(--red);
  font-weight: bold;
  padding: 20px;
  box-shadow: 0px 2px 5px rgb(97, 97, 97);
  height: 100%;
  margin: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
