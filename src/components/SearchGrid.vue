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
        <div v-if="m.media_type == 'movie'" :title="m.title + ' ' + anyoLanzamiento(m)">
            <div class="card small hoverable">
              <div class="card-image">
                <img
                  class="responsive-img"
                  :src="srcPoster(m)"
                  alt=""
                  @click.stop="goToMovie(m)"                  
                />
              </div>
            </div>
            <div class="center-align">
              <p class="titulo"><i class="material-icons tiny" style="vertical-align: middle;">theaters</i>&nbsp;Película</p>
              <p class="nombre">{{m.title}} {{anyoLanzamiento(m)}}</p>
            </div> 
        </div> 

        <!-- ACTOR --> 
        <div v-if="m.media_type == 'person'" :title="m.name">
            <div class="card small hoverable">
              <div class="card-image">
                <img
                  class="responsive-img"
                  :src="srcProfile(m)"
                  alt=""
                  @click.stop="goToPeople(m)"                  
                />
              </div>
            </div>
            <div class="center-align">
              <p class="titulo"><i class="material-icons tiny" style="vertical-align: middle;">person</i>&nbsp;Persona</p>
              <p class="nombre">{{m.name}}</p>
            </div> 
        </div>       

        <!-- TV --> 
        <div v-if="m.media_type == 'tv'" :title="m.name + ' ' + anyoLanzamientoSerieTv(m)">
            <div class="card small hoverable">
              <div class="card-image">
                <img
                  class="responsive-img"
                  :src="srcPoster(m)"
                  alt=""
                  @click.stop="goToSerieTv(m)"
                />
              </div>
            </div>
            <div class="center-align">
              <p class="titulo"><i class="material-icons tiny" style="vertical-align: middle;">tv</i>&nbsp;Serie TV</p>
              <p class="nombre">{{m.name}} {{anyoLanzamientoSerieTv(m)}}</p>
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
    goToSerieTv: function (m) {
      this.$router
        .push({ name: "TvDetail", params: { idSerieTv: m.id } })
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
.card.small .card-image {
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