<template>
  <div v-if="seriesTv != null && seriesTv.length > 0">

    <div class="titulo-carrusel">
      {{titulo}}
    </div>

    <div class="swiper-outer">         

      <div id="tv-left" class="swiper-left-arrow">
         <i class="material-icons small">navigate_before</i>
      </div>

      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(m, i) in seriesTv" :key="i">        
          <div class="card hoverable">
            <div class="card-image">
                <img loading="lazy" class="swiper-lazy" :src="srcPoster(m)" @click="goTo(m)" alt="" />
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
            <div class="card-content">
                <strong>{{m.name}}</strong>
                <br>
                {{fechaStr(m.first_air_date)}}
            </div>
          </div>
        </swiper-slide>
      </swiper>      
      <div id="tv-right" class="swiper-right-arrow">
         <i class="material-icons small">navigate_next</i>
      </div>   
    </div>
    <div id="tv-pagination" class="carrusel-pagination"></div>
  </div>
</template>

<script>
import mixins from "./mixins.js";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


export default {
  name: "CarouselTv",

  mixins: [mixins],

  props: {
    seriesTv: Array,
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
            el: '#tv-pagination',
            type: 'fraction'
          },
          navigation: {
            nextEl: '#tv-right',
            prevEl: '#tv-left'
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
        .push({ name: "TvDetail", params: { idSerieTv: m.id } })
        .catch(() => {});
    },
    fechaStr(fecha) {
        return fecha != null ? new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    },
  },

};
</script>
