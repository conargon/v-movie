<template>
  <!-- INFO -->
  <div id="info" class="row seccion">
    <div :class="imageBackgroundMovie != '' ? 'background_wrap' : ''">

      <!-- FONDO -->
      <img class="background_wrap_img" :src="imageBackgroundMovie"  v-if="imageBackgroundMovie != ''" />

      <!-- TITULO DE LA PELICULA Y LOGO DE LA PRODUCTORA  -->
      <div class="titulo-ficha secundario-texto">
        <div class="fondo-titulo-ficha" v-if="imageBackgroundMovie != ''"></div>
        <div class="logo-productora-titulo-ficha" v-if="!isMobile() && srcLogoProductora(movie) != null && srcLogoProductora(movie) != ''">
          <img
            class="responsive-img right"
            :src="srcLogoProductora(movie)"
            style="height:48px;margin-left:40px;margin-right:20px;"
          />
        </div>
        <div class="texto-titulo-ficha" :style="imageBackgroundMovie != '' ? 'color: white' : ''">
          <i class="material-icons medium" style="vertical-align: middle;">theaters</i>
          {{movie.title}} {{anyoLanzamiento(movie)}}
        </div>
        <div class="divider" v-if="imageBackgroundMovie == ''"></div>
      </div>

      <!-- POSTER -->
      <div class="col s12 m3">
        <img
          class="responsive-img materialboxed poster"
          :src="srcPoster(movie)"
          :data-caption="movie.title"
        />
      </div>

      <!-- FICHA -->
      <div class="col s12 m9">
        <ul class="collection">
          <li class="collection-item">
            <div v-html="`Título original: <strong> ${tituloOriginal(movie)} </strong>`" />
          </li>
          <li class="collection-item">
            <div v-html="`Duración: <strong>${movie.runtime} minutos</strong>`" />
          </li>
          <li class="collection-item">
            <div v-html="`Lanzamiento: <strong>${fechaLanzamiento(movie)}</strong>`" />
          </li>
          <li class="collection-item" v-if="firstCompany(movie) != ''">
            <div v-html="`Producción: <strong>${firstCompany(movie).name}</strong>`" />
          </li>
          <li class="collection-item" v-if="director(movie) != null && director(movie).length > 0">
            Dirección:
            <a href="#" @click="goToCreditPerson(director(movie)[0].credit_id)">
              <strong>{{director(movie)[0].name}}</strong>
            </a>
          </li>
          <li class="collection-item" v-if="movie.homepage != null && movie.homepage != ''">
            <p>
              Página principal:
              <a
                :href="movie.homepage"
                target="_blank"
                class="text-decoration-none"
              >
                <strong>{{movie.homepage}}</strong>
              </a>
            </p>
          </li>
          <li class="collection-item">
            Valoración:
            <div style="display:inline; vertical-align: middle;">
              <i
                class="material-icons tiny"
                :style="i<=Math.round(movie.vote_average/2) ? 'color:#fdd835' : 'color:#424242'"
                v-for="i in 5"
                :key="i"
              >star</i>
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
              <p>
                <strong>{{movie.tagline}}</strong>
              </p>
              <br />
              <p>{{movie.overview}}</p>
            </blockquote>
          </li>
        </ul>
      </div>
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
        .push({
          name: "PeopleDetail",
          params: { type: "credit", idPeople: credit_id }
        })
        .catch(() => {});
    }
  },

  computed: {
    imageBackgroundMovie: {
      get() {
        let images = this.images(this.movie);
        if(images != null) {
          let voto = 0;
          let file_path = images[0].file_path;          
          for(let image of images) {
            if(image.vote_count > voto) {
              voto = image.vote_average;
              file_path = image.file_path;
            }
          }
          return file_path != '' ? "http://image.tmdb.org/t/p/original" + file_path : '';
        } else {
          return "";
        }
      }
    }
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
blockquote p:first-child {
  font-size: 1.3em;
}

.background_wrap {
  position: relative;
  background-color: #01b4e4;
  overflow: hidden;
  border-radius: 16px;
}

.background_wrap .titulo-ficha {
  position: relative;
}

.background_wrap .col {
  position: relative;
  padding: 20px;
}

.background_wrap .col img {
  margin-top: 10px;
}

.background_wrap_img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
}

.background_wrap .collection {
  opacity: 0.8;
}

.fondo-titulo-ficha {    
    opacity: 0.6;
    background-color: #000;
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;    
}

.logo-productora-titulo-ficha { 
  position: relative;
}

.texto-titulo-ficha { 
  position: relative;
}

</style>