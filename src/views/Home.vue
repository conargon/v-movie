<template>
  <div class="home ma-4 pa-0 fluid">
    <v-container fluid v-if="movies != null">
      <v-container text-center>
        <img src="../assets/tmdb_long.svg" width="640" />
        <h1>Peliculas de estreno recientes</h1>
      </v-container>
      <carousel :perPageCustom="[[768, 2], [1024, 3], [1200, 4]]" scrollPerPage navigationEnabled>
        <slide v-for="(m,i) in movies.results" :key="i">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex>
                <Movie v-bind:movie="m" />
              </v-flex>
            </v-layout>
          </v-container>
        </slide>
      </carousel>
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
      movies: null,
    };
  },

  methods: {
    //https://api.themoviedb.org/3/discover/movie?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2020-07-20&primary_release_date.lte=2020-08-20
    searchLastMovies: function (page) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&" +
            "&page=" +
            page +
            "&primary_release_date.gte=2020-07-20&primary_release_date.lte=2020-08-20" +
            "&sort_by=popularity.desc&include_adult=false&include_video=false"
        )
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
