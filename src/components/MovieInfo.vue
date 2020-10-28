<template>
  <!-- INFO -->
  <div class="row seccion">

    <!-- TITULO DE LA PELICULA Y LOGO DE LA PRODUCTORA  -->
    <div class="titulo-seccion secundario-texto">
      <div v-if="srcLogoProductora(movie) != null && srcLogoProductora(movie) != ''">
        <img class="responsive-img right" :src="srcLogoProductora(movie)" style="height:48px;margin-left:40px;margin-right:20px;" />
      </div>
      <div>{{movie.title}} {{anyoLanzamiento(movie)}}</div>          
      <div class="divider"></div>
    </div>      

    <!-- POSTER -->
    <div class="col s12 m3">
      <img class="responsive-img materialboxed poster" :src="srcPoster(movie)" :data-caption="movie.title" />
    </div>

    <!-- FICHA -->
    <div class="col s12 m9">
      <ul class="collection">      
        <li class="collection-item"><div v-html="`Título original: <strong> ${tituloOriginal(movie)} </strong>`"/></li>        
        <li class="collection-item"><div v-html="`Duración: <strong>${movie.runtime} minutos</strong>`"/></li>
        <li class="collection-item"><div v-html="`Lanzamiento: <strong>${fechaLanzamiento(movie)}</strong>`"/></li>
        <li class="collection-item"><div v-html="`Producción: <strong>${firstCompany(movie).name}</strong>`"/></li>
        <li class="collection-item"><div v-html="`Dirección: <strong>${director(movie)[0].name}</strong>`"/></li>       
        <li class="collection-item" v-if="movie.homepage != null && movie.homepage != ''">
          <p>
            Página principal:
            <a :href="movie.homepage" target="_blank" class="text-decoration-none">{{movie.homepage}}</a>
          </p>
        </li>           
        <li class="collection-item">Valoración:
          <div style="display:inline; vertical-align: middle;">
              <i class="material-icons tiny secundario-texto text-lighten-1" v-for="i in Math.round(movie.vote_average/2)" :key="i">star</i>
          </div>
           <strong>&nbsp;{{movie.vote_average}}</strong>
        </li>
        <li class="collection-item">
          Temática:&nbsp;&nbsp;&nbsp; 
          <span v-for="g in movie.genres" :key="g.id">
            <div class="chip green white-text">{{g.name}}</div>
          </span>
        </li>
        <li class="collection-item">
          <blockquote>{{movie.overview}}</blockquote>
        </li>
      </ul>
    </div>
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
.titulo-seccion {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 40px; 
}

.poster {
  border-radius: 8px;
}
</style>