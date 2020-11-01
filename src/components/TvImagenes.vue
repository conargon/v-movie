<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="images(serieTv) != null && images(serieTv).length > 0">
      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{serieTv.name}}</div>
        <div class="divider"></div>
      </div>      
      <VuePictureSwipe :items="gallery(serieTv, serieTv.name)" ></VuePictureSwipe>
    </div>
</template>

<script>
import mixins from "./mixins.js";
import VuePictureSwipe from 'vue-picture-swipe';

export default {
  name: "TvImagenes",

  mixins: [mixins],

  props: {
    serieTv: null
  },

  components: {
    VuePictureSwipe
  },  

};
</script>
