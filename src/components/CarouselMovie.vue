<template>
  <div v-if="movies != null && movies.length > 0">

    <div class="titulo-carrusel">
      {{titulo}}
    </div>

    <div class="swiper-outer">         

      <div id="movie-left" class="swiper-left-arrow">
         <i class="material-icons small">navigate_before</i>
      </div>

      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(m, i) in movies" :key="i">        
          <div class="card hoverable">
            <div class="card-image">
                <img loading="lazy" class="swiper-lazy" :src="srcPoster(m)" @click="goTo(m)" alt="" />
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
            <div class="card-content">
                <strong>{{m.title}}</strong>
                <br>
                {{fechaStr(m.release_date)}}
            </div>
          </div>
        </swiper-slide>
      </swiper>      
      <div id="movie-right" class="swiper-right-arrow">
         <i class="material-icons small">navigate_next</i>
      </div>   
    </div>
    <div id="movie-pagination" class="carrusel-pagination"></div>
  </div>
</template>

<script>
import mixins from "./mixins.js";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


export default {
  name: "CarouselMovie",

  mixins: [mixins],

  props: {
    movies: Array,
    titulo: null,
  },

  components: {
    Swiper,
    SwiperSlide
  },

  data() {
    return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 5,
          slidesPerGroup: 5,
          loop: false,
          lazy: true,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '#movie-pagination',
            type: 'fraction'
          },
          navigation: {
            nextEl: '#movie-right',
            prevEl: '#movie-left'
          },
          breakpoints: {
            1400: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: 10
            },            
            1200: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 10
            },            
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 10
            },
            120: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 5
            }          
          },
        }
    }
  },  

  methods: {
    goTo: function (m) {
      this.$router
        .push({ name: "MovieDetail", params: { idMovie: m.id } })
        .catch(() => {});
    },
    fechaStr(fecha) {
        return fecha != null ? new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    },
  },

};
</script>
