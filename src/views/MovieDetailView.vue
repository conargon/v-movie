<template>
  <div>
    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>
    <MovieDetail v-else :movie="movie" />
  </div>
</template>

<script>
import axios from "axios";
import mixins from "@/components/mixins.js";
import MovieDetail from "@/components/MovieDetail";

export default {
  name: "MovieDetailView",

  components: {
    MovieDetail,
  },

  mixins: [mixins],   

  data: function () {
    return {
      movie: null,
      loading: true,
    };
  },

  methods: {
    // TODO usar api para recuperar la config.
    findMovie: function (idMovie) {
      this.loading = true;
      const params = "&append_to_response=credits,videos,images" +
                   "&include_image_language=es,null";
      axios
        .get(this.getUrlApi("/movie/"+idMovie, "es-ES", params))
        .then((response) => {
          this.movie = response.data;
        })
        .catch((e) => console.log("==================> findMovie" + e))
        .finally((this.loading = false));
    },
  },

  created() {
    this.findMovie(this.$route.params.idMovie);
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>