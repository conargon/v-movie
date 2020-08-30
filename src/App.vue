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
    
     <!-- <v-toolbar-title
      >
      <v-img src="imdb.svg" width="64" :contain="true"></v-img>
        <span>Filmoteca</span>
      </v-toolbar-title> -->

      <v-text-field
        flat
        solo-inverted
        hide-details
        dense
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Búsqueda de peliculas"        
        ref="inputSearch"
        @keydown.enter="onEnterSearch"
      >
      <!--class="hidden-sm-and-down"-->
      </v-text-field>

      <v-spacer></v-spacer>
      <v-btn icon @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>      

      <!--
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img></v-avatar>
      </v-btn>
      -->


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
    /*items: [
      { icon: 'mdi-contacts', text: 'Contacts' },
      { icon: 'mdi-history', text: 'Frequently contacted' },
      { icon: 'mdi-content-copy', text: 'Duplicates' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Labels',
        model: true,
        children: [
          { icon: 'mdi-plus', text: 'Create label' },
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' },
        ],
      },
      { icon: 'mdi-cog', text: 'Settings' },
      { icon: 'mdi-message', text: 'Send feedback' },
      { icon: 'mdi-help-circle', text: 'Help' },
      { icon: 'mdi-cellphone-link', text: 'App downloads' },
      { icon: 'mdi-keyboard', text: 'Go to the old version' },
    ],*/
  }),
  methods: {
    onEnterSearch:function() {  
      //console.log(this.$refs.inputSearch);
      ///this.searchText = this.$refs.inputSearch.$refs.input.value;
      //this.$refs.cardGrid.searchMovies(this.searchText);
      var valueSearchText = this.$refs.inputSearch.$refs.input.value;
      this.$router.push({ name: 'MovieSearch', params: { searchText : valueSearchText } }).catch(()=>{});
    },
    goHome: function() {
      this.clearinputSearch();
      this.$router.push({ name : 'Home' }).catch(()=>{});

    },
    clearinputSearch: function() {
       this.$refs.inputSearch.$refs.input.value = "";
    }
  }
};
</script>
