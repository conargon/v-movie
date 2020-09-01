<template>
    <v-progress-linear
      v-if="loading"  
      indeterminate
      color="cyan"
    ></v-progress-linear>
    <MovieDetail 
        v-else
        v-bind:movie="movie" 
        v-bind:images="images" 
        v-bind:people="people" 
        v-bind:director="director"/>    
</template>

<script>
import axios from 'axios';
import MovieDetail from '@/components/MovieDetail'

export default {
  name: 'MovieDetailView',

  components: {
    MovieDetail,
  },

  data: function() {
      return { 
        movie: Object,
        images: [],
        people: [],
        director: [],
        loading: true,
      }
  },

  methods: {
      // TODO usar api para recuperar la config.
      findMovie: function(idMovie) {
          this.loading = true;
          axios
            .get('https://api.themoviedb.org/3/movie/' + idMovie + '?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES')
            .then(
                response => {
                    window.scrollTo(0,0);
                    this.movie = response.data;
                    this.getImages(idMovie);
                }
            )
            .catch(
                e => console.log(e)
            )
      },
      getImages: function(idMovie) {
          axios
            .get('https://api.themoviedb.org/3/movie/' + idMovie + '/images?api_key=91e88eab577c30d2e4546d14c947362a')
            .then(
                response => {
                    this.images = response.data.backdrops;
                    this.getCredits(idMovie);
                }
            )
            .catch(
                e => console.log(e)
            )
      },
      getCredits: function(idMovie) {
          axios
            .get('https://api.themoviedb.org/3/movie/' + idMovie + '/credits?api_key=91e88eab577c30d2e4546d14c947362a')
            .then(
                response => {
                    //this.people = response.data.cast.slice(0, 9);
                    this.people = response.data.cast;
                    this.director = response.data.crew.filter(e => e.job == 'Director');                    
                }
            )
            .catch(
                e => console.log(e)
            )
            .finally(
                this.loading = false
            )
      }
  },  

  created () {
    this.findMovie(this.$route.params.idMovie);
  }
}
</script>