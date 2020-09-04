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

      <!-- MENU DE OPCIONES -->
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
            <v-list-item-icon>
               <v-icon>mdi-home</v-icon>
            </v-list-item-icon>                      
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
          
          <v-list-item @click.stop="dialog = true">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon> 
            </v-list-item-icon>                        
            <v-list-item-title>Opciones</v-list-item-title>
          </v-list-item> 

        </v-list>
      </v-menu>

    </v-app-bar>


    <v-main>
        <router-view :key="$route.fullPath"/>           
    </v-main>  
     

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

    <!-- DIALOGO DE OPCIONES -->
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
        <v-card>
          <v-card-title class="headline">Opciones</v-card-title>
          <v-card-text>
            <v-switch
              v-model="$vuetify.theme.dark"
              hide-details
              inset
              label="Nocturno"
            ></v-switch>        
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <ImagePreview />   

  </v-app>
</template>

<script>
import ImagePreview from "@/components/ImagePreview";

export default {
  name: 'App',

  components: {
    ImagePreview
  },

  props: {
    source: String,
  },

  data: () => ({
    dialog: false,
    searchText: "",
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
