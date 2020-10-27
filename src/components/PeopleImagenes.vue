<template>
<div class="row" id="imagenesPeople" v-if="images != []">
    <!-- IMAGENES -->
    <div class="col s12 m6"> 
        <div class="row">
            <div class="col s12 m4 l3" v-for="(p,i) in getImages" :key="i">
                <img :src="srcImage(p)" style="height:300px;">  
            </div>     
        </div> 
    </div>
</div>  
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "PeopleImagenes",

  mixins: [mixins],

  props: {
    profiles: null
  },

  computed: {
    getImages() {
      return this.profiles != null ? this.profiles.profiles : [];
    }
  }

}
</script>