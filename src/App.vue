<template>
  <v-app id="inspire">

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
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

      <v-spacer></v-spacer>
      <v-btn icon @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>      

    </v-app-bar>


    <v-main>
        <router-view :key="$route.fullPath"/> 
    </v-main>  
        
    <v-footer
      dark
      padless
      absolute
      app
      class="indigo lighten-1 center"
    >
      <v-card
        flat
        tile
        fluid
        class="indigo lighten-1 white--text text-center"
        style="width:100%"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>© Constantino Argüello González</strong>
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
