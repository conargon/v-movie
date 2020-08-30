<template>
<v-container fluid  v-if="credit != null && person != null">
    <v-layout>
        <v-flex>
            <v-card>    
                <v-container fluid>
                    <v-row dense>

                        <v-col cols="12" sm="2">  
                            <v-img :src="'http://image.tmdb.org/t/p/original' + credit.person.profile_path" contain max-height="400">
                            </v-img>
                        </v-col>

                        <v-col cols="12" sm="10">  

                            <v-card-title>  
                                <p class="text-title font-weight-bold" style="word-break: normal;">{{credit.person.name}}</p>
                            </v-card-title>                                                                                    

                            <v-card-title class="mt-0 pt-0 mb-0 pb-0"> 
                                <v-container class="ma-0 pa-0">                       
                                    <p class="text-subtitle-2" style="word-break: normal;">
                                        Nacimiento: <span class="sb_val">{{birthdayLocalDate}}</span>
                                    </p>
                                </v-container>
                                <v-container  class="ma-0 pa-0" v-if="person.deathday != null">                       
                                    <p class="text-subtitle-2" style="word-break: normal;">
                                        Fallecimiento: <span class="sb_val">{{deathdayLocalDate}}</span>
                                    </p>
                                </v-container>                                
                                <v-container  class="ma-0 pa-0">
                                    <p class="text-subtitle-2" style="word-break: normal;">Lugar de nacimiento: <span class="sb_val">{{person.place_of_birth}}</span></p>
                                </v-container>                        
                            </v-card-title>  

                            <v-card-title class="mt-0 pt-0 mb-0 pb-0" v-if="person.biography != null && person.biography != ''">                        
                                <p class="text-subtitle-1" style="word-break: normal;">Biografia</p>
                            </v-card-title>                            

                            <v-card-subtitle>
                                <p class="text-justify">{{person.biography}}</p>
                            </v-card-subtitle> 

                        </v-col>

                        <v-col cols="12">
                            <v-card-actions>
                                <v-container class="pa-4 ma-0 text-center" fluid>
                                    <v-btn color="primary" @click="$router.go(-1)">Volver</v-btn>
                                </v-container>
                            </v-card-actions>                                     
                        </v-col>

                    </v-row>

                </v-container>
            </v-card> 


         

        </v-flex>
    </v-layout>

    <!-- <carousel >
        <slide v-for="(m,i) in credit.known_for" :key="i">
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
            <v-flex>
                <Movie v-bind:movie="m" />
            </v-flex>
            </v-layout>
        </v-container>
        </slide>
    </carousel>    -->

</v-container>
</template>

<script>
import axios from 'axios';
// import { Carousel, Slide } from "vue-carousel";
// import Movie from "@/components/Movie";

export default {
    
    name: 'PeopleView',
    // components: {
    //     Movie,
    //     Carousel,
    //     Slide,
    // },    
    data: () => {
        return { 
            credit: null,
            person: null
        }
    },
    computed: {
        birthdayLocalDate() {
            return new Date(this.person.birthday).toLocaleDateString('es-ES');
        },
        deathdayLocalDate() {
            return new Date(this.person.deathday).toLocaleDateString('es-ES');
        },
    },
    methods: {
      // TODO usar api para recuperar la config.
      findCredit: function(idCredit) {
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
                }
            )
            .catch(
                e => console.log(e)
            )
      },      
    },  

  created () {
    this.findCredit(this.$route.params.idPeople);
  }    
}
</script>