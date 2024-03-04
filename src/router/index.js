import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login/LoginView.vue"),
  },
  {
    path: "/login",
    name: "login", //para usar el router link sin modificar la ruta web
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login/LoginView.vue"),
  },
  {
    path: "/munienlinea",
    name: "munienlinea",
    component: () => import("../views/HomeVecino/HomeVecinoView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/auth/reset-password/:token",
    name: "reset-password",
    component: () => import("@/views/ResetView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/pago/:idTramite",
    name: "pago",
    component: () => import("@/views/PagosTramites/PagoView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/pago-resultado",
    name: "pago-resultado",
    component: () => import("@/views/PagoVista/pagoResultadoView.vue"),
  },
  {
    //PARA VISTA DE SUBACTEGORIA
    path: "/sector/:sectorTitle/:sectorId/:tramiteId",
    name: "subCategoria",
    component: () => import("../views/ProcesoTramite/SubCategoriaView.vue"),
    meta: { requiresAuth: true },
  },
  {
    //SectorTitle se pasa unicamente como prop para header de la vista
    path: "/sector/:sectorTitle/:sectorId",
    name: "sector",
    component: () => import("../views/ProcesoTramite/SectorView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/formulario/cuestionario/:formularioTitle/:formularioId",
    name: "formulario",
    component: () => import("@/views/ProcesoTramite/FormularioView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tramites",
    name: "tramites",
    component: () => import("@/views/HistorialTramites/TramitesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/notificaciones",
    name: "notificaciones",
    component: () => import("@/views/Notificaciones/NotificacionesView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/micuenta",
    name: "micuenta",
    component: () => import("@/views/PerfilVecino/CuentaView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/micuenta-update",
    name: "micuenta-update",
    component: () => import("@/views/UpdateData/UpdateDataView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/crear-cuenta",
    name: "createUser",
    component: () => import("@/views/CreateUserOfi/CuentaUsuarioView.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let actual = localStorage.getItem("token");

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (actual != null) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
