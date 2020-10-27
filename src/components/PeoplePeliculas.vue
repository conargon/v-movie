<template>
<div class="row" id="peliculasPeople" v-if="movies != null">
    <!-- PELICULAS -->
    <div class="col s12 m6"> 
        <div class="row">
            <div class="col s12 m4 l3" v-for="(p,i) in movies.results" :key="i">
                <img :src="srcPoster(p)" style="height:300px;" @click.stop="goTo(p)">  
                <p>{{p.title}}</p>
            </div>     
        </div> 
    </div>
</div>  
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "PeoplePeliculas",

  mixins: [mixins],

  props: {
    movies: null
  },

  methods: {
    goTo: function (p) {
      this.$router
        .push({ name: "MovieDetail", params: { idMovie: p.id } })
        .catch(() => {});
    },
  },   

}
</script>