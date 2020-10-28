<template>
<div class="row seccion" v-if="movies != null">

    <!-- PELICULAS -->
    <div class="titulo-seccion secundario-texto">
      <div>Películas de {{nombre}}</div>
      <div class="divider"></div>
    </div>         

    <div class="col s12 m3 l2" v-for="(p,i) in movies.results" :key="i">
      <div class="card medium hoverable">
        <div class="card-image">
          <img class="responsive-img" :src="srcPoster(p)" @click.stop="goTo(p)" />
        </div>
      </div>
      <div class="center-align">
         <p class="pelicula">{{p.title}}</p>
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
    movies: null,
    nombre: null
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


<style scoped>
.col p {
  /* font-size: 0.8em; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pelicula {
  font-weight: bold;  
}

.card-content {
  padding: 4px;
}

.card-action {
  padding: 8px 24px;
  font-size: 0.8em;
}

.card.medium .card-image {
  max-height: 100%;
  cursor: pointer;
  margin: auto;
}
</style>