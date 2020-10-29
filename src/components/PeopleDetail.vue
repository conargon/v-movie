<template>
  <div class="container">

    <!-- INFO DEL ACTOR --> 
    <div class="card" v-if="person != null && imagenes != null && movies != null">     
      <div class="card-content">
        <PeopleInfo :person="person" />
        <PeopleImagenes id="imagenesActor" :imagenes="imagenes" :nombre="person.name" />
        <PeoplePeliculas id="videosActor" :movies="movies" :nombre="person.name" />
      </div>

    </div>

    <!-- BOTONERA -->
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large secundario">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating terciario" href="#" @click="window.goTo(0,0)" title="Ficha"><i class="material-icons">movie</i></a></li>
        <li><a class="btn-floating terciario" href="#imagenesActor" title="Imágenes"><i class="material-icons">image</i></a></li>
        <li><a class="btn-floating terciario" href="#videosActor" title="Películas"><i class="material-icons">videocam</i></a></li>
      </ul>
    </div>

  </div>
</template>

<script>
import M from "materialize-css";
import PeopleInfo from "./PeopleInfo";
import PeopleImagenes from "./PeopleImagenes";
import PeoplePeliculas from "./PeoplePeliculas";
import mixins from "./mixins.js";

export default {
  name: "PeopleDetail",

  components: {
    PeopleInfo,
    PeopleImagenes,
    PeoplePeliculas
  },

  mixins: [mixins],

  props: {
    person: null,
    imagenes: null,
    movies: null
  },

  mounted() {
    var elems = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elems, {});  
  },

};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: initial;
  margin-bottom: 100px;
}
</style>

<style>
.seccion {
  padding: 20px;
}

.titulo-seccion {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 40px;
}

.titulo-seccion .divider {
  height: 4px;
  background-color: #01b4e4;
}
</style>