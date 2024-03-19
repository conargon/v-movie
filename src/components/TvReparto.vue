<template>
    <!-- REPARTO -->
    <div class="row seccion" v-if="allPeople(serieTv) != null && allPeople(serieTv).length > 0">
      <div class="titulo-seccion secundario-texto">
        <div>Reparto de {{serieTv.name}}</div>
        <div class="divider"></div>
      </div>
      <CarouselPeople :peopleList="allPeople(serieTv)"/>      
    </div> 
</template>

<script>
import mixins from "./mixins.js";
import CarouselPeople from "@/components/CarouselPeople";

export default {
  name: "TvReparto",

  mixins: [mixins],

  props: {
    serieTv: null
  },

  components: {
    CarouselPeople
  },    

  methods: {
    goTo: function(p) {
      this.$router
        .push({ name: "PeopleDetail", params: { type: 'credit', idPeople: p.credit_id } })
        .catch(() => {});
    },    
  },

};
</script>
