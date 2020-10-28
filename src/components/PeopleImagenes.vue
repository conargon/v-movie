<template>
<div class="row seccion" v-if="imagenes != null && imagenes.profiles.length > 0">
    <!-- IMAGENES -->
    <div class="titulo-seccion secundario-texto">
      <div>Imágenes de {{nombre}}</div>
      <div class="divider"></div>
    </div>        
    <div class="col s12 l3 xl2" v-for="(p,i) in imagenes.profiles" :key="i">
        <div class="card hoverable">
          <div class="card-image">
            <img class="responsive-img materialboxed" :src="srcImage(p)" :data-caption="nombre"/>
          </div>
        </div>           
    </div>    
</div>  
</template>

<script>
import M from "materialize-css";
import mixins from "./mixins.js";

export default {
  name: "PeopleImagenes",

  mixins: [mixins],

  props: {
    imagenes: null,
    nombre: null
  },

  mounted() {
    const imgLightBox2 = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox2, {
      inDuration: 500,
      outDuration: 500
    });    
  }

}
</script>