<template>
  <div class="text-center">
<SnackbarFormUser></SnackbarFormUser>

    <v-row justify="center">
      <v-dialog scrollable v-model="dialog" width="400px" persistent>
        <v-card hover light max-height="350">
          <v-card-title class="headline teal lighten-3"> Usuario </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="contrasenia"
                type="password"
                label="Contraseña"
                required
              ></v-text-field>

              <div class="d-flex justify-end mb-6 red--text">
                <router-link to="/foo">Olvidé mi contraseña</router-link>
              </div>
              <v-divider></v-divider>
              <div class="d-flex justify-center m-6">
                <v-btn
                  
                  block
                  color="teal lighten-3"
                  elevation="24"
                  tile
                  >Entrar</v-btn
                >
              </div>
              <div class="d-flex justify-center mt-4 red--text">
                <router-link to="/foo"
                  >¿No tiene una cuenta? Regístrese</router-link
                >
              </div>
              <div class="d-flex justify-center mt-4">
                <h3>Escoja una opción para entrar</h3>
              </div>
              <div class="d-flex justify-center mt-4">
                <v-btn block color="teal lighten-3" elevation="24" tile>
                  CÓDIGO DE ACCESO POR E-MAIL</v-btn
                >
              </div>
              <div class="d-flex justify-center mt-4">
                <v-btn block color="teal lighten-3" elevation="24" tile>
                  ENTRAR CON FACEBOOK</v-btn
                >
              </div>
              <div class="d-flex justify-center mt-4">
                <v-btn block color="teal lighten-3" elevation="24" tile>
                  ENTRAR CON GOOGLE</v-btn
                >
              </div>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="procesar" elevation="24" outlined
              >Crear</v-btn
            >

            <v-btn color="error" elevation="24" @click="cancelar" outlined
              >Cancelar</v-btn
            >
            
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>














<script>
import SnackbarFormUser from "./SnackbarFormUser.vue";
import { db } from "../db";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Form",
  components:{
    SnackbarFormUser,
  },
  data() {
    return {
      usuarionuevo: [],
      valid: true,
      checkbox: false,
      primernombre: "",
      segundonombre: "",
      primerapellido: "",
      segundoapellido: "",
      contrasenia: "",
      nombreRules: [
        (v) => !!v || "El Nombre Es Requerido",
        (v) =>
          (v && v.length <= 20) || "El Nombre Debe Ser Menor a 20 Caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "El E-mail Es Requerido",
        (v) => /.+@.+\..+/.test(v) || "El E-mail No Es Valido",
      ],
      multiline: true,
    };
  },
  computed: {
    ...mapState(["dialog", "snackbarUser", "text", "timeout"]),
  },
  methods: {
    ...mapMutations([
      "openFormUser",
      "closeFormUser",
      "snackUserabierta",
      "snackUsercerrada",
    ]),
    cancelar() {
      this.reset();
      this.closeFormUser();
    },
    procesar() {
      var thisVue = this;
      db.collection("usuarios")
        .add({
          email: this.email,
          contrasenia: this.contrasenia,
        })
        .then(function () {
          thisVue.snackUserabierta();
          thisVue.closeFormUser();
          console.log("Datos Procesados");
          thisVue.reset();
        })
        .catch(function (err) {
          console.log(err);
        });

      // console.log(this.anuncionuevo[0].titulo)
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  firestore: {
    usuarionuevo: db.collection("usuarios"),
  },
};
</script>

<style>
</style>