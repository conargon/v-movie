<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="(allImages(movie) != null && allImages(movie).length > 0)">

      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{movie.title}}</div>
        <div class="divider"></div>
      </div>      

      <!-- CARRUSEL DE POSTERS/IMAGENES -->
      <VuePictureSwipe :items="galleryAllImages(movie, movie.title)" v-if="allImages(movie).length < 6"></VuePictureSwipe>
      <CarouselImages id="images" :imageList = "allImages(movie)" v-else />      

    </div>     
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";
import VuePictureSwipe from 'vue-picture-swipe';
import CarouselImages from '@/components/CarouselImages';

export default {
  name: "MovieImagenes",

  mixins: [mixins],

  props: {
    movie: null
  },

  components: {
    VuePictureSwipe,
    CarouselImages
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
