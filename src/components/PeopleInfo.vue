<template>
<div class="row" id="infoPeople" v-if="credit != null && person != null">

    <!-- NOMBRE -->
    <div class="col s12">    
        <h5>{{credit.person.name}}</h5>
    </div>

    <!-- POSTER -->  
    <div class="col s12 m6">    
        <img :src="srcPosterPerson(credit)">
    </div>

    <!-- INFO -->
    <div class="col s12 m6">  
        <section>
            Nacimiento: {{birthdayLocalDate(person)}}
        </section>
        <section>
            Fallecimiento: {{deathdayLocalDate(person)}} 
        </section>   
        <section>
            Lugar de nacimiento: {{person.place_of_birth}}
        </section>   
        <section>
            {{person.biography}}
        </section>        
    </div>    
</div>  
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "PeopleInfo",

  mixins: [mixins],

  props: {
    credit: null,
    person: null,
  },

}
</script>