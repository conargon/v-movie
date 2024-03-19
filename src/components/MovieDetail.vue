<template>
  <div class="container" v-if="movie != null">

    <!-- INFO DE LA PELI --> 
    <div>
      <MovieInfo :movie="movie" id="infoMovie" />
      <MovieReparto :movie="movie" id="repartoMovie" />
      <MovieImagenes :movie="movie" id="imagenesMovie" ref="imagenesMovie" />
      <MovieVideos :movie="movie" id="videosMovie" />
    </div>

    <!-- BOTONERA -->
    <div id="btnFab" class="fixed-action-btn">
      <a class="btn-floating btn-large secundario" @click="openFab">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#infoMovie'" title="Ficha"><i class="material-icons">theaters</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#repartoMovie'" title="Reparto"><i class="material-icons">person</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#imagenesMovie'" title="Imágenes"><i class="material-icons">image</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#videosMovie'" title="Trailers"><i class="material-icons">videocam</i></a></li>
        <li><a class="btn-floating terciario" href="#" @click.stop="$router.back()" title="Volver"><i class="material-icons">keyboard_backspace</i></a></li>        
      </ul>
    </div>

  </div>
</template>

<script>
import MovieInfo from "./MovieInfo";
import MovieReparto from "./MovieReparto";
import MovieImagenes from "./MovieImagenes";
import MovieVideos from "./MovieVideos";
import mixins from "./mixins.js";
import M from "materialize-css";

export default {
  name: "MovieDetail",

  components: {
    MovieInfo,
    MovieReparto,
    MovieImagenes,
    MovieVideos
  },

  mixins: [mixins],

  props: {
    movie: null
  },

  methods: {
    openFab() {
      let elem = document.getElementById("btnFab");
      var instance = M.FloatingActionButton.getInstance(elem);
      if(instance == undefined) {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
        instance = M.FloatingActionButton.getInstance(elem);
      }
      instance.open();
    }
  },

  mounted() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
      hoverEnabled: false
    });    
  }
};
</script>

<style scoped>
.container {
    width: 100%;
    padding: 0;
    margin: 0;
    max-width: initial;
}
</style>