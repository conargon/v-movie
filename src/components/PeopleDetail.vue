<template>
<div>
  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s3"><a class="active" href="#infoPeople">Información</a></li>        
        <li class="tab col s3"><a href="#imagenesPeople">Imágenes</a></li>
        <li class="tab col s3"><a href="#peliculasPeople">Películas</a></li>
      </ul>
    </div>
  </div>    
  <PeopleInfo :credit="credit" :person="person"/>
  <PeopleImagenes :profiles="profiles"/>
  <PeoplePeliculas :movies="movies"/>
</div>  
</template>

<script>
import M from "materialize-css";
import PeopleInfo from "./PeopleInfo"
import PeopleImagenes from "./PeopleImagenes"
import PeoplePeliculas from "./PeoplePeliculas"

export default {
    name: 'PeopleDetail',
    components: {
        PeopleInfo,
        PeopleImagenes,
        PeoplePeliculas,
    },    
    props: {
            credit: null,
            person: null,
            profiles: null,
            movies: null
    },

    mounted() {
      var elems = document.querySelectorAll(".tabs");
      M.Tabs.init(elems, {});
    }    
}
</script>