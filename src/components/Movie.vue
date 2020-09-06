<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :to="{ name: 'MovieDetail', params: { idMovie: movie.id }}" height="300" :elevation="hover ? 8 : 1">
        <!-- <v-card-title class="pa-0 ma-0 blue darken-3">
      <v-container fluid class="pa-2 ma-0">
        <p
          class="text-subtitle-2 font-weight-bold text-center pa-0 ma-0"
          style="color:white; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
        >{{movie.title + anyoLanzamiento}}</p>
      </v-container>
        </v-card-title>-->
        <v-img :src="srcPoster" height="90%" :contain="true" style="border-radius: 5px;">
          <!-- <v-row align="top" class="lightbox black--text ml-5 mr-5 fill-height">
          <v-col>
            <div class="subheading text-center" 
              style="background-color:rgba(0, 0, 0, 0.1);">{{movie.title + anyoLanzamiento}}
            </div>
          </v-col>
          </v-row>-->
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="$vuetify.theme.dark ? 'grey lighten-5' : 'blue darken-3'"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-card-subtitle class="ma-0 pa-0 pl-2 pt-1">
          <p
            class="text-subtitle text-center"
            style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
          >{{movie.title}}</p>
        </v-card-subtitle>

        <!-- <v-card-subtitle class="pa-0 ma-0">
      <v-container fluid text-center>
        <v-icon small color="amber">mdi-star</v-icon>
        <span class="text-subtitle-2">&nbsp;{{movie.vote_average}}</span>
      </v-container>
        </v-card-subtitle>-->
      </v-card>
    </template>
  </v-hover>
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
    anyoLanzamiento: function () {
      return this.movie.release_date != null
        ? " (" + this.movie.release_date.substr(0, 4) + ")"
        : "xxx";
    },
  },
};
</script>
