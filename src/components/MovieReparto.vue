<template>
  <!-- REPARTO -->
  <div
    class="row seccion"
    v-if="people(movie) != null && people(movie).length > 0"
  >
    <div class="titulo-seccion secundario-texto">
      <div>Reparto de {{ movie.title }}</div>
      <div class="divider"></div>
    </div>
    <CarouselPeople :peopleList="people(movie)"/>
  
  </div>
</template>

<script>
import mixins from "./mixins.js";
import CarouselPeople from "@/components/CarouselPeople";

export default {
  name: "MovieReparto",

  mixins: [mixins],

  props: {
    movie: null,
  },

  components: {
    CarouselPeople
  },  

  methods: {
    goTo: function (p) {
      this.$router
        .push({
          name: "PeopleDetail",
          params: { type: "credit", idPeople: p.credit_id },
        })
        .catch(() => {});
    },
  },
};
</script>

