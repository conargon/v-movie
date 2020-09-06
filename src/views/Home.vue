<template>
  <div class="home ma-0 pa-4 fluid">    
    <v-container fluid>

      <v-container fluid text-center>
        <img src="../assets/tmdb_long.svg" style="max-height: 48px;">        
      </v-container> 

      <v-container text-center v-if="movies != null">
        <h2>Peliculas recientes más populares</h2>
      </v-container> 

      <!-- CARUSEL VISTA PC -->
      <carousel 
        :perPageCustom="[[400, 1], [768, 3], [1024, 6]]" 
        scrollPerPage 
        navigationEnabled 
        :paginationEnabled="true"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <slide :id="'VueCarousel-slide-' + i" v-for="(m,i) in movies" :key="i">
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
          v-for="(m,i) in movies"
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

export default {
  name: "Home",

  components: {
    Movie,
    Carousel,
    Slide,
  },

  data: function () {
    return {
      movies: [],
    };
  },

  methods: {
    addMonths: function(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
          date.setDate(0);
        }
        return date;
    },
    searchLastMovies: function () {
      let hoy = new Date().toISOString().substr(0,10);
      let mesAnt = this.addMonths(new Date(), -1).toISOString().substr(0,10);
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES" +
            "&page=1" + 
            "&primary_release_date.gte=" +  mesAnt +
            "&primary_release_date.lte=" + hoy +
            "&sort_by=popularity.desc&include_adult=false&include_video=true"
        )
        // peliculas más populares
        // .get(
        //   "https://api.themoviedb.org/3/movie/popular?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&page="+page
        // )        
        .then((response) => {
          this.movies = response.data.results; //
          this.movies = this.movies.sort( (a,b) => b.vote_average - a.vote_average);
        })
        .catch((e) => console.log(e));
    },
    onPageChange: function (newPage) {
      this.searchMovies(newPage);
    },
  },
  created() {
    this.searchLastMovies(this.$route.params.searchText);
  },
};
</script>
