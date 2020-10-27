<template> 
  <div v-if="movies != null">    

        <ul class="pagination">
          <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
          <li class="active"><a href="#!">1</a></li>
          <li class="waves-effect"><a href="#!">2</a></li>
          <li class="waves-effect"><a href="#!">3</a></li>
          <li class="waves-effect"><a href="#!">4</a></li>
          <li class="waves-effect"><a href="#!">5</a></li>
          <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
        </ul>        

        <div class="row">
          <div class="col s12 m3 l2" v-for="m in movies.results" :key="m.id">
            <div class="hoverable">
                <div class="card hoverable">
                  <div class="card-image material-placeholder">
                    <img class="materialboxed" :src="srcPoster(m)" alt="" :data-caption="m.title" />
                  </div>
                  <div class="card-content">
                    <p>{{m.title}}</p>
                  </div>
                  <div class="card-action">
                    <a href="#" @click.stop="goTo(m)">Ver ficha</a>
                  </div>
                </div>
            </div>
          </div>
        </div>

    </div>    
</template>

<script>
import M from "materialize-css";

export default {
  name: 'MovieGrid',

  props: {
    movies: null
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
    goTo: function (m) {
      this.$router
        .push({ name: "MovieDetail", params: { idMovie: m.id } })
        .catch(() => {});
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

<style scoped>

.card-image{
    height: 400px; /* Your height here */
    overflow: hidden;
}

.card-content {
  height: 80px;
  overflow: hidden;
}

</style>