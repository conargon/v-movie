<template>
  <v-container fluid v-if="movies != null && movies.length > 0">
    <div class="carousel center-align" ref="carousel">
      <div class="carousel-item hoverable" v-for="(m, i) in movies" :key="i">
          <img :src="srcPoster(m)" @click.stop="goTo(m)" alt="" />
      </div>
    </div>
  </v-container>
</template>

<script>
import M from "materialize-css";

export default {
  name: "CarouselMovie",

  props: {
    movies: Array,
  },

  methods: {
    srcPoster: function (movie) {
      return movie != null && movie.poster_path != null
        ? "http://image.tmdb.org/t/p/w342" + movie.poster_path
        : "./no-poster.jpg";
    },
    anyoLanzamiento: function (movie) {
      return movie != null && movie.release_date != null
        ? " (" + movie.release_date.substr(0, 4) + ")"
        : "xxx";
    },
    goTo: function (m) {
      this.$router
        .push({ name: "MovieDetail", params: { idMovie: m.id } })
        .catch(() => {});
    },
  },

  mounted() {
    var elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems, {
      duration: 150,
      dist: -60,
      shift: 5,
      padding: 5,
      numVisible: 9,
      indicators: false,
      noWrap: false,
    });
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

.carousel {
  min-height: 550px;
  width: 100%;
  cursor: pointer;
}

.carousel .carousel-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 342px; 
  height: 500px;
} 

.carousel .carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 15px;
}

</style>