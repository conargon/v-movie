<template>
<div class="center-align">

    <div>
      <h4>Peliculas recientes más populares</h4>
    </div>

    <!--CARUSEL -->
    <CarouselMovie :movies="movies" v-if="loaded"/>
</div>
</template>

<script>
import axios from "axios";
import CarouselMovie from "@/components/CarouselMovie";


export default {
  name: "Home",

  components: {
    CarouselMovie
  },

  data: function () {
    return {
      movies: [],
      loaded: false,
    };
  },

  methods: {
    addMonths: function (date, months) {
      var d = date.getDate();
      date.setMonth(date.getMonth() + +months);
      if (date.getDate() != d) {
        date.setDate(0);
      }
      return date;
    },
    searchLastMovies: function () {
      let hoy = new Date().toISOString().substr(0, 10);
      let mesAnt = this.addMonths(new Date(), -1).toISOString().substr(0, 10);
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES" +
            "&page=1" +
            "&primary_release_date.gte=" +
            mesAnt +
            "&primary_release_date.lte=" +
            hoy +
            "&sort_by=popularity.desc&include_adult=false&include_video=true"
        )
        // peliculas más populares
        // .get(
        //   "https://api.themoviedb.org/3/movie/popular?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&page="+page
        // )
        .then((response) => {
          this.movies = response.data.results; //
          this.movies = this.movies.sort(
            (a, b) => b.vote_average - a.vote_average
          );

          this.loaded = true;

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
