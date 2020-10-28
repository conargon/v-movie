<template>
    <!-- REPARTO -->
    <div class="row seccion" v-if="people(movie) != null && people(movie).length > 0">
      <div class="titulo-seccion secundario-texto">
        <div>Reparto de {{movie.title}}</div>
        <div class="divider"></div>
      </div>
      <div class="col s12 m4 l2 xl2" v-for="(p,i) in people(movie)" :key="i">
        <div class="card small hoverable">
          <div class="card-image">
            <img class="responsive-img" :src="srcProfile(p)" @click.stop="goTo(p)"/>
          </div>
        </div>
        <div class="center-align">
          <p class="actor">{{p.name}}</p>
          <p class="personaje">{{p.character != null && p.character != "" ? p.character : "-"}}</p>
        </div>        
      </div>
    </div>
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "MovieReparto",

  mixins: [mixins],

  props: {
    movie: null
  },

  methods: {
    goTo: function(p) {
      this.$router
        .push({ name: "PeopleDetail", params: { idPeople: p.credit_id } })
        .catch(() => {});
    }
  },

};
</script>

<style scoped>
.col p {
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actor {
  font-weight: bold;
}

.personaje {
  font-style: italic;
}

.card-content {
  padding: 4px;
}

.card-action {
  padding: 8px 24px;
  font-size: 0.8em;
}

.card.small .card-image {
  max-height: 100%;
  cursor: pointer;
}
</style>