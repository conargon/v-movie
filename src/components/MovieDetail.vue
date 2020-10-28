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

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating red" href="#infoMovie"><i class="material-icons">movie</i></a></li>
        <li><a class="btn-floating yellow darken-1" href="#repartoMovie"><i class="material-icons">person</i></a></li>
        <li><a class="btn-floating green" href="#imagenesMovie"><i class="material-icons">image</i></a></li>
        <li><a class="btn-floating blue" href="#videosMovie"><i class="material-icons">videocam</i></a></li>
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

  data: function() {
    return {
      instance: null
    };
  },

  props: {
    movie: null
  },

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
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
  color: rgb(238, 110, 115); 
  margin-bottom: 40px; 
}

.titulo-seccion .divider {
  height: 4px;
  background-color: rgb(238, 110, 115);
}
</style>