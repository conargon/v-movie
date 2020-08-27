<template>
<div>
    <MovieGrid v-bind:movies="movies" @pageChange="onPageChange($event)"/>    
    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
</div>    
</template>

<script>
import axios from 'axios';
import MovieGrid from '@/components/MovieGrid'

export default {
  name: 'MovieSearchView',

  components: {
    MovieGrid,
  },

  data: function() {
    return {
      movies: null,
      snackbar: false,
      textSnackbar: 'Hello, I\'m a snackbar',      
    }
  }, 

  methods: {
      // TODO usar api para recuperar la config.
      searchMovies: function(query, page) {
          axios
            .get('https://api.themoviedb.org/3/search/movie?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&' 
                    + 'query=' + query 
                    + '&page=' + page 
                    + '&include_adult=false')
            .then(
                response => {
                    window.scrollTo(0,0);
                    this.movies = response.data;
                    if(page == 1) {
                      this.textSnackbar = this.movies.total_results > 0 ? 'Total resultados: ' + this.movies.total_results : 'No se han encontado resultados'; 
                      this.snackbar = true;
                    }
                }
            )
            .catch(
                e => console.log(e)
            )
      },
      onPageChange: function(newPage) {
        this.searchMovies(this.$route.params.searchText, newPage);
      } 
  },  

  created () {
    this.searchMovies(this.$route.params.searchText, 1);
  }
}
</script>