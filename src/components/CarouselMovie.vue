<template>
  <div v-if="movies != null && movies.length > 0">
    <div class="carousel center-align" ref="carousel">
      <div class="carousel-item hoverable" v-for="(m, i) in movies" :key="i">
          <img :src="srcPoster(m)" @click.stop="goTo(m)" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import mixins from "./mixins.js";

export default {
  name: "CarouselMovie",

  mixins: [mixins],

  props: {
    movies: Array,
  },

  methods: {
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

@media (max-width: 600px) {
  .carousel {
    min-height: 300px;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }

  .carousel .carousel-item {
    width: 175px; 
    height: 250px;  
  }

}

</style>