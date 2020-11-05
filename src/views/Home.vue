<template>
<div class="container">

    <div class="titulo-ficha center-align secundario-texto">
      <p>Peliculas recientes más populares</p>
    </div>

    <!--CARUSEL -->
    <CarouselMovie :movies="movies" v-if="loaded"/>
</div>
</template>

<script>
import axios from "axios";
import mixins from "@/components/mixins.js";
import CarouselMovie from "@/components/CarouselMovie";

export default {
  name: "Home",

  components: {
    CarouselMovie
  },

  mixins: [mixins],  

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
      const params =  "&page=1" +
                    "&primary_release_date.gte=" + mesAnt +
                    "&primary_release_date.lte=" + hoy +
                    "&sort_by=popularity.desc" +
                    "&include_adult=false" +
                    "&include_video=true";
      axios
        .get(this.getUrlApi("/discover/movie", "es-ES", params))
/*         .get(this.getUrlApi("/trending/tv/day", "es-ES", params))         */
        .then((response) => {
          this.movies = response.data.results; //
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

<style scoped>
.titulo {
  font-size: 2em;
  font-weight: bold;
}

.poster {
  border-radius: 8px;
}
</style>