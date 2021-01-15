import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialogAnuncio: false,
    dialog: false,
    show: false,
    snackbar: false,
    snackbarUser: false,
    snackbarWish: false,
    snackbarEliminar: false,
    text: "",
    timeout: -1,
    color: null,
  },
  mutations: {
    snackabierta(state) {
      console.log("Snack Abierta");
      state.snackbar = true;
    },
    snackcerrada(state) {
      console.log("Snack Cerrada");
      state.snackbar = false;
    },

    snackUserabierta(state) {
      console.log("Snack User Abierta");
      state.snackbarUser = true;
    },
    snackUsercerrada(state) {
      console.log("Snack User Cerrada");
      state.snackbarUser = false;
    },

    snackWishabierta(state) {
      console.log("Snack Wish Abierta");
      state.snackbarWish = true;
    },
    snackWishcerrada(state) {
      console.log("Snack Wish Cerrada");
      state.snackbarWish = false;
    },

    snackEliminarabierta(state) {
      console.log("Snack Eliminar Abierta");
      state.snackbarEliminar = true;
    },
    snackEliminarcerrada(state) {
      console.log("Snack Eliminar Cerrada");
      state.snackbarEliminar = false;
    },

    openFormUser(state) {
      console.log("Formulario Usuario Abierto");
      state.dialog = true;
    },
    closeFormUser(state) {
      console.log("Formulario Usuario Cerrado");
      state.dialog = false;
    },

    openFormNuevoAnuncio(state) {
      console.log("Formulario nuevo anuncio abierto");
      state.dialogAnuncio = true;
    },
    closeFormNuevoAnuncio(state) {
      console.log("Formulario nuevo anuncio cerrado");
      state.dialogAnuncio = false;
    }
  },
  actions: {},
  modules: {},
});
