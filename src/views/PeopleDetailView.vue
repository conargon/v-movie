<template>
  <div>
    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>
    <PeopleDetail v-else :person="person" />  
  </div>
</template>

<script>
import axios from 'axios';
import PeopleDetail from '@/components/PeopleDetail'

export default {
    
    name: 'PeopleView',

    components: {
        PeopleDetail,
    },    

    data: () => {
        return { 
            person: null,
            loading: true
        }
    },

    methods: {
      // TODO usar api para recuperar la config.
      findCredit: function(idCredit) {
          this.loading = true;
          axios
            .get('https://api.themoviedb.org/3/credit/' + idCredit + '?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES')
            .then(
                response => {                    
                    let credit = response.data;
                    if(credit != null && credit.person != null) {
                        this.findPerson(credit.person.id, 'es-ES')
                    }
                }
            )
            .catch(
                e => console.log(e)
            )
      },
      findPerson: function(idPerson, language) {
          this.loading = true;
          axios
            .get('https://api.themoviedb.org/3/person/' + 
                    idPerson +
                    "?api_key=91e88eab577c30d2e4546d14c947362a" +
                    "&language=" + language +
                    "&append_to_response=credits,videos,images" +
                    "&include_image_language=es,null")                    
            .then(
                response => {
                    this.person = response.data;
                    if(this.person != null && this.person.credits != null && this.person.credits.cast != null) {
                        this.person.credits.cast = this.person.credits.cast.sort(function(a,b){
                        return new Date(a.release_date) - new Date(b.release_date);
                        });
                    }                    
                    if(language == 'es-ES' && (this.person.biography == null || this.person.biography == '')) {
                        this.findPerson(idPerson, 'en-US');
                    }
                }
            )
          .catch((e) => console.log(e))
          .finally((this.loading = false));
      }
    },  

  created () {
      if (this.$route.params.type == 'credit') {
        this.findCredit(this.$route.params.idPeople);
      } else {
        this.findPerson(this.$route.params.idPeople, 'es-ES')
      }
  },

  mounted() {
        window.scrollTo(0,0);
  }    
  
}
</script>