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
export default {
    name: 'PeopleDetail',
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