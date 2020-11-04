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
        <div class="marco-carrusel" v-else>
          <button role="button" id="flecha-izquierda" class="flecha-izquierda" @click.stop="scrollLeft">
            <i class="material-icons small" style="vertical-align: middle"
              >navigate_before</i
            >
          </button>
          <div ref ="images_pelicula" class="contenedor-carrusel">
            <div class="carrusel">
              <div class="item-carrusel item-carrusel-2x" v-for="(p,i) in images(movie)" :key="i">
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


      <div v-if="posters(movie) != null && posters(movie).length > 0">
      
        <div class="subtitulo-seccion terciario-texto">
          <div>Portadas</div>
        </div> 

        <!-- CARRUSEL DE PORTADAS -->
        <VuePictureSwipe :items="galleryPosters(movie, movie.title)" v-if="posters(movie).length < 6"></VuePictureSwipe>
        <div class="marco-carrusel" v-else>
          <button role="button" id="flecha-izquierda" class="flecha-izquierda" @click.stop="scrollLeftPosters">
            <i class="material-icons small" style="vertical-align: middle"
              >navigate_before</i
            >
          </button>
          <div ref ="posters_pelicula" class="contenedor-carrusel">
            <div class="carrusel">
              <div class="item-carrusel" v-for="(p,i) in posters(movie)" :key="i">
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

  methods: {
    scrollRight: function() {
      this.$refs.images_pelicula.scrollLeft += this.$refs.images_pelicula.offsetWidth;
    },
    scrollLeft: function() {
      this.$refs.images_pelicula.scrollLeft -= this.$refs.images_pelicula.offsetWidth;
    },  
    scrollRightPosters: function() {
      this.$refs.posters_pelicula.scrollLeft += this.$refs.posters_pelicula.offsetWidth;
    },
    scrollLeftPosters: function() {
      this.$refs.posters_pelicula.scrollLeft -= this.$refs.posters_pelicula.offsetWidth;
    },      
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
