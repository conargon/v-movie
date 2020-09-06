<template>
    <v-container fluid grid-list-lg v-if="movies != null">        
        <v-pagination 
            :length="movies.total_pages" 
            total-visible="10"
            v-model="movies.page"
            @input="onPageChange"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"            
        >
        </v-pagination>
        <v-layout row wrap>           
            <v-flex xs12 sm6 md3 lg2 xl1 v-for="m in movies.results" :key="m.id">
                   <Movie v-bind:movie="m" />
            </v-flex>             
        </v-layout>
    </v-container>    
</template>

<script>
import Movie from '@/components/Movie';

export default {
  name: 'MovieGrid',
    props: {
    movies: Object
  },
  components: {
    Movie,
  },
  methods: {
      onPageChange: function(newPage) {
        this.$emit('pageChange', newPage)
      }
  }
}
</script>