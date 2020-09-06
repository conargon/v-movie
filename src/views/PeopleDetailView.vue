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
        v-bind:movies="movies" 
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
            movies: null,
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
                    this.findMovies(idPerson)
                }
            )
            .catch(
                e => console.log(e)
            )         
      },      
      findMovies: function(idPerson, language) {
          axios
            .get('https://api.themoviedb.org/3/discover/movie?api_key=91e88eab577c30d2e4546d14c947362a&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1' 
                    + '&with_cast=' + idPerson
                    + '&language=' + language)
            .then(
                response => {
                    this.movies = response.data;
                    if(this.movies != null) {
                            this.movies.results = this.movies.results.filter( e => e.poster_path != null);
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
  },
  mounted() {
        window.scrollTo(0,0);
  }    
}
</script>