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
                                    <p class="text-title font-weight-bold" style="word-break: normal;">{{movie.title}}</p>
                                </v-card-title>   

                                <v-card-title class="pa-1 pl-4">                        
                                    <p class="text-subtitle-2" style="word-break: normal;">Valoración</p>
                                </v-card-title>

                                <v-card-subtitle class="pa-1 pb-4 pl-4">
                                    <v-icon small color="amber">mdi-star</v-icon><span class="text-subtitle-2">&nbsp;{{movie.vote_average}}</span>
                                </v-card-subtitle>                                

                                <v-card-title class="pa-1 pl-4">                        
                                    <p class="text-subtitle-2" style="word-break: normal;">Título original</p>
                                </v-card-title>

                                <v-card-subtitle class="pa-1 pl-4">                        
                                    <p>{{movie.original_title}}</p>
                                </v-card-subtitle>    

                                <v-card-title class="pa-1 pl-4">                        
                                    <p class="text-subtitle-2" style="word-break: normal;">Año de producción</p>
                                </v-card-title>

                                <v-card-subtitle class="pa-1 pl-4">                        
                                    <p>{{movie.release_date != null ? movie.release_date.substr(0,4) : ''}}</p>
                                </v-card-subtitle>                                   

                                <v-card-title class="pa-1 pl-4">                        
                                    <p class="text-subtitle-2" style="word-break: normal;">Resumen</p>
                                </v-card-title>

                                <v-card-subtitle class="pa-1 pl-4">
                                    <p>{{movie.overview}}</p>
                                </v-card-subtitle> 

                                <span v-for="g in movie.genres" :key="g.id">
                                    <v-chip class="ma-2" color="green" text-color="white">{{g.name}}</v-chip>
                                </span>                                

                                <v-card-subtitle class="pa-1 pl-4">
                                    <a :href="movie.homepage" target="_blank">{{movie.homepage}}</a>
                                </v-card-subtitle>  

                                <v-card-actions>
                                    <v-btn text color="primary" @click="$router.go(-1)">Volver</v-btn>
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
<!--                             <v-col cols="3">                    
                                <v-img 
                                    :src="backdrop" 
                                    contain
                                    max-height="500">
                                </v-img>   
                            </v-col>         
 -->   
                                   

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
    }

}
</script>
