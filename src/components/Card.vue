<template>
  <v-container grid-list="md">
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card color="warning" class="headline white--text text-center">
        <h3>
          ¿Eliminar El Anuncio?
     </h3>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="cancelarEliminar()">
           No, <v-icon>mdi-cancel</v-icon>
          </v-btn>
          <v-btn color="error" dark @click="eliminar()">
            Si,<v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row wrap>
      <v-col
        xs="12"
        sm="12"
        md="4"
        lg="4"
        v-for="(item, index) in listaAnuncios"
        :key="index"
      >
        <SnackbarWish></SnackbarWish>

        <v-hover v-slot="{ hover }">
          <v-card color="grey lighten-4" max-width="600" class="mb-6 mx-auto">
            <v-spacer></v-spacer>
            <v-btn  absolute
                color="orange"
                class="white--text"
                fab
                small
                left
                top @click="accionaEditar(item)">
              <v-icon dark color="black">mdi-pencil</v-icon>
            </v-btn>

            <v-btn  absolute
                color="orange"
                class="white--text"
                fab
                small
                right
                top @click="accionaEliminar(item)">
              <v-icon dark color="black">mdi-delete</v-icon>
            </v-btn>
            <v-carousel
              cycle
              height="400"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(item, index) in imagenes"
                :key="index"
                cols="2"
                class="d-flex child-flex elevation-5"
              >
                <v-img :src="item">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%"
                    >
                    
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <v-card-text class="pt-6" style="position: relative">
              <v-btn
                absolute
                color="orange"
                class="white--text"
                fab
                large
                right
                top
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
              <v-btn
                absolute
                color="orange"
                class="white--text"
                fab
                large
                left
                top
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <div class="font-weight-light text-center grey--text title mb-2">
                Titulo:{{ item.titulo }}
              </div>
              <h3 class="font-weight-light text-center grey--text title mb-2">
                Descripción:{{ item.descripcion }}
              </h3>
              <div class="font-weight-light text-center grey--text title mb-2">
                Precio $:{{ item.precio }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <span class="grey--text text--lighten-2 caption mr-2">
                ({{ rating }})
              </span>
              <v-rating
                v-model="rating"
                background-color="teal lighten-3"
                color="orange"
                length="5"
                size="18"
                value="3"
              ></v-rating>
            </v-card-actions>
          </v-card>
        </v-hover>

        <!--
        <v-card class="mb-6">
          <v-card-title
            >WishList<v-btn icon @click="snackWishabierta">
              <v-icon color="red">mdi-heart</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="accionaEditar(item)">
              <v-icon dark color="black">mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon @click="accionaEliminar(item)">
              <v-icon dark color="black">mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item, index) in imagenes"
              :key="index"
              cols="2"
              class="d-flex child-flex elevation-5"
            >
              <v-img :src="item"></v-img>
            </v-carousel-item>
          </v-carousel>

          <v-card-subtitle> Titulo:{{ item.titulo }} </v-card-subtitle>
          <v-card-subtitle> Descripción:{{ item.descripcion }}</v-card-subtitle>
          <v-card-subtitle> Precio $:{{ item.precio }}</v-card-subtitle>
          <v-card-actions>
            <v-btn class="teal lighten-3">
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
                />
              </svg>
              Agregar</v-btn
            >
            <v-spacer></v-spacer>
            <span class="grey--text text--lighten-2 caption mr-2">
              ({{ rating }})
            </span>
            <v-rating
              v-model="rating"
              background-color="teal lighten-3"
              color="warning"
              
           
              half-icon="$mdiHeartHalfFull"
              length="5"
              size="18"
              value="3"
            ></v-rating>
          </v-card-actions>
          <v-expand-transition> </v-expand-transition>
        </v-card>
        -->
      </v-col>
    </v-row>

    <div class="text-center">
      <v-row justify="center">
        <v-dialog scrollable v-model="dialogEdit" width="350px" persistent>
          <v-card hover light max-height="350">
            <v-card-title class="warning">
              Editando Anuncio
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-file-input
                  chips
                  counter
                  show-size
                  truncate-length="50"
                  v-model="archivo"
                  required
                  label="Fotos del anuncio"
                ></v-file-input>
                <v-text-field
                  append-icon="mdi-attachment"
                  v-model="titulo"
                  :counter="20"
                  :rules="nombreRules"
                  label="Titulo del anuncio"
                  required
                ></v-text-field>
                <v-textarea
                  rows="2"
                  append-icon="mdi-message"
                  v-model="descripcion"
                  :counter="50"
                  :rules="descripcionRules"
                  label="Descripcion"
                  required
                >
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
              
      
              <v-btn
                color="success"
                dark
                @click="cancelarEditar">
                No, <v-icon>mdi-cancel</v-icon>
                </v-btn>
                <v-btn color="error" @click="editar()" dark>
                  
                   Si, <v-icon>mdi-shield-check</v-icon>
                  
                  </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="4"
        circle
        color="teal lighten-3"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { storage } from "../db";
