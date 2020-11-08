<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="(images(serieTv) != null && images(serieTv).length > 0) || (posters(serieTv) != null && posters(serieTv).length > 0)">

      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{serieTv.name}}</div>
        <div class="divider"></div>
      </div>      
      

      <div v-if="images(serieTv) != null && images(serieTv).length > 0">

        <div class="subtitulo-seccion terciario-texto">
          <div>Posters</div>
        </div>  

        <!-- CARRUSEL DE POSTERS/IMAGENES -->
        <VuePictureSwipe :items="galleryImages(serieTv, serieTv.name)" v-if="images(serieTv).length < 6"></VuePictureSwipe>
        <CarouselImages id="imagesSerieTv" :imageList = "images(serieTv)" v-else />
       
      </div>
      

      <div v-if="posters(serieTv) != null && posters(serieTv).length > 0">

        <div class="subtitulo-seccion terciario-texto">
          <div>Portadas</div>
        </div> 

        <!-- CARRUSEL DE PORTADAS -->
        <VuePictureSwipe :items="galleryPosters(serieTv, serieTv.name)" v-if="posters(serieTv).length < 6"></VuePictureSwipe>
        <CarouselImages id="portadasSerieTv" :imageList = "posters(serieTv)" v-else />
       
      </div>


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
