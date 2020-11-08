<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="(images(movie) != null && images(movie).length > 0)  || (posters(movie) != null && posters(movie).length > 0)">

      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{movie.title}}</div>
        <div class="divider"></div>
      </div>      


      <div v-if="images(movie) != null && images(movie).length > 0">
      
        <div class="subtitulo-seccion terciario-texto">
          <div>Posters</div>
        </div>  

        <!-- CARRUSEL DE POSTERS/IMAGENES -->
        <VuePictureSwipe :items="galleryImages(movie, movie.title)" v-if="images(movie).length < 6"></VuePictureSwipe>
        <CarouselImages id="images" :imageList = "images(movie)" v-else />
       
      </div>


      <div v-if="posters(movie) != null && posters(movie).length > 0">
      
        <div class="subtitulo-seccion terciario-texto">
          <div>Portadas</div>
        </div> 

        <!-- CARRUSEL DE PORTADAS -->
        <VuePictureSwipe :items="galleryPosters(movie, movie.title)" v-if="posters(movie).length < 6"></VuePictureSwipe>
        <CarouselImages id="posters" :imageList = "posters(movie)" v-else />
        
      </div>

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
