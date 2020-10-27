<template>
    <!-- REPARTO -->
    <div class="row seccion">
      <div class="titulo-seccion">
        <div>Reparto</div>
        <div class="divider"></div>
      </div>
      <div class="col s6 m3 l2 xl1" v-for="(p,i) in people(movie)" :key="i">
        <div class="card small hoverable">
          <div class="card-image material-placeholder">
            <img class="materialboxed" :src="srcProfile(p)" :data-caption="p.name" />
          </div>
          <div class="card-content center-align">
            <p class="actor">{{p.name}}</p>
            <p class="personaje">{{p.character != null && p.character != "" ? p.character : "-"}}</p>
          </div>
          <div class="card-action">
            <a class="center-align" href="#" @click.stop="goTo(p)">Ficha</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";

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

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
  }
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
  padding-left: 4px;
  padding-right: 4px;
}

.card-action {
  padding: 8px 24px;
  font-size: 0.8em;
}
</style>