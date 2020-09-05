<template>
  <div class="home ma-0 pa-4 fluid">    
    <v-container fluid>

      <v-container fluid text-center>
        <img src="../assets/tmdb_long.svg" style="max-height: 48px;">        
      </v-container> 

      <v-container text-center v-if="movies != null">
        <h2>Peliculas recientes</h2>
      </v-container> 

      <!-- CARUSEL VISTA PC -->
      <carousel 
        :perPageCustom="[[400, 1], [768, 3], [1024, 4], [1200, 6]]" 
        scrollPerPage 
        navigationEnabled 
        paginationEnabled="true"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <slide :id="'VueCarousel-slide-' + i" v-for="(m,i) in movies.results" :key="i">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex>
                <Movie v-bind:movie="m" />
              </v-flex>
            </v-layout>
          </v-container>
        </slide>
      </carousel>

      <!-- CARUSEL VISTA MOVIL -->
      <v-carousel 
          hide-delimiters 
          height="auto" 
          v-else
      >
        <v-carousel-item                     
          v-for="(m,i) in movies.results"
          :key="i" 
        >
          <Movie v-bind:movie="m" />
        </v-carousel-item>
      </v-carousel>      

    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
import Movie from "@/components/Movie";
import Date from 'datejs';

export default {
  name: "Home",

  components: {
    Movie,
    Carousel,
    Slide,
  },

  data: function () {
    return {
      movies: null,
    };
  },

  methods: {
    searchLastMovies: function (page) {
      // let hoy = new Date().toString("yyyy-M-d")
      // let mesAnt = new Date().addMonths(-1).toString("yyyy-M-d");         
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&" +
            "&page=" +
            page +
            // "&primary_release_date.gte=" +  mesAnt +
            // "&primary_release_date.lte=" + hoy +
            "&sort_by=popularity.desc&include_adult=false&include_video=true"
        )
        // peliculas más populares
        // .get(
        //   "https://api.themoviedb.org/3/movie/popular?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&page="+page
        // )        
        .then((response) => {
          this.movies = response.data;
        })
        .catch((e) => console.log(e));
    },
    onPageChange: function (newPage) {
      this.searchMovies(newPage);
    },
  },
  created() {
    this.searchLastMovies(this.$route.params.searchText, 1);
  },
};
</script>
