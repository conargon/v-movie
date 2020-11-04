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
        <div class="marco-carrusel" v-else>
          <button role="button" id="flecha-izquierda" class="flecha-izquierda" @click.stop="scrollLeft">
            <i class="material-icons small" style="vertical-align: middle"
              >navigate_before</i
            >
          </button>
          <div ref ="images_serie" class="contenedor-carrusel">
            <div class="carrusel">
              <div class="item-carrusel item-carrusel-2x" v-for="(p,i) in images(serieTv)" :key="i">
                  <img
                    class="hoverable materialboxed"
                    :src="srcImageOriginal(p)"
                  />               
              </div>
            </div>
          </div>
          <button role="button" id="flecha-derecha" class="flecha-derecha" @click.stop="scrollRight">
            <i class="material-icons small" style="vertical-align: middle"
              >navigate_next</i
            >
          </button>
        </div>

      </div>
      

      <div v-if="posters(serieTv) != null && posters(serieTv).length > 0">

        <div class="subtitulo-seccion terciario-texto">
          <div>Portadas</div>
        </div> 

        <!-- CARRUSEL DE PORTADAS -->
        <VuePictureSwipe :items="galleryPosters(serieTv, serieTv.name)" v-if="posters(serieTv).length < 6"></VuePictureSwipe>
        <div class="marco-carrusel" v-else>
          <button role="button" id="flecha-izquierda" class="flecha-izquierda" @click.stop="scrollLeftPosters">
            <i class="material-icons small" style="vertical-align: middle"
              >navigate_before</i
            >
          </button>
          <div ref ="posters_serie" class="contenedor-carrusel">
            <div class="carrusel">
              <div class="item-carrusel" v-for="(p,i) in posters(serieTv)" :key="i">
                  <img
                    class="hoverable materialboxed"
                    :src="srcImage(p)"
                  />               
              </div>
            </div>
          </div>
          <button role="button" id="flecha-derecha" class="flecha-derecha" @click.stop="scrollRightPosters">
            <i class="material-icons small" style="vertical-align: middle"
              >navigate_next</i
            >
          </button>
        </div>  

      </div>


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

  methods: {
    scrollRight: function() {
      this.$refs.images_serie.scrollLeft += this.$refs.images_serie.offsetWidth;
    },
    scrollLeft: function() {
      this.$refs.images_serie.scrollLeft -= this.$refs.images_serie.offsetWidth;
    },  
    scrollRightPosters: function() {
      this.$refs.posters_serie.scrollLeft += this.$refs.posters_serie.offsetWidth;
    },
    scrollLeftPosters: function() {
      this.$refs.posters_serie.scrollLeft -= this.$refs.posters_serie.offsetWidth;
    },      
  },  

};
</script>
