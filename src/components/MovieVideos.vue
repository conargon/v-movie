<template>
  <!-- VIDEOS -->
  <div class="row seccion" v-if="videos(movie) != null && videos(movie).length > 0">
    <div class="titulo-seccion secundario-texto">
      <div>Videos de {{movie.title}}</div>
      <div class="divider"></div>
    </div>
    <div class="col s12 l6" v-for="(p,i) in videos(movie)" :key="i">
      <div class="video-container">
        <iframe
          width="853"
          height="480"
          :src="`//www.youtube.com/embed/${p.key}?rel=0`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "MovieVideos",

  mixins: [mixins],

  props: {
    movie: null
  }
};
</script>
