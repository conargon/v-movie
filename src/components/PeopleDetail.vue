<template>
    <v-container fluid>
    <v-layout>
        <v-flex>
            <v-card>    
                <v-container fluid>
                    <v-row dense>

                        <v-col cols="12" sm="2" v-if="credit.person.profile_path != null">  
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
                                <v-container  class="ma-0 pa-0" v-if="person != null && person.deathday != null">                       
                                    <p class="text-subtitle-2" style="word-break: normal;">
                                        Fallecimiento: <span class="sb_val">{{deathdayLocalDate}}</span>
                                    </p>
                                </v-container>                                
                                <v-container  class="ma-0 pa-0" v-if="person != null && person.place_of_birth != null">
                                    <p class="text-subtitle-2" style="word-break: normal;">Lugar de nacimiento: <span class="sb_val">{{person.place_of_birth}}</span></p>
                                </v-container>                        
                            </v-card-title>  

                            <v-card-title class="mt-0 pt-0 mb-0 pb-0" v-if="person != null && person.biography != null && person.biography != ''">                        
                                <p class="text-subtitle-1" style="word-break: normal;">Biografia</p>
                            </v-card-title>                            

                            <v-card-subtitle v-if="person != null && person.biography != null && person.biography != ''">
                                <p class="text-justify">{{person.biography}}</p>
                            </v-card-subtitle> 


                            <v-card-title class="mt-0 pt-0 mb-0 pb-0" v-if="person != null && person.biography != null && person.biography != ''">                        
                                <p class="text-subtitle-1" style="word-break: normal;">Otras películas</p>
                            </v-card-title>                             
                            
                        </v-col>

                        <v-col cols="12">
                            <!-- OTRAS PELICULAS -->     
                            <v-container fluid grid-list-md>
                                <v-layout row wrap>           
                                    <v-flex xs12 sm6 lg4 v-for="k in credit.person.known_for" :key="k.id">
                                        <v-card :to="{ name: 'MovieDetail', params: { idMovie: k.id }}">
                                            <v-container fluid>
                                                <v-row dense>
                                                    <v-col cols="12">
                                                        <v-card-title class="ma-0 pa-0 ">                                    
                                                                <p class="text-title fluid text-centered" style="word-break: normal;">{{k.title}}</p>
                                                        </v-card-title>
                                                    </v-col>
                                                </v-row>
                                                <v-row dense>
                                                    <v-col cols="12" sm="6" class="ma-0 pa-0">
                                                        <v-img :src="'http://image.tmdb.org/t/p/original' + k.poster_path" max-height="250" :contain="true"></v-img>                                                                
                                                    </v-col>
                                                    <v-col cols="12" sm="6">                                                       
                                                        <v-card-subtitle class="ma-0 pa-0">                                                                                                                                                                
                                                                <p class="text-subtitle" style="word-break: normal;">{{k.overview}}</p>
                                                        </v-card-subtitle>      
                                                    </v-col>                                                    
                                                </v-row>
                                            </v-container>
                                        </v-card>
                                    </v-flex>             
                                </v-layout>                
                            </v-container>    
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

</v-container>
</template>

<script>

export default {
    name: 'PeopleDetail',
    /*components: {
        MovieGrid
    },*/
    props: {
            credit: Object,
            person: Object
    },
    computed: {
        birthdayLocalDate() {
            return this.person != null && this.person.birthday != null ? new Date(this.person.birthday).toLocaleDateString('es-ES') : '';
        },
        deathdayLocalDate() {
            return this.person != null && this.person.deathday != null ? new Date(this.person.deathday).toLocaleDateString('es-ES') : '';
        },
    },
}
</script>