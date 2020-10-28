<template>
  <div class="container">

    <!-- INFO DE LA PELI --> 
    <div class="card" v-if="movie != null">     
      <div class="card-content">
        <MovieInfo :movie="movie" id="infoMovie" />
        <MovieReparto :movie="movie" id="repartoMovie" />
        <MovieImagenes :movie="movie" id="imagenesMovie" />
        <MovieVideos :movie="movie" id="videosMovie" />
      </div>

    </div>

    <!-- BOTONERA -->
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large secundario">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating terciario" href="#" @click="window.goTo(0,0)" title="Ficha"><i class="material-icons">movie</i></a></li>
        <li><a class="btn-floating terciario" href="#repartoMovie" title="Reparto"><i class="material-icons">person</i></a></li>
        <li><a class="btn-floating terciario" href="#imagenesMovie" title="Imágenes"><i class="material-icons">image</i></a></li>
        <li><a class="btn-floating terciario" href="#videosMovie" title="Trailers"><i class="material-icons">videocam</i></a></li>
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

  mounted() {
/*     const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    }); */
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {});    
  }
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: initial;
  margin-bottom: 100px;
}
</style>

<style>

.seccion {
  padding: 20px;  
}

.titulo-seccion {
  font-size: 1.5em;
  font-weight: bold; 
  margin-bottom: 40px; 
}

.titulo-seccion .divider {
  height: 4px;
  background-color: #01b4e4;
}
</style>