<template>
  <v-card 
    :to="{ name: 'MovieDetail', params: { idMovie: movie.id }}"  
  >
    <v-card-title class="pa-0 ma-0 blue darken-3">
      <v-container fluid class="pa-2 ma-0">
        <p
          class="text-subtitle-2 font-weight-bold text-center pa-0 ma-0"
          style="color:white; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        >{{movie.title}}</p>
      </v-container>
    </v-card-title>
    <v-img 
      :src="srcPoster" 
      :contain="true" 
    >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular indeterminate color="$vuetify.theme.dark ? 'grey lighten-5' : 'blue darken-3'"></v-progress-circular>
          </v-row>
        </template>           
    </v-img>  
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
