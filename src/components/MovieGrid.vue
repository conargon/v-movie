<template> 
  <div class="container" v-if="movies != null">    
        <!--<v-pagination 
            :length="movies.total_pages" 
            total-visible="10"
            v-model="movies.page"
            @input="onPageChange"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"            
        >
        </v-pagination>-->
        <ul class="pagination">
          <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
          <li class="active"><a href="#!">1</a></li>
          <li class="waves-effect"><a href="#!">2</a></li>
          <li class="waves-effect"><a href="#!">3</a></li>
          <li class="waves-effect"><a href="#!">4</a></li>
          <li class="waves-effect"><a href="#!">5</a></li>
          <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
        </ul>        
        <!--<v-layout row wrap>           
            <v-flex xs12 sm6 md3 lg2 xl1 v-for="m in movies.results" :key="m.id">
                   <Movie v-bind:movie="m" />
            </v-flex>             
        </v-layout>-->
        <div class="row">
          <div class="col s12 m4 l3" v-for="m in movies.results" :key="m.id">
            <div class="material-placeholder">
              <img class="materialboxed" :src="srcPoster(m)" :data-caption="m.title" alt="" />
            </div>
          </div>
        </div>
    </div>    
</template>

<script>
import M from "materialize-css";
// import Movie from '@/components/Movie';

export default {
  name: 'MovieGrid',
    props: {
    movies: Object
  },
  components: {
    // Movie,
  },
  methods: {
      onPageChange: function(newPage) {
        this.$emit('pageChange', newPage)
      },
    srcPoster: function (movie) {
      return movie != null && movie.poster_path != null
        ? "http://image.tmdb.org/t/p/w342" + movie.poster_path
        : "./no-poster.jpg";
    },      
  },
  mounted() {
    const imgLightBox = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
  }
}
</script>
