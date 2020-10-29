<template>
  <div v-if="multi != null && multi.total_pages > 0">

    <!-- PAGINACION --> 
    <ul class="pagination">
      <li :class="multi.page == 1 ? 'disabled' : 'waves-effect'">
        <a href="#" @click="onPageChange(multi.page-1)"><i class="material-icons">chevron_left</i></a>
      </li>
      <li :class="multi.page == i ? 'active' : 'waves-effect'" v-for="i in multi.total_pages" :key="i">
        <a href="#" @click="onPageChange(i)">{{i}}</a>
      </li>
      <li :class="multi.page == multi.total_pages ? 'disabled' : 'waves-effect'">
        <a href="#" @click="onPageChange(multi.page+1)"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>

    <!-- GRID DE PELICULAS/ACTORES/SERIES DE TV --> 
    <div class="row">
      <div class="col s12 m6 l3 xl2" v-for="m in multi.results" :key="m.id">

        <!-- PELICULA --> 
        <div v-if="m.media_type == 'movie'">
            <div class="card medium hoverable">
              <div class="card-image">
                <img
                  class="responsive-img"
                  :src="srcPoster(m)"
                  alt=""
                  :data-caption="m.title"
                  @click.stop="goToMovie(m)"
                  :title="m.title"
                />
              </div>
            </div>
            <div class="center-align">
              <p class="titulo">Película</p>
              <p class="nombre">{{m.title}}</p>
            </div> 
        </div> 

        <!-- ACTOR --> 
        <div v-if="m.media_type == 'person'">
            <div class="card medium hoverable">
              <div class="card-image">
                <img
                  class="responsive-img"
                  :src="srcProfile(m)"
                  alt=""
                  :data-caption="m.name"
                  @click.stop="goToPeople(m)"
                  :title="m.name"
                />
              </div>
            </div>
            <div class="center-align">
              <p class="titulo">Persona</p>
              <p class="nombre">{{m.name}}</p>
            </div> 
        </div>       

        <!-- TV --> 
        <div v-if="m.media_type == 'tv'">
            <div class="card medium hoverable">
              <div class="card-image">
                <img
                  class="responsive-img"
                  :src="srcPoster(m)"
                  alt=""
                  :data-caption="m.name"
                  @click.stop="goToPeople(m)"
                  :title="m.name"
                />
              </div>
            </div>
            <div class="center-align">
              <p class="titulo">Serie TV</p>
              <p class="nombre">{{m.name}}</p>
            </div> 
        </div>              

      </div>
    </div>

  </div>
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "SearchGrid",

  props: {
    multi: null,
  },

  mixins: [mixins],  

  methods: {
    onPageChange: function (newPage) {
      this.$emit("pageChange", newPage);
    },
    goToMovie: function (m) {
      this.$router
        .push({ name: "MovieDetail", params: { idMovie: m.id } })
        .catch(() => {});
    },
    goToPeople: function (m) {
      this.$router
        .push({ name: "PeopleDetail", params: { type: 'person', idPeople: m.id } })
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

.nombre {
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.titulo {
  font-size: 0.9em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>