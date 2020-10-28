<template>
  <div v-if="movies != null && movies.total_pages > 0">

    <!-- PAGINACION --> 
    <ul class="pagination">
      <li :class="movies.page == 1 ? 'disabled' : 'waves-effect'">
        <a href="#" @click="onPageChange(movies.page-1)"><i class="material-icons">chevron_left</i></a>
      </li>
      <li :class="movies.page == i ? 'active' : 'waves-effect'" v-for="i in movies.total_pages" :key="i">
        <a href="#" @click="onPageChange(i)">{{i}}</a>
      </li>
      <li :class="movies.page == movies.total_pages ? 'disabled' : 'waves-effect'">
        <a href="#" @click="onPageChange(movies.page+1)"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>

    <!-- GRID DE PELICULAS --> 
    <div class="row">
      <div class="col s12 m6 l3 xl2" v-for="m in movies.results" :key="m.id">
        <div class="card medium hoverable">
          <div class="card-image">
            <img
              class="responsive-img"
              :src="srcPoster(m)"
              alt=""
              :data-caption="m.title"
              @click.stop="goTo(m)"
              :title="m.title"
            />
          </div>
        </div>
        <div class="center-align">
          <p class="pelicula">{{m.title}}</p>
        </div>         
      </div>
    </div>

  </div>
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "MovieGrid",

  props: {
    movies: null,
  },

  mixins: [mixins],  

  methods: {
    onPageChange: function (newPage) {
      this.$emit("pageChange", newPage);
    },
    goTo: function (m) {
      this.$router
        .push({ name: "MovieDetail", params: { idMovie: m.id } })
        .catch(() => {});
    },
  },

};
</script>

<style scoped>
.card.medium .card-image {
  max-height: 100%;
  cursor: pointer;
  border-radius: 4px;
}

.pelicula {
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>