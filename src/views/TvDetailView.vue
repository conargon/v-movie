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
import mixins from "@/components/mixins.js";
import TvDetail from "@/components/TvDetail";

export default {
  name: "TvDetailView",

  components: {
    TvDetail,
  },

  mixins: [mixins],  

  data: function () {
    return {
      serieTv: null,
      loading: true,
    };
  },

  methods: {
    findSerieTv: function (idSerieTv) {
      this.loading = true;
      const params = "&append_to_response=credits,videos,images" +
                   "&include_image_language=es,null";      
      axios
        .get(this.getUrlApi("/tv/"+idSerieTv, "es-ES", params))
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