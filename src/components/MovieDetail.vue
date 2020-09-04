<template>
  <v-container fluid v-if="movie != null">
    <v-layout>
      <v-flex>
        <v-card>            
          <v-container fluid>
            <v-row dense>

              <!-- TITULO DE LA PELICULA Y LOGO DE LA PRODUCTORA -->
              <v-col cols="12">

                <div class="pa-0 ma-0" style="float:left;">
                    <p
                      class="text-h5 font-weight-bold pa-0 ma-0 pt-1"
                      style="word-break: normal;"
                    >{{movie.title}}</p>
                </div>

                <div class="pa-0 ma-0" style="float:left;" v-if="firstCompany != null && firstCompany.logo_path != null">
                    <img
                      :src="'http://image.tmdb.org/t/p/original' + firstCompany.logo_path"
                      height="48"
                      max-height="48"
                      class="ml-4"
                      style="background-color: white;"
                    />       
                </div>

              </v-col>
            </v-row>

            

            <v-row dense>
              <v-tabs icons-and-text show-arrows>

                <v-tab>Información<v-icon>mdi-information</v-icon></v-tab>
                <v-tab>Reparto<v-icon>mdi-account</v-icon></v-tab>
                <v-tab>Imágenes<v-icon>mdi-image</v-icon></v-tab>
                <v-tab>Videos<v-icon>mdi-video</v-icon></v-tab>               

                <v-tab-item>
                  <v-container fluid  class="pa-0 ma-0">

                    <v-row dense>

                    <!-- POSTER -->  
                    <v-col cols="12" lg="3">
                      <v-img :src="srcPoster" contain max-height="600" position="top"></v-img>
                    </v-col>

                    <v-col cols="12" lg="9">
                      <v-card-title class="pa-1 pl-4">
                        <v-container class="pa-0 ma-0">
                          <p
                            class="text-subtitle-2"
                            style="word-break: normal;"
                          >Título original: {{movie.original_title}} {{movie.production_countries != null && movie.production_countries.length > 0 ? '(' + movie.production_countries[0].name +')' : ''}}</p>
                        </v-container>
                        <v-container class="pa-0 ma-0">
                          <p
                            class="text-subtitle-2"
                            style="word-break: normal;"
                          >Duración: {{movie.runtime}} minutos</p>
                        </v-container>
                        <v-container class="pa-0 ma-0">
                          <p
                            class="text-subtitle-2"
                            style="word-break: normal;"
                          >Año de producción: {{movie.release_date != null ? movie.release_date.substr(0,4) : ''}}</p>
                        </v-container>
                        <v-container class="pa-0 ma-0" v-if="firstCompany != null">
                          <p
                            class="text-subtitle-2"
                            style="word-break: normal;"
                          >Producción: {{firstCompany.name}}</p>
                        </v-container>
                        <v-container class="pa-0 ma-0" v-if="director != null && director.length > 0">
                          <p
                            class="text-subtitle-2"
                            style="word-break: normal;"
                          >Dirección: {{director[0].name}}</p>
                        </v-container>
                        <v-container class="pa-0 ma-0">
                          <p class="text-subtitle-2" style="word-break: normal;">
                            Valoración:
                            <v-icon small color="amber">mdi-star</v-icon>
                            &nbsp;{{movie.vote_average}}
                          </p>
                        </v-container>
                      </v-card-title>

                      <v-container class="pl-4">
                        <span v-for="g in movie.genres" :key="g.id">
                          <v-chip class="mr-2" color="green" text-color="white">{{g.name}}</v-chip>
                        </span>
                      </v-container>

                      <v-card-title
                        class="pa-1 pl-4"
                        v-if="movie.overview != null && movie.overview != ''"
                      >
                        <p
                          class="text-subtitle-1"
                          style="word-break: normal;"
                        >{{movie.tagline != null && movie.tagline != '' ? movie.tagline : 'Resumen'}}</p>
                      </v-card-title>

                      <v-card-subtitle class="pa-1 pl-4">
                        <p>{{movie.overview}}</p>
                      </v-card-subtitle>

                      <v-card-title
                        class="pa-1 pl-4"
                        v-if="movie.homepage != null && movie.homepage != ''"
                      >
                        <p class="text-subtitle-2" style="word-break: normal;">Página principal</p>
                      </v-card-title>

                      <v-card-subtitle class="pa-1 pl-4">
                        <a
                          :href="movie.homepage"
                          target="_blank"
                          class="text-decoration-none"
                        >{{movie.homepage}}</a>
                      </v-card-subtitle>

                    </v-col>

                    </v-row>
                  </v-container>
                </v-tab-item>

                <!-- REPARTO -->
                <v-tab-item>
                  <carousel
                    :perPageCustom="[[400, 1], [768, 2], [1024, 6], [1200, 10]]"
                    scrollPerPage
                    navigationEnabled
                    :paginationEnabled="$vuetify.breakpoint.smAndUp"
                    class="ma-0 pa-0 ml-10 mr-10"
                    v-if="people != null"
                  >
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
                </v-tab-item>

                <v-tab-item>
                  <carousel
                    :perPageCustom="[[400, 1], [768, 2], [1024, 6], [1200, 10]]"
                    scrollPerPage
                    navigationEnabled
                    :paginationEnabled="$vuetify.breakpoint.smAndUp"
                    class="ma-0 pa-0 ml-10 mr-10"
                    v-if="images != null"
                  >
                    <slide v-for="(item,i) in images" :key="i">
                      <v-container fluid grid-list-xs>
                        <v-layout>
                          <v-flex>                      
                            
                            <ImageMovie v-bind:image="item" />
                          </v-flex>
                        </v-layout>
                      </v-container>                            
                    </slide>
                  </carousel>
                </v-tab-item>                

                <!-- IMAGENES 
                <v-tab-item>
                  <v-carousel 
                    hide-delimiters 
                    height="auto"
                  >
                    <v-carousel-item
                      v-for="(item,i) in images"
                      :key="i"
                      :src="'http://image.tmdb.org/t/p/original' + item.file_path"
                      contain
                      height="600"
                      max-height="600"
                    ></v-carousel-item>
                  </v-carousel>
                </v-tab-item>-->

                <!-- VIDEOS -->         
                <v-tab-item>
                  <v-carousel hide-delimiters height="auto">
                    <v-carousel-item                     
                      v-for="v in videos"
                      :key="v.id"
                      v-html="srcVideo(v)"                  
                    ></v-carousel-item>
                  </v-carousel>
                </v-tab-item>
              </v-tabs>              

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
import Credit from "@/components/Credit";
import ImageMovie from "@/components/ImageMovie"
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "MovieDetail",
  components: {
    Credit,
    ImageMovie,
    Carousel,
    Slide,
  },
  props: {
    movie: null
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "Info", content: "Tab 1 Content" },
        { tab: "Reparto", content: "Tab 2 Content" },
        { tab: "Imágenes", content: "Tab 3 Content" },
        { tab: "Videos", content: "Tab 4 Content" },
      ],
    };
  },
  computed: {
    srcPoster: function () {
      return this.movie.poster_path != null
        ? "http://image.tmdb.org/t/p/w342" + this.movie.poster_path
        : "./no-poster.jpg";
    },
    backdrop: function () {
      return this.movie.backdrop_path != null
        ? "http://image.tmdb.org/t/p/w342" + this.movie.backdrop_path
        : "./no-poster.jpg";
    },
    firstCompany: function () {
      if (
        this.movie.production_companies != null &&
        this.movie.production_companies.length > 0
      ) {
        for (var i = 0; i < this.movie.production_companies.length; i++) {
          if (
            this.movie.production_companies[i].logo_path != null &&
            this.movie.production_companies[i].logo_path != ""
          ) {
            return this.movie.production_companies[i];
          }
        }
        return this.movie.production_companies.length > 0
          ? this.movie.production_companies[0]
          : null;
      } else {
        return null;
      }
    },
    images: function() {
        return this.movie.images != null ? this.movie.images.backdrops : null;
    },
    videos: function() {
        return this.movie.videos != null ? this.movie.videos.results : null;
    },
    people: function() {
        return this.movie.credits != null ? this.movie.credits.cast : null;
    },
    director: function() {
        return this.movie.credits != null ? this.movie.credits.crew.filter(e => e.job == 'Director') : null;
    },
  },
  methods: {
    srcVideo: function(item) {
      return "<div class='videoFrameWrapper'><div class='videoWrapper'><iframe src='https://www.youtube.com/embed/" + item.key + "' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe></div></div>";
    },
  }
};
</script>

<style>
.videoWrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
  overflow: hidden;
}

.videoWrapper iframe, 
.videoWrapper object, 
.videoWrapper embed
{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
  display: block !important;
  margin: 0 auto !important;  
}

.videoFrameWrapper {
    max-width: 800px;
    display: block !important;
    margin: 0 auto !important;
}

</style>