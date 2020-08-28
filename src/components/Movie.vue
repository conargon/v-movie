<template>
  <v-card height="390" :to="{ name: 'MovieDetail', params: { idMovie: movie.id }}" hover light>
    <v-card-title class="pa-0 ma-0">
      <v-container fluid>
        <p
          class="text-subtitle-2 font-weight-bold text-center pa-0 ma-0"
          style="word-break: normal;"
        >{{movie.title}}</p>
      </v-container>
    </v-card-title>
    <v-img :src="srcPoster" :contain="true" max-height="300"></v-img>
    <v-card-subtitle class="pa-0 ma-0">
      <v-container fluid text-center>
        <v-icon small color="amber">mdi-star</v-icon>
        <span class="text-subtitle-2">&nbsp;{{movie.vote_average}}</span>
      </v-container>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
  computed: {
    srcPoster: function () {
      return this.movie.poster_path != null
        ? "http://image.tmdb.org/t/p/w342" + this.movie.poster_path
        : "./no-poster.jpg";
    },
  },
};
</script>
