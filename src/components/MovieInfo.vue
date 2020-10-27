<template>
  <!-- INFO -->
  <div class="row seccion">


    <!-- TITULO DE LA PELICULA Y LOGO DE LA PRODUCTORA  -->
    <div class="titulo-seccion">
      <div v-if="srcLogoProductora(movie) != null && srcLogoProductora(movie) != ''">
        <img class="responsive-img" :src="srcLogoProductora(movie)" style="height:48px;" />
      </div>
      <div>{{movie.title}} {{anyoLanzamiento(movie)}}</div>          
      <div class="divider"></div>
    </div>      


    <!-- POSTER -->
    <div class="col s12 l3">
      <img class="responsive-img materialboxed" :src="srcPoster(movie)" :data-caption="movie.title" />
    </div>
    <div class="col s12 l9">
      <ul class="collection">
        <li class="collection-item">Título original: {{tituloOriginal(movie)}}</li>
        <li class="collection-item">Duración: {{movie.runtime}} minutos</li>
        <li class="collection-item">Lanzamiento: {{fechaLanzamiento(movie)}}</li>
        <li class="collection-item">Producción: {{firstCompany(movie).name}}</li>
        <li class="collection-item">Dirección: {{director(movie)[0].name}}</li>
        <li class="collection-item">Valoración: {{movie.vote_average}}</li>
        <li class="collection-item">
          <span v-for="g in movie.genres" :key="g.id">
            <div class="chip green white-text">{{g.name}}</div>
          </span>
        </li>
        <li class="collection-item">
          <blockquote>{{movie.overview}}</blockquote>
        </li>
        <li class="collection-item" v-if="movie.homepage != null && movie.homepage != ''">
          <p>
            Página principal:
            <a :href="movie.homepage" target="_blank" class="text-decoration-none">{{movie.homepage}}</a>
          </p>
        </li>
      </ul>
      <a class="waves-effect waves-light btn red" @click="$router.go(-1)">Volver</a>
    </div>

<!--     <div class="col s12">
      <a class="waves-effect waves-light btn red">Volver</a>
    </div> -->

  </div>
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";

export default {
  name: "MovieInfo",

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

<style scoped>
.cabecera {
  display: flex;
  flex-direction: row;
}
</style>