<template>
  <div class="contenedor-requisitos">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <div class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home-tab-pane"
          type="button"
          role="tab"
          aria-controls="home-tab-pane"
          aria-selected="true"
        >
          REQUISITOS
        </button>
      </div>
      <div class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile-tab-pane"
          type="button"
          role="tab"
          aria-controls="profile-tab-pane"
          aria-selected="false"
        >
          PASOS
        </button>
      </div>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home-tab-pane"
        role="tabpanel"
        aria-labelledby="home-tab"
        tabindex="0"
      >
        <div class="interno">
          <h4>
            Para iniciar esta gestión deberás contar con los siguientes datos:
          </h4>
          <ul>
            <li style="list-style: none">
              <i
                class="bi bi-circle-fill"
                style="color: #00c3a8; font-size: 10px"
              ></i>
              Ubicación exacta del lugar donde se encuentra el desperfecto.
            </li>
            <li style="list-style: none">
              <i
                class="bi bi-circle-fill"
                style="color: #00c3a8; font-size: 10px"
              ></i>
              Una descripción de la situación e incluso puede subir una foto.
            </li>
          </ul>
          <p>
            Si posees toda la documentación requerida, ¡Estás listo para
            comenzar el trámite!
          </p>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="profile-tab-pane"
        role="tabpanel"
        aria-labelledby="profile-tab"
        tabindex="0"
      >
        <div class="interno">
          <h4>
            Para iniciar esta gestión deberás seguir los siguientes pasos:
          </h4>
          <ol>
            <li v-for="(item, index) in this.pasos" :key="index">
              <!-- <i
                class="bi bi-circle-fill"
                style="color: #00c3a8; width: 2px"
              ></i> -->
              {{ item }}
            </li>
            <!-- <li>
              Ubicación exacta del lugar donde se encuentra el desperfecto.
            </li>
            <li>
              Una descripción de la situación e incluso puede subir una foto.
            </li> -->
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RequisitosComponent",
  data() {
    return {
      pasos: [
        "Ingresa a la Oficina Virtual del Municipio.",
        "Indicación de Ruta para llegar al trámite, o escribí en el buscador 'el nombre del trámite'",
        "Verifica los requisitos, los datos y la documentación que vas a necesitar para presentar el trámite.",
        "Inicia el trámite. Completa la información y sube los archivos que se van solicitando.",
        "Realiza el pago de la Tasa (si hubiera) y presenta el trámite.",
        "Aguarda la comunicación del Municipio sobre la resolución del trámite",
      ],
    };
  },
};
</script>
<style scoped>
.contenedor-requisitos {
  background: #fff;
  width: 100%;
  margin: auto;
  margin-bottom: 10%;
  margin-top: 5%;
  border-radius: 16px;
  padding: 1% 3%;
}
.interno {
  padding: 4% 2%;
}
.interno h4 {
  color: #00c3a8;
  font-weight: 600;
}
li {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 2%;
  color: #000;
  /* list-style: none; */
}
li {
  margin-left: -4%;
}
ol {
  margin-left: 4%;
}
ol {
  counter-reset: item;
}
ol li {
  /* list-style-type: decimal; */
  list-style: none;
  /* list-style: decimal; */
  /* background: #ddd;
  width: 150px;
  height: 50px;
  border: solid 1px black; */
}
ol li::before {
  display: inline-block;
  content: counter(item);
  counter-increment: item;
  background-color: #00c3a8;
  border-radius: 50%;
  color: #fbfbfb;
  font-size: 14px;
  padding: 1px;
  /* margin: 4px 4px; */
  text-align: center;
  width: 20px;
  height: 20px;
  margin-left: -4%;
}

p {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-top: 4%;
  color: #000;
}
.nav-item {
  border-radius: 0px 0px 8px 0px;
  background: linear-gradient(
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
.nav-link {
  font-size: 17.5px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #3e3e3e;
  padding: 10px 20px;
  border-radius: 0px 0px 8px 0px;
  border: none;
  background: #fff;
  margin: 0px 0px 0px 0px;
}
.active {
  color: #3e3e3e;
}
.nav-link.active {
  /* border-right: 3px solid #00c3a8;
  border-bottom: 3px solid #00c3a8; */
  margin: 0px 3px 3px 0px;
}
</style>
