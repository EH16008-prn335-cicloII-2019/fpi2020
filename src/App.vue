<template>
  <v-app>
    <v-app-bar app class="line" flat md="4" cols="12">
  
    
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title
        class="title mr-6 hidden-sm-and-down text-uppercase red--text"
      >
        Tienda Online</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-autocomplete
        width="50"
        v-model="model"
        :items="itemss"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label=" Buscar ..."
        solo-inverted
        error
      >
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left> mdi-bitcoin </v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="primary"
            class="headline font-weight-light white--text"
          >
            {{ item.name.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>

      <v-btn class="hidden-sm-and-down" icon @click="snackbar = true">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="openFormUser">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
          />
        </svg>
      </v-btn>

      <v-btn icon>
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
          />
        </svg>
      </v-btn>
      <template v-slot:extension>
        <v-btn fab bottom right small absolute @click="openFormNuevoAnuncio">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" absolute temporary >
      <v-list flat>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Salir de la cuenta </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <Card></Card>
      <FormUser></FormUser>
      <NuevoAnuncio></NuevoAnuncio>
      <Snackbar></Snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { db } from "./db";
import { mapMutations, mapState } from "vuex";
import Card from "./components/Card.vue";
import FormUser from "./components/FormUser.vue";
import NuevoAnuncio from "./components/NuevoAnuncio.vue";
import Snackbar from "./components/Snackbar.vue";
export default {
  name: "App",
  components: {
    Card,
    FormUser,
    NuevoAnuncio,
    Snackbar,
  },

  data: () => ({
    anuncionuevo: [],
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    isLoading: false,
    itemss: [],
    model: null,
    search: null,
    tab: null,
    items: [
      { title: "Tienda Online", icon: "mdi-cellphone" },
      { title: "Cuenta", icon: "mdi-account-box" },
      { title: "Administrador", icon: "mdi-gavel" },
    ],
    drawer: false,
    group: null,
    show: false,
  }),
  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {
      // Items have already been loaded
      if (this.itemss.length > 0) return;

      this.isLoading = true;
      console.log(val);

      // Lazily load input items
      fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.clone().json())
        .then((res) => {
          this.itemss = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  computed: {
    ...mapState(["dialog", "snackbar", "text", "timeout", "dialogAnuncio"]),
  },
  methods: {
    ...mapMutations([
      "openFormUser",
      "closeFormUser",
      "snackabierta",
      "snackcerrada",
      "openFormNuevoAnuncio",
      "closeFormNuevoAnuncio",
    ]),
  },
  firestore: {
    anuncionuevo: db.collection("anuncionuevo"),
  },
};
</script>
