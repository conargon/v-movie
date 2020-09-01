<template>
  <v-card 
    width="150"
    max-width="150" 
    height="200"
    max-height="200"
    class="pa-0 ma-0"
    :to="{ name: 'PeopleDetail', params: { idPeople: credit.credit_id }}">
    <v-img 
        class="pa-0 ma-0 mt-4"
        :src="srcProfile" 
        :contain="true" 
        height="120">
    </v-img>
    <v-card-subtitle class="pa-0 ma-0 pt-4">
      <p class="text-sm-body-2 font-weight-black text-center pa-0 ma-0" style="word-break: normal;">{{credit.name}}</p>
      <p class="text-caption text-center text-truncate pa-0 ma-0" style="word-break: normal;">{{credit.character}}</p>
    </v-card-subtitle>

  </v-card>
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
        ? "http://image.tmdb.org/t/p/original" + this.credit.profile_path
        : "./no-poster.jpg";
    },
  },
};
</script>
