<template>
  <!-- INFO -->
  <div class="row seccion">

    <!-- NOMBRE -->
    <div class="titulo-ficha secundario-texto">
      <div><i class="material-icons medium" style="vertical-align: middle;">person</i>&nbsp;{{person.name}}</div>          
      <div class="divider"></div>
    </div>       

    <!-- POSTER -->  
    <div class="col s12 m3">
      <img class="responsive-img materialboxed poster" :src="srcPosterPerson(person)" :data-caption="person.name" />
    </div>    

    <!-- INFO -->
    <div class="col s12 m9">
      <ul class="collection">      
        <li class="collection-item" v-if="birthdayLocalDate(person) != ''"><div v-html="`Nacimiento: <strong> ${birthdayLocalDate(person)} </strong>`"/></li>   
        <li class="collection-item" v-if="agePerson(person) != null"><div v-html="`Edad: <strong> ${agePerson(person)} años </strong>`"/></li>   
        <li class="collection-item" v-if="deathdayLocalDate(person) != ''"><div v-html="`Fallecimiento: <strong> ${deathdayLocalDate(person)} </strong>`"/></li>   
        <li class="collection-item" v-if="person.place_of_birth != null && person.place_of_birth != ''"><div v-html="`Lugar de nacimiento: <strong> ${person.place_of_birth} </strong>`"/></li>   
        <li class="collection-item" v-if="person.biography != null && person.biography != ''">
          <blockquote>{{person.biography}}</blockquote>
        </li>       
      </ul>
    </div>

</div>  
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "PeopleInfo",

  mixins: [mixins],

  props: {
    person: null,
  },

}
</script>
