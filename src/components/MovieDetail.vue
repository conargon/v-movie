<template>
  <div class="container">
    <div class="card" v-if="movie != null">
      <div class="card-content">
        <MovieInfo :movie="movie" id="infoMovie" />
        <MovieReparto :movie="movie" id="repartoMovie" />
        <MovieImagenes :movie="movie" id="imagenesMovie" />
        <MovieVideos :movie="movie" id="videosMovie" />
      </div>
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
  font-size: 1.7em;
  font-weight: bold;
  color: rgb(238, 110, 115); 
  margin-bottom: 40px; 
}

.titulo-seccion .divider {
  height: 4px;
  background-color: rgb(238, 110, 115);
}
</style>