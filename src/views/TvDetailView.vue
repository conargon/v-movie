<template>
  <div>
    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>
    <TvDetail v-else :serieTv="serieTv" />
  </div>
</template>

<script>
import axios from "axios";
import TvDetail from "@/components/TvDetail";

export default {
  name: "TvDetailView",

  components: {
    TvDetail,
  },

  data: function () {
    return {
      serieTv: null,
      loading: true,
    };
  },

  methods: {
    // TODO usar api para recuperar la config.
    findSerieTv: function (idSerieTv) {
      this.loading = true;
      axios
        .get(
          "https://api.themoviedb.org/3/tv/" +
            idSerieTv +
            "?api_key=91e88eab577c30d2e4546d14c947362a" +
            "&language=es-ES" +
            "&append_to_response=credits,videos,images" +
            "&include_image_language=es,null"
        )
        .then((response) => {
          this.serieTv = response.data;
        })
        .catch((e) => console.log("==================> findSerieTv" + e))
        .finally((this.loading = false));
    },
  },

  created() {
    this.findSerieTv(this.$route.params.idSerieTv);
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>