<template>
  <v-app id="inspire">

    <v-app-bar      
      app
      color="blue darken-3"
      dense
    >

      <img src="imdb.svg" width="80" class="mr-4"/>

      <v-text-field
        flat
        solo-inverted
        hide-details
        dense
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Búsqueda de peliculas"        
        ref="inputSearch"
        v-model="searchText"
        @keydown.enter="onEnterSearch"
      >
      </v-text-field>

      <v-menu
        bottom
        left
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
          @click="goHome"
          >
            <v-icon>mdi-home</v-icon>            
            <v-list-item-title>&nbsp;Inicio</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      jumbotron
      style="height: 100%;"
    >
      <v-main>
          <router-view :key="$route.fullPath"/>        
      </v-main>  
    </v-parallax>

    <v-footer
      dark
      padless
      absolute
      app
      color="blue darken-3"
    >
      <v-card
        flat
        tile
        fluid
        class="text-center"
        color="blue darken-3"
        style="width:100%"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>&copy; Constantino Argüello González</strong>
        </v-card-text>
      </v-card>
    </v-footer>


  </v-app>
</template>

<script>

export default {
  name: 'App',

  props: {
    source: String,
  },

  data: () => ({
    dialog: false,
    drawer: null,
    searchText: "",
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],       
  }),
  methods: {
    onEnterSearch:function() {  
      this.$router.push({ name: 'MovieSearch', params: { searchText : this.searchText } }).catch(()=>{});
    },
    goHome: function() {
      this.searchText = '';
      this.$router.push({ name : 'Home' }).catch(()=>{});

    },
  }
};
</script>
