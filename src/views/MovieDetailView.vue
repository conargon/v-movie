<template>
    <v-progress-linear
      v-if="loading"  
      indeterminate
      color="cyan"
    ></v-progress-linear>
    <MovieDetail 
        v-else
        v-bind:movie="movie" />            
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
        loading: true,
      }
  },

  methods: {
      // TODO usar api para recuperar la config.
      findMovie: function(idMovie) {
          this.loading = true;
          window.scrollTo(0,0);
          axios
            .get('https://api.themoviedb.org/3/movie/' + idMovie + '?api_key=91e88eab577c30d2e4546d14c947362a'
                + '&language=es-ES' 
                + '&append_to_response=credits,videos,images'
                + '&include_image_language=es,null')
            .then(
                response => {
                    this.movie = response.data;
                }
            )
            .catch(
                e => console.log("==================> findMovie" + e)
            )
            .finally(
                this.loading = false
            )            
      },     
  },  

  created () {
    this.findMovie(this.$route.params.idMovie);
  }
}
</script>