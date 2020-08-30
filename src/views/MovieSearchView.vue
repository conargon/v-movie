<template>
<div>
    <MovieGrid v-bind:movies="movies" @pageChange="onPageChange($event)" v-if="movies != null && movies.results.length > 0"/>    
    <v-subheader v-else>No se han encontrado resultados</v-subheader>
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
      currentPage: 1
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
                    if(this.movies != null) {
                      this.movies.results = this.movies.results.sort((a,b) => b.vote_count-a.vote_count)
                    }
                }
            )
            .catch(
                e => console.log(e)
            )
      },
      onPageChange: function(newPage) {
        this.currentPage = newPage
        this.searchMovies(this.$route.params.searchText, newPage);
      } 
  },  

  created () {
    this.searchMovies(this.$route.params.searchText, this.currentPage);
  }
}
</script>