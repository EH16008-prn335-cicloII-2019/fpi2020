<template>
  <div class="text-center">
    <v-row justify="center">
      <v-dialog scrollable v-model="dialogAnuncio" width="350px" persistent>
        <v-card hover light max-height="350">
          <v-card-title class="headline teal lighten-3">
            Creando Anuncio
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
               <v-text-field
               append-icon="mdi-attachment"
                v-model="titulo"
                :counter="20"
                :rules="nombreRules"
                label="Titulo del anuncio"
                required
              ></v-text-field>
              <v-textarea rows="2"  append-icon="mdi-message"
                v-model="descripcion"
                :counter="50"
                :rules="descripcionRules"
                label="Descripcion"
                required>


              </v-textarea>
               <v-text-field
               append-icon="mdi-cash-100"
                v-model="precio"
                label="Precio"
                required
                type="number"
                min="0"
              ></v-text-field>

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
            <Snackbar></Snackbar>
            
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
</template>














<script>
import Snackbar from './Snackbar.vue';
import { db } from "../db";
import { mapMutations, mapState } from "vuex";
export default {
  name: "NuevoAnuncio",
  components:{
    Snackbar
  },
  data() {
    return {
      nuevoanuncio: [],
      valid: true,
      checkbox: false,
      titulo : "",
      descripcion : "",
      precio : null,
      nombreRules: [
        (v) => !!v || "El Nombre Es Requerido",
        (v) =>
          (v && v.length <= 20) || "El Nombre Debe Ser Menor a 20 Caracteres",
      ],
      descripcionRules: [
        (v) => !!v || "La Descripcion Es Requerida",
        (v) =>
          (v && v.length <= 50) || "El Nombre Debe Ser Menor a 50 Caracteres",
      ],
      multiline: true,
    };
  },
  computed: {
    ...mapState(["dialogAnuncio", "snackbar", "text", "timeout",
    
    
     // "titulo",
      //"descripcion",
     //"precio"
    
    
    
    
    ]),
  },
  methods: {
    ...mapMutations([
      "openFormNuevoAnuncio",
      "closeFormNuevoAnuncio",
      "snackabierta",
      "snackcerrada",
    ]),
    cancelar() {
      this.reset();
      this.closeFormNuevoAnuncio();
    },
    procesar() {
      var thisVue = this;
      db.collection("anuncionuevo")
        .add({
            titulo: this.titulo,
            descripcion : this.descripcion,
            precio : this.precio,
        })
        .then(function () {
          thisVue.snackabierta();
          thisVue.closeFormNuevoAnuncio();
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
    nuevoanuncio: db.collection("anuncionuevo"),
  },
};
</script>

<style>
</style>