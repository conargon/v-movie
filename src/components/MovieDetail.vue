<template>
    <v-container fluid  >
        <v-layout>
            <v-flex>
                <v-card>    
                    <v-container fluid>
                        <v-row dense>

                            <v-col cols="12" sm="3">          
                                <v-carousel hide-delimiters height="auto">
                                    <v-carousel-item
                                        :src="srcPoster" 
                                        contain
                                        height="600"
                                        max-height="600">
                                    </v-carousel-item>                                            
                                    <v-carousel-item
                                        v-for="(item,i) in images"
                                        :key="i"
                                        :src="'http://image.tmdb.org/t/p/original' + item.file_path"     
                                        contain                                   
                                        height="600"
                                        max-height="600">
                                    </v-carousel-item>
                                </v-carousel>                                  
                            </v-col>                               

                            <v-col cols="12" sm="9">
                  
                                <v-card-title class="pa-1 pl-4">  
                                    <v-container class="pa-0 ma-0">
                                        <p class="text-title font-weight-bold pa-0 ma-0" style="word-break: normal;">{{movie.title}}</p>
                                    </v-container>          
                                    <v-container class="pa-0 ma-0" v-if="firstCompany != null && firstCompany.logo_path != null">       
                                        <v-img :src="'http://image.tmdb.org/t/p/original' + firstCompany.logo_path" max-height="32" max-width="100" contain position="left"/>   
                                    </v-container>
                                </v-card-title>   

                                <v-container class=" pl-4">
                                    <span v-for="g in movie.genres" :key="g.id">
                                        <v-chip class="mr-2" color="green" text-color="white">{{g.name}}</v-chip>
                                    </span>  
                                </v-container>  

                                <v-card-title class="pa-1 pl-4"> 
                                    <v-container class="pa-0 ma-0">                       
                                        <p class="text-subtitle-2" style="word-break: normal;">
                                            Título original: {{movie.original_title}} {{movie.production_countries.length > 0? '(' + movie.production_countries[0].name +')' : ''}}
                                        </p>
                                    </v-container>
                                    <v-container class="pa-0 ma-0">
                                        <p class="text-subtitle-2" style="word-break: normal;">Duración: {{movie.runtime}} minutos</p>
                                    </v-container>
                                    <v-container class="pa-0 ma-0">                       
                                        <p class="text-subtitle-2" style="word-break: normal;">Año de producción: {{movie.release_date != null ? movie.release_date.substr(0,4) : ''}}</p>
                                    </v-container>
                                    <v-container class="pa-0 ma-0" v-if='firstCompany != null'> 
                                        <p class="text-subtitle-2" style="word-break: normal;">
                                            Producción: {{firstCompany.name}}
                                        </p>                                        
                                    </v-container>     
                                    <v-container class="pa-0 ma-0" v-if='director.length > 0'> 
                                        <p class="text-subtitle-2" style="word-break: normal;">
                                            Dirección: {{director[0].name}}
                                        </p>                                        
                                    </v-container>                                                                          
                                    <v-container class="pa-0 ma-0"> 
                                        <p class="text-subtitle-2" style="word-break: normal;">Valoración: <v-icon small color="amber">mdi-star</v-icon>&nbsp;{{movie.vote_average}}</p>   
                                    </v-container>                             
                                </v-card-title>                               

                                <v-card-title class="pa-1 pl-4" v-if="movie.overview != null && movie.overview != ''">                        
                                    <p class="text-subtitle-1" style="word-break: normal;">
                                        {{movie.tagline != null && movie.tagline != '' ? movie.tagline : 'Resumen'}}
                                    </p>
                                </v-card-title>

                                <v-card-subtitle class="pa-1 pl-4">
                                    <p>{{movie.overview}}</p>
                                </v-card-subtitle>                             

                                <v-card-title class="pa-1 pl-4" v-if="movie.homepage != null && movie.homepage != ''">                        
                                    <p class="text-subtitle-2" style="word-break: normal;">Página principal</p>
                                </v-card-title>

                                <v-card-subtitle class="pa-1 pl-4">
                                    <a :href="movie.homepage" target="_blank" class="text-decoration-none">{{movie.homepage}}</a>
                                </v-card-subtitle>    

                                <!-- ACTORES -->
                                <v-card-title class="pa-1 pl-4" v-if="people != null && people.length > 0">                        
                                    <p class="text-subtitle-1" style="word-break: normal;">Reparto</p>
                                </v-card-title>

                               <carousel :perPageCustom="[[400, 1], [768, 2], [1024, 6], [1200, 10]]" scrollPerPage navigationEnabled class="ma-0 pa-0 ml-10 mr-10" v-if="people != null">
                                    <slide v-for="(p,i) in people" :key="i">
                                        <v-container fluid grid-list-xs>
                                            <v-layout>
                                                <v-flex>
                                                    <Credit v-bind:credit="p" />
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </slide>
                                </carousel>                                   

                            </v-col>

                            <!-- ACTORES 
                            <v-col cols="12">
                               <carousel perPage="20" scrollPerPage navigationEnabled class="ml-10 mr-10">
                                    <slide v-for="(p,i) in people" :key="i">
                                        <v-container fluid grid-list-sm>
                                            <v-layout>
                                                <v-flex>
                                                    <Credit v-bind:credit="p" />
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </slide>
                                </carousel>                             
                            </v-col>-->

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
import Credit from '@/components/Credit';
import { Carousel, Slide } from "vue-carousel";

export default {

    name: 'MovieDetail',
    components: {
        Credit,
        Carousel,
        Slide,        
    },
    props: {
        movie: Object,
        images: Array,
        people: Array,
        director: Array
    },
    data() {
        return {
            items: null
        }
    },
    computed: {
        srcPoster: function() {
            return this.movie.poster_path != null 
                            ? 'http://image.tmdb.org/t/p/w342' + this.movie.poster_path 
                            : './no-poster.jpg'
        },
        backdrop: function() {
            return this.movie.backdrop_path != null 
                            ? 'http://image.tmdb.org/t/p/w342' + this.movie.backdrop_path 
                            : './no-poster.jpg'
        },
        firstCompany: function() {
            if(this.movie.production_companies != null && this.movie.production_companies.length > 0) {
                for(var i=0; i < this.movie.production_companies.length; i++) {
                    if(this.movie.production_companies[i].logo_path != null && this.movie.production_companies[i].logo_path != '') {
                        return this.movie.production_companies[i];
                    }
                }
                return this.movie.production_companies.length > 0 ? this.movie.production_companies[0] : null;
            } else {
                return null;
            }            
        }
    }

}
</script>
