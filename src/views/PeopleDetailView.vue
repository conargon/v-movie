<template>
    <v-progress-linear
      v-if="loading"  
      indeterminate
      color="cyan"
    ></v-progress-linear>
    <PeopleDetail 
        v-else
        v-bind:credit="credit" 
        v-bind:person="person" 
        v-bind:images="images" 
        />  
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
            credit: null,
            person: null,
            images: [],
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
                    this.credit = response.data;
                    if(this.credit != null && this.credit.person != null) {
                        this.findPerson(this.credit.person.id, 'es-ES')
                    }
                }
            )
            .catch(
                e => console.log(e)
            )
      },
      findPerson: function(idPerson, language) {
          axios
            .get('https://api.themoviedb.org/3/person/' + idPerson + '?api_key=91e88eab577c30d2e4546d14c947362a&language=' + language)
            .then(
                response => {
                    this.person = response.data;
                    if(language == 'es-ES' && (this.person.biography == null || this.person.biography == '')) {
                        this.findPerson(idPerson, 'en-US');
                    }
                    this.findImages(idPerson)
                }
            )
            .catch(
                e => console.log(e)
            )         
      },      
      findImages: function(idPerson) {
          axios
            .get('https://api.themoviedb.org/3/person/' + idPerson + '/images?api_key=91e88eab577c30d2e4546d14c947362a')
            .then(
                response => {
                    this.images = response.data.profiles;
                }
            )
            .catch(
                e => console.log(e)
            )
            .finally(
                this.loading = false
            )            
      },            
    },  

  created () {
    this.findCredit(this.$route.params.idPeople);
  }    
}
</script>