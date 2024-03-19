<template>
<div class="row seccion" v-if="person != null && person.images != null && person.images.profiles != null && person.images.profiles.length > 0">
    <!-- IMAGENES -->
    <div class="titulo-seccion secundario-texto">
      <div>Imágenes de {{person.name}}</div>
      <div class="divider"></div>
    </div>        
    <VuePictureSwipe :items="imagesPeople"  v-if="person.images.profiles.length < 6"></VuePictureSwipe>
     <CarouselImages id="postersPeople" :imageList = "person.images.profiles" v-else />
</div>  
</template>

<script>
import M from "materialize-css";
import mixins from "./mixins.js";
import VuePictureSwipe from 'vue-picture-swipe';
import CarouselImages from '@/components/CarouselImages';

export default {
  name: "PeopleImagenes",

  mixins: [mixins],

  props: {
    person: null,
  },

  components: {
    VuePictureSwipe,
    CarouselImages
  },
  
  computed: {
    imagesPeople: {
      get() {
        let result = this.person != null && this.person.images != null ? this.person.images.profiles: null;
        if(result != null) {
          result = result.map(e => ({
              src: 'http://image.tmdb.org/t/p/original' + e.file_path,
              thumbnail: 'http://image.tmdb.org/t/p/w300' + e.file_path,
              w : e.width,
              h: e.height,
              title: this.nombre,
              alt: this.nombre
            })
          );        
          return result;
        } else {
          return [];
        }
    }
  }},  

  mounted() {
    const imgLightBox2 = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox2, {
      inDuration: 500,
      outDuration: 500
    });    
  }

}
</script>