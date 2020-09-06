<template>
  <v-container fluid class="pa-0 ma-0">
    <v-hover>
      <template v-slot="{ hover }">
        <v-card class="pa-0 ma-0" :elevation="hover ? 8 : 1" hover>
          <v-img class="pa-0 ma-0 mt-4" :src="srcImage" :contain="true" @click="viewImage">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="$vuetify.theme.dark ? 'grey lighten-5' : 'blue darken-3'"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </template>
    </v-hover>
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
        ? "http://image.tmdb.org/t/p/w342" + this.image.file_path
        : "./no-poster.jpg";
    },
    srcImageLarge: function () {
      return this.image.file_path != null
        ? "http://image.tmdb.org/t/p/original" + this.image.file_path
        : "./no-poster.jpg";
    },
  },
  methods: {
    viewImage: function () {
      this.$store.commit("setSrcImagePreview", this.srcImageLarge);
    },
  },
};
</script>

