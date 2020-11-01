<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="images(movie) != null && images(movie).length > 0">
      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{movie.title}}</div>
        <div class="divider"></div>
      </div>      
      <VuePictureSwipe :items="gallery(movie, movie.title)" ></VuePictureSwipe>
    </div>     
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";
import VuePictureSwipe from 'vue-picture-swipe';

export default {
  name: "MovieImagenes",

  mixins: [mixins],

  props: {
    movie: null
  },

  components: {
    VuePictureSwipe
  },

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
  }

}

</script>