import { mapState, mapMutations } from "vuex";
import SnackbarWish from "./SnackbarWish.vue";
import { db } from "../db";
export default {
  name: "Card",
  components: {
    SnackbarWish,
  },
  data() {
    return {
      page: 1,
      rating: 4.3,
      imagenes: [],
      valid: true,
      archivo: null,
      titulo: "",
      descripcion: "",
      precio: null,
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
      listaAnuncios: [],
      itemEditar: "",
      snackbar: false,
      dialogDelete: false,
      itemEliminar: "",
      dialogEdit: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  firestore: {
    listaAnuncios: db.collection("anuncionuevo"),
  },
  computed: {
    ...mapState(["dialogAnuncio", "snackbarWish", "text", "timeout"]),
  },
  created() {
    this.leerImagenes();
  },
  methods: {
    subirImagen() {
      const ref = storage.ref();
      const carpeta = "imagenPrueba";
      const archivoRef = ref.child(carpeta + "/" + this.archivo.name);

      archivoRef.put(this.archivo).then(function (snapshot) {
        console.log("Uploaded a blob or file!");
        console.log(snapshot);
      });
    },
    leerImagenes() {
      const ref = storage.ref();
      const carpeta = "imagenPrueba";
      var this2 = this;
      ref
        .child(carpeta + "/")
        .listAll()
        .then(function (result) {
          result.items.forEach(function (imgRef) {
            imgRef.getDownloadURL().then(function (url) {
              this2.imagenes.push(url);
            });
          });
        });
    },
    accionaEliminar(item) {
      this.itemEliminar = item.id;
      console.log(this.itemEliminar);
      this.dialogDelete = true;
    },
    cancelarEliminar() {
      this.dialogDelete = false;
    },
    cancelarEditar() {
      this.dialogEdit = false;
    },

    ...mapMutations(["snackWishabierta", "snackWishcerrada"]),

    accionaEditar(item) {
      this.itemEditar = item.id;
      this.dialogEdit = true;
      this.titulo = item.titulo;
      this.descripcion = item.descripcion;
      this.precio = item.precio;
      this.itemEditar = item;
    },

    editar() {
      var thisVue = this;
      this.itemEditar.titulo = this.titulo;
      this.itemEditar.descripcion = this.descripcion;
      this.itemEditar.precio = this.precio;
      console.log(this.itemEditar.id);
      var editandoDoc = db.collection("anuncionuevo").doc(this.itemEditar.id);

      return editandoDoc
        .update({
          titulo: this.titulo,
          descripcion: this.descripcion,
          precio: this.precio,
        })
        .then(function () {
          console.log("Document successfully updated!");
          thisVue.cancelarEditar();
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    eliminar() {
      var thisVue = this;
      console.log("Mag me borraron");
      db.collection("anuncionuevo")
        .doc(this.itemEliminar)
        .delete()
        .then(function () {
          console.log("Se Borro Exitosamente!");
          thisVue.cancelarEliminar();
        })
        .catch(function (error) {
          console.error("Error Removiendo El Anuncio: ", error);
        });
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>