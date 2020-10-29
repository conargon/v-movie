<template>
<div class="container">
    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>  
    <div v-if="!loading && multi != null && multi.total_results == 0">
      <p class="no_results">No se han encontrado resultados</p>
    </div>
    <SearchGrid v-bind:multi="multi" @pageChange="onPageChange($event)" v-if="!loading && multi != null && multi.total_results > 0"/>
</div>    
</template>

<script>
import axios from 'axios';
import SearchGrid from '@/components/SearchGrid'
import mixins from "@/components/mixins.js";

export default {
  name: 'SearchView',

  components: {
    SearchGrid,
  },

  mixins: [mixins],   

  data: function() {
    return {
      multi: null,
      loading: true,
    }
  }, 

  methods: {
      // TODO usar api para recuperar la config.
      search: function(query, page) {
          this.loading = true;
          axios
            .get('https://api.themoviedb.org/3/search/multi?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&' 
                    + 'query=' + query 
                    + '&page=' + page 
                    + '&include_adult=false')                    
            .then(
                response => {
                    this.multi = response.data;
                    if(this.movies != null) {
                      this.movies.results = this.movies.results.filter(m => {
                        if(m.media_type == 'movie') {
                          return this.tienePoster(m)
                        } 
                        else if(m.media_type == 'person') {
                          return this.tienePosterPerson(m);
                        }
                      });
                      this.movies.results = this.movies.results.sort((a,b) => b.vote_count-a.vote_count)
                    }
                }
            )
            .catch(
                e => console.log(e)
            )
            .finally(
                this.loading = false
            )
      },
      onPageChange: function(newPage) {
        this.$store.commit('setCurrentPage', newPage);
        this.search(this.$route.params.searchText, newPage);
      } 
  },  

  created () {    
    let currentPage = this.$store.state.currentPage;    
    if(currentPage == null) {
      currentPage = 1;
      this.$store.commit('setCurrentPage', currentPage)
    }
    this.search(this.$route.params.searchText, currentPage);
  },

  mounted() {
        window.scrollTo(0,0);
  }
  
}
</script>

<style scoped>

.container {
  width: 95%;
  max-width: initial;
  margin-bottom: 100px;
}

.no_results {
  font-size: 2em;
}

</style>