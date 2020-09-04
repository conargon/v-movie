<template>
  <v-container fluid class="pa-0 ma-0">
    <v-card 
      width="340"
      max-width="340" 
      class="pa-0 ma-0"
      hover>
      <v-img 
          class="pa-0 ma-0 mt-4"
          :src="srcImage" 
          :contain="true"
          @click="viewImage">
      </v-img>
    </v-card> 
  </v-container>
</template>

<script>
export default {
  name: "ImageMovie",
  props: {
    image: Object,
  },
  computed: {
    srcImage: function () {
      return this.image.file_path != null
        ? "http://image.tmdb.org/t/p/original" + this.image.file_path
        : "./no-poster.jpg";
    },
  },
  methods: {
    viewImage: function() {
      this.$store.commit('setSrcImagePreview', this.srcImage)
    },
  }
};
</script>

