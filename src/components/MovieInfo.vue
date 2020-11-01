<template>
  <!-- INFO -->
  <div class="row seccion">

    <!-- TITULO DE LA PELICULA Y LOGO DE LA PRODUCTORA  -->
    <div class="titulo-seccion secundario-texto">
      <div v-if="srcLogoProductora(movie) != null && srcLogoProductora(movie) != ''">
        <img class="responsive-img right" :src="srcLogoProductora(movie)" style="height:48px;margin-left:40px;margin-right:20px;" />
      </div>
      <div><i class="material-icons medium" style="vertical-align: middle;">theaters</i>{{movie.title}} {{anyoLanzamiento(movie)}}</div>          
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
        <li class="collection-item" v-if="firstCompany(movie) != ''"><div v-html="`Producción: <strong>${firstCompany(movie).name}</strong>`"/></li>
        <li class="collection-item" v-if="director(movie) != null && director(movie).length > 0">
          Dirección: <a href='#' @click="goToCreditPerson(director(movie)[0].credit_id)"><strong>{{director(movie)[0].name}}</strong></a>
        </li>       
        <li class="collection-item" v-if="movie.homepage != null && movie.homepage != ''">
          <p>
            Página principal:
            <a :href="movie.homepage" target="_blank" class="text-decoration-none"><strong>{{movie.homepage}}</strong></a>
          </p>
        </li>           
        <li class="collection-item">Valoración:
          <div style="display:inline; vertical-align: middle;">
              <i class="material-icons tiny" :style="i<=Math.round(movie.vote_average/2) ? 'color:#fdd835' : 'color:#424242'" 
                  v-for="i in 5" :key="i">star</i>
          </div>
           <strong>&nbsp;{{movie.vote_average}}</strong>
        </li>
        <li class="collection-item">
          Temática:&nbsp;&nbsp;&nbsp; 
          <span v-for="g in movie.genres" :key="g.id">
            <div class="chip green white-text">{{g.name}}</div>
          </span>
        </li>
        <li class="collection-item" v-if="movie.overview != ''">
          <blockquote>
            <p><strong>{{movie.tagline}}</strong></p>
            <br>
            <p>{{movie.overview}}</p>
            </blockquote>
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

  methods: {
        goToCreditPerson: function(credit_id) {
            this.$router
                .push({ name: "PeopleDetail", params: { type: 'credit', idPeople: credit_id } })
                .catch(() => {});
        },    
  },

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
    // const elems = document.querySelectorAll('.slider');
    // M.Slider.init(elems, {
    //   indicators: false
    // });    
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

/* .slider .slides {
  height: unset; 
} */

blockquote p:first-child {
  font-size: 1.3em;
}

</style>