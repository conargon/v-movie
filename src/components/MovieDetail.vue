<template>
    <v-container fluid  v-if="movie != null">
        <v-layout>
            <v-flex>
                <v-card>    
                    <v-container fluid>
                        <v-row dense>

                            <v-col cols="5">          
                                <v-carousel hide-delimiters height="auto">
                                    <v-carousel-item
                                        :src="srcPoster" 
                                        contain
                                        max-height="600">
                                    </v-carousel-item>                                            
                                    <v-carousel-item
                                        v-for="(item,i) in images"
                                        :key="i"
                                        :src="'http://image.tmdb.org/t/p/original' + item.file_path">
                                    </v-carousel-item>
                                </v-carousel>                                  
                            </v-col>                               

                            <v-col cols="5">
                  
                                <v-card-title class="pa-1 pl-4">  
                                    <v-container class="pa-0 ma-0">
                                        <p class="text-title font-weight-bold pa-0 ma-0" style="word-break: normal;">{{movie.title}}</p>
                                    </v-container>          
                                    <v-container class="pa-0 ma-0" v-if="firstCompany != null && firstCompany != ''">       
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
                                            Título original: <span class="sb_val">{{movie.original_title}} {{movie.production_countries.length > 0? '(' + movie.production_countries[0].name +')' : ''}}</span>
                                        </p>
                                    </v-container>
                                    <v-container class="pa-0 ma-0">
                                        <p class="text-subtitle-2" style="word-break: normal;">Duración: <span class="sb_val">{{movie.runtime}} minutos</span></p>
                                    </v-container>
                                    <v-container class="pa-0 ma-0">                       
                                        <p class="text-subtitle-2" style="word-break: normal;">Año de producción: <span class="sb_val">{{movie.release_date != null ? movie.release_date.substr(0,4) : ''}}</span></p>
                                    </v-container>
                                    <v-container class="pa-0 ma-0" v-if='firstCompany != null'> 
                                        <p class="text-subtitle-2" style="word-break: normal;">
                                            Producción: <span class="sb_val">{{firstCompany.name}}</span>                                            
                                        </p>                                        
                                    </v-container>                                           
                                    <v-container class="pa-0 ma-0"> 
                                        <p class="text-subtitle-2" style="word-break: normal;">Valoración: <v-icon small color="amber">mdi-star</v-icon>&nbsp;<span class="sb_val">{{movie.vote_average}}</span></p>   
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
                                    <a :href="movie.homepage" target="_blank">{{movie.homepage}}</a>
                                </v-card-subtitle>    

                                <v-card-actions>
                                    <v-container class="pa-4 ma-0 text-center" fluid>
                                        <v-btn color="primary" @click="$router.go(-1)">Volver</v-btn>
                                    </v-container>
                                </v-card-actions>                                

                            </v-col>

                            <v-col cols="2">
                                <v-card-subtitle class="pa-1 pl-4" v-for="p in people" :key="p.cast_id">                                                     
                                    <v-avatar 
                                        v-if="p.profile_path != null">
                                        <img
                                            :src="'http://image.tmdb.org/t/p/original' + p.profile_path"
                                        >
                                    </v-avatar>
                                    <span class="text-xs-caption">&nbsp;{{p.name}}</span>
                                </v-card-subtitle>
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
    name: 'MovieDetail',
    props: {
        movie: Object,
        images: Array,
        people: Array
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
            if(this.movie.production_companies.length > 0) {
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

<style scoped>
    .sb_val {
        color: rgba(0, 0, 0, 0.6) !important;
    }
</style>