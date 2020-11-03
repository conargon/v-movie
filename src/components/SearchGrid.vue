<template>
  <div v-if="multi != null && multi.total_pages > 0">

    <!-- PAGINACION --> 
    <div class="paginacion noselect">
      <paginate
        v-model="currentPage"
        :page-range="isMobile() ? 5 : 11"
        :page-count="multi.total_pages"
        :click-handler="onPageChange"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'">
      </paginate>
    </div>

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
import Paginate from 'vuejs-paginate';

export default {
  name: "SearchGrid",

  computed: {
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(currentPage) {
        this.$store.commit("setCurrentPage", currentPage);
      }
    },
  },


  props: {
    multi: null,
  },

  components: {
    Paginate 
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
    }   
  },

};
</script>

<style scoped>

.paginacion {
  width: 95%;
  padding-top: 10px;
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