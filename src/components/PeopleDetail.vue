<template>
  <div class="container">

    <!-- INFO DEL ACTOR --> 
    <div class="card" v-if="person != null">     
      <div class="card-content">
        <PeopleInfo id="infoPeople" :person="person" />
        <PeopleImagenes id="imagenesPeople" :person="person" />
        <PeopleCreditos id="creditosPeople" :person="person" /> 
      </div>

    </div>

    <!-- BOTONERA -->
    <div id="btnFabPeople" class="fixed-action-btn">
      <a class="btn-floating btn-large secundario" @click="openFab">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#infoPeople'" title="Ficha"><i class="material-icons">movie</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#imagenesPeople'" title="Imágenes"><i class="material-icons">image</i></a></li>
        <li><a class="btn-floating terciario" href="#" v-scroll-to="'#creditosPeople'" title="Créditos"><i class="material-icons">videocam</i></a></li>
        <li><a class="btn-floating terciario" href="#" @click.stop="$router.back()" title="Volver"><i class="material-icons">keyboard_backspace</i></a></li>
      </ul>
    </div>

  </div>
</template>

<script>
import M from "materialize-css";
import PeopleInfo from "./PeopleInfo";
import PeopleImagenes from "./PeopleImagenes";
import PeopleCreditos from "./PeopleCreditos";
import mixins from "./mixins.js";

export default {
  name: "PeopleDetail",

  components: {
    PeopleInfo,
    PeopleImagenes,
    PeopleCreditos
  },

  mixins: [mixins],

  props: {
    person: null
  },

  methods: {
    openFab() {
      let elem = document.getElementById("btnFabPeople");
      var instance = M.FloatingActionButton.getInstance(elem);
      if(instance == undefined) {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
        instance = M.FloatingActionButton.getInstance(elem);
      }
      instance.open();
    }
  },

  mounted() {
    var elems = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elems, {});  
  },

};
</script>

<style scoped>

.card .card-content {
    font-size: 1rem;
    text-align: left;
    color: black;
    background: initial;
}

</style>