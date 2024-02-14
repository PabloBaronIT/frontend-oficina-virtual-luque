import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    token: localStorage.getItem("token"),
    procedure: [],
    user: "",
    CidiCookie: null,
    representante: null,
  },
  getters: {
    getProfile(state) {
      return state.firstname;
    },
  },
  mutations: {
    loggedIn(state, asd) {
      state.user = asd;
    },
    setCidi(state, asd) {
      state.CidiCookie = asd;
    },
    saveProcedure(state, asd) {
      //let obj = JSON.parse(asd);
      state.procedure.push(asd);
    },
    cleanStore(state) {
      state.procedure = [];
    },

    representante(state, asd) {
      state.representante = asd;
    },
    login(state) {
      state.loggedIn = true;
    },
    outLogin(state) {
      state.loggedIn = false;
    },
  },
  actions: {
    mockLoginAction(context, asd) {
      context.commit("loggedIn", asd);
    },
    mockCidiAction(context, asd) {
      context.commit("setCidi", asd);
    },
    mockRepresentanteAction(context, asd) {
      context.commit("representante", asd);
    },
    saveP(context, asd) {
      context.commit("saveProcedure", asd);
    },
    mockPaseAction(context) {
      context.commit("login");
    },
    mockOutAction(context) {
      context.commit("outLogin");
    },
    cleanAction(context) {
      context.commit("cleanStore");
    },
  },
  modules: {},
});
