<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card
        hover
        class="pa-0 ma-0"
        :elevation="hover ? 8 : 1"
        :to="{ name: 'PeopleDetail', params: { idPeople: credit.credit_id }}"
      >
        <v-img
          class="pa-0 ma-0"
          :src="srcProfile"
          :contain="true"
          style="border-radius: 10px;"
          max-height="300"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="$vuetify.theme.dark ? 'grey lighten-5' : 'blue darken-3'"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-subtitle class="pa-0 ma-0 pt-4">
          <p
            class="text-sm-body-2 font-weight-black text-truncate text-center pa-0 ma-0"
            style="word-break: normal;"
          >{{credit.name}}</p>
          <p
            class="text-caption text-center text-truncate pa-0 ma-0"
            style="word-break: normal;"
          >{{credit.character}}</p>
        </v-card-subtitle>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "Credit",
  props: {
    credit: Object,
  },
  computed: {
    srcProfile: function () {
      return this.credit.profile_path != null
        ? "http://image.tmdb.org/t/p/w342" + this.credit.profile_path
        : "./no-poster.jpg";
    },
  },
};
</script>
