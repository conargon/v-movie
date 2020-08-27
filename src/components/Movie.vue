<template>
    <v-card 
        height="410" 
        :to="{ name: 'MovieDetail', params: { idMovie: movie.id }}"
        hover
    >                    
        <v-img 
            :src="srcPoster" 
            :contain="true"             
            max-height="300">
        </v-img>     
        <v-card-subtitle class="pa-1 pl-4">
            <v-icon small color="amber">mdi-star</v-icon><span class="text-subtitle-2">&nbsp;{{movie.vote_average}}</span>
        </v-card-subtitle>                    
        <v-card-title class="pa-1 pl-4">                        
            <p class="text-subtitle-2 font-weight-bold" style="word-break: normal;">{{movie.title}}</p>
        </v-card-title>                      
    </v-card>  
</template>

<script>
export default {
    name: 'Movie',
    props: {
        movie: Object
    },
    computed: {
        srcPoster: function() {
            return this.movie.poster_path != null 
                            ? 'http://image.tmdb.org/t/p/w342' + this.movie.poster_path 
                            : './no-poster.jpg'
        } 
    }
}
</script>
