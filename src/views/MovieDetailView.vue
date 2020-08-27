<template>
    <MovieDetail v-bind:movie="movie" v-bind:images="images" v-bind:people="people"/>    
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
        movie: null,
        images: [],
        people: []
      }
  },

  methods: {
      // TODO usar api para recuperar la config.
      findMovie: function(idMovie) {
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
                    this.people = response.data.cast.slice(0, 9);
                }
            )
            .catch(
                e => console.log(e)
            )
      },      
  },  

  created () {
    this.findMovie(this.$route.params.idMovie);
  }
}
</script>