<template>
  <div class="row">
    <h5 class="fecha">
      <i class="bi bi-calendar4-week"></i>{{ this.fechaCompleta }}
    </h5>
  </div>
</template>
<script>
export default {
  name: "FechaComponent",
  data() {
    return {
      fechaCompleta: "",
      fecha: "",
      dia: "",
      mes: "",
      nombreDia: "",
    };
  },
  created() {
    this.fecha = new Date();
    this.dia = this.fecha.getDate();
    this.getMes(this.fecha.getMonth());
    this.getDia(this.fecha.getDay());
    this.fechaCompleta = `${this.nombreDia} ${this.dia} de ${this.mes}`;
  },
  methods: {
    getMes(mes) {
      switch (mes) {
        case 0:
          this.mes = "Enero";
          break;
        case 1:
          this.mes = "Febrero";
          break;
        case 2:
          this.mes = "Marzo";
          break;
        case 3:
          this.mes = "Abril";
          break;
        case 4:
          this.mes = "Mayo";
          break;
        case 5:
          this.mes = "Junio";
          break;
        case 6:
          this.mes = "Julio";
          break;
        case 7:
          this.mes = "Agosto";
          break;
        case 8:
          this.mes = "Septiembre";
          break;
        case 9:
          this.mes = "Octubre";
          break;
        case 10:
          this.mes = "Noviembre";
          break;
        case 11:
          this.mes = "Diciembre";
          break;

        default:
          break;
      }
    },
    getDia(dia) {
      switch (dia) {
        case 1:
          this.nombreDia = "Lunes";
          break;
        case 2:
          this.nombreDia = "Martes";
          break;
        case 3:
          this.nombreDia = "Miércoles";
          break;
        case 4:
          this.nombreDia = "Jueves";
          break;
        case 5:
          this.nombreDia = "Viernes";
          break;
        case 6:
          this.nombreDia = "Sábado";
          break;
        case 7:
          this.nombreDia = "Domingo";
          break;

        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.fecha {
  letter-spacing: 0px;
  position: absolute;
  text-align: right;
  padding-top: 3vh;
  padding-right: 3.5vw;
  z-index: 10;
  top: 18vh;
  font-size: 14px;
  color: #9b9a9a;
}
.bi {
  font-size: 27px;
  margin-right: 1%;
}
</style>
