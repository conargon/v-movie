<template>
  <div class="container" v-if="serieTv != null">

    <!-- INFO DE LA SERIE--> 
    <div>
      <TvInfo :serieTv="serieTv" id="infoSerieTv" />
      <TvSeasons :serieTv="serieTv" id="seasonsSerieTv" />
      <TvReparto :serieTv="serieTv" id="creditsSerieTv" />
      <TvImagenes :serieTv="serieTv" id="imageneSerieTv" />
      <TvVideos :serieTv="serieTv" id="videosSerieTv" /> 
    </div> 

    <!-- BOTONERA -->
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large secundario">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#infoSerieTv'" title="Ficha"><i class="material-icons">tv</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#seasonsSerieTv'" title="Temporadas"><i class="material-icons">extension</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#creditsSerieTv'" title="Reparto"><i class="material-icons">person</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#imageneSerieTv'" title="Imágenes"><i class="material-icons">image</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#videosSerieTv'" title="Videos"><i class="material-icons">videocam</i></a></li>
        <li><a class="btn-floating terciario" href="#" @click.stop="$router.back()" title="Volver"><i class="material-icons">keyboard_backspace</i></a></li>
      </ul>
    </div>

  </div>
</template>

<script>
import TvInfo from "./TvInfo";
import TvSeasons from "./TvSeasons";
import TvReparto from "./TvReparto";
import TvImagenes from "./TvImagenes";
import TvVideos from "./TvVideos";
import mixins from "./mixins.js";
import M from "materialize-css";

export default {
  name: "TvDetail",

  components: {
    TvInfo,
    TvReparto,
    TvSeasons,
    TvImagenes,
    TvVideos
  },

  mixins: [mixins],

  props: {
    serieTv: null
  },

  mounted() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {});    
  }
};
</script>

<style scoped>
.container {
    width: 100%;
    padding: 0;
    margin: 0;
    max-width: initial;
}
</style>
