<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="(allImages(serieTv) != null && allImages(serieTv).length > 0)">

      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{serieTv.name}}</div>
        <div class="divider"></div>
      </div>            

      <!-- CARRUSEL DE POSTERS/IMAGENES -->
      <VuePictureSwipe :items="galleryAllImages(serieTv, serieTv.name)" v-if="allImages(serieTv).length < 6"></VuePictureSwipe>
      <CarouselImages id="imagesSerieTv" :imageList = "allImages(serieTv)" v-else />      

    </div>
</template>

<script>
import mixins from "./mixins.js";
import VuePictureSwipe from 'vue-picture-swipe';
import CarouselImages from '@/components/CarouselImages';

export default {
  name: "TvImagenes",

  mixins: [mixins],

  props: {
    serieTv: null
  },

  components: {
    VuePictureSwipe,
    CarouselImages
  },  

};
</script>
