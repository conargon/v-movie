<template>
    <!-- IMAGENES -->
    <div class="row seccion" v-if="images(serieTv) != null && images(serieTv).length > 0">
      <div class="titulo-seccion secundario-texto">
        <div>Imágenes de {{serieTv.name}}</div>
        <div class="divider"></div>
      </div>      
      <div class="col s12 l4" v-for="(p,i) in images(serieTv)" :key="i">
          <div class="card hoverable">
            <div class="card-image">
              <img class="responsive-img materialboxed" :src="srcImage(p)" :data-caption="serieTv.title" />
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import mixins from "./mixins.js";
// import M from "materialize-css";

export default {
  name: "TvImagenes",

  mixins: [mixins],

  props: {
    serieTv: null
  },

  // mounted() {
  //   const imgLightBox = document.querySelectorAll(".materialboxed");
  //   M.Materialbox.init(imgLightBox, {
  //     inDuration: 500,
  //     outDuration: 500
  //   });
  // }
};
</script>
