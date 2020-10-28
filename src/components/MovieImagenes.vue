<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="images(movie) != null && images(movie).length > 0">
      <div class="titulo-seccion">
        <div>Imágenes</div>
        <div class="divider"></div>
      </div>      
      <div class="col s6 l4" v-for="(p,i) in images(movie)" :key="i">
          <div class="card hoverable">
            <div class="card-image">
              <img class="responsive-img materialboxed" :src="srcImage(p)" />
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";

export default {
  name: "MovieImagenes",

  mixins: [mixins],

  props: {
    movie: null
  },

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
  }
};
</script>
