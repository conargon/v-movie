<template>
  <div class="container">
      <div class="progress" v-if="!loaded">
        <div class="indeterminate"></div>
      </div>    
      <div class="container-carrusel" v-if="loaded">
        <CarouselMovie titulo="Peliculas recientes populares" :movies="moviesMostPopular" @changeFilterDiario="onChangeMovieFilterDiario"/>
        <CarouselTv titulo="Series TV recientes populares" :seriesTv="seriesTvMostPopular" @changeFilterDiario="onChangeTvFilterDiario"/>
        <CarouselPeople titulo="Personas más populares" :peopleList="peopleTrending" @changeFilterDiario="onChangePeopleFilterDiario"/>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import mixins from "@/components/mixins.js";
import CarouselMovie from "@/components/CarouselMovie";
import CarouselTv from "@/components/CarouselTv";
import CarouselPeople from "@/components/CarouselPeople";

export default {
  name: "Home",

  components: {
    CarouselMovie,
    CarouselTv,
    CarouselPeople
  },

  mixins: [mixins],  

  data: function () {
    return {
      moviesMostPopular: [],
      seriesTvMostPopular: [],
      peopleTrending: [],
      loaded: false,
      //
      movieFilterDiario: 'day',
      tvFilterDiario: 'day',
      peopleFilterDiario: 'day',
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
    searchMostPopular: function () {
      // let hoy = new Date().toISOString().substr(0, 10);
      // let mesAnt = this.addMonths(new Date(), -1).toISOString().substr(0, 10);
      // const params =  "&page=1" +
      //               "&primary_release_date.gte=" + mesAnt +
      //               "&primary_release_date.lte=" + hoy +
      //               "&sort_by=popularity.desc" +
      //               "&include_adult=false" +
      //               "&include_video=true";

      // const urlGetMostPopularMovies = this.getUrlApi("/discover/movie", "es-ES", params);                      
      // const urlGetMostPopularTv = this.getUrlApi("/discover/tv", "es-ES", params);
      const urlGetMostPopularMovies = this.getUrlApi("/trending/movie/" + this.movieFilterDiario, "es-ES", "");                      
      const urlGetMostPopularTv = this.getUrlApi("/trending/tv/" + this.tvFilterDiario, "es-ES", "");        
      const urlGetTrendingPeople = this.getUrlApi("/trending/person/" + this.peopleFilterDiario, "es-ES", "");  
      
      const requestGetMostPopularMovies = axios.get(urlGetMostPopularMovies);
      const requestGetMostPopularTv = axios.get(urlGetMostPopularTv);
      const requestGetTrendingPeople = axios.get(urlGetTrendingPeople); 

      axios.all([requestGetMostPopularMovies, requestGetMostPopularTv, requestGetTrendingPeople])
      .then(axios.spread((...responses) => {
            this.moviesMostPopular = responses[0].data.results;
            this.seriesTvMostPopular = responses[1].data.results;
            this.peopleTrending = responses[2].data.results;
      }))
      .catch((e) => console.log(e))
      .finally((this.loaded = true));      
      
    },
    onChangeMovieFilterDiario: function (val) {
      this.movieFilterDiario  = val;
      this.searchMostPopular();
    },
    onChangeTvFilterDiario: function (val) {
      this.tvFilterDiario  = val;
      this.searchMostPopular();
    },
    onChangePeopleFilterDiario: function (val) {
      this.peopleFilterDiario  = val;
      this.searchMostPopular();
    },        
  },
  created() {
    this.searchMostPopular();
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