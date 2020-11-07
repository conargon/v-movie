<template>
  <div class="container-carrusel" v-if="peopleList
   != null && peopleList
  .length > 0">

    <div class="titulo-carrusel">
      {{titulo}}
    </div>

    <div class="swiper-outer">         

      <div id="peopleList-left" class="swiper-left-arrow">
         <i class="material-icons small">navigate_before</i>
      </div>

      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(m, i) in peopleList" :key="i">        
          <div class="card hoverable">
            <div class="card-image">
                <img class="imgSwiper" :src="srcPosterPerson(m)" @click="goTo(m)" alt="" />
            </div>
            <div class="card-content">
                <strong>{{m.name}}</strong>
            </div>
          </div>
        </swiper-slide>
      </swiper>      
      <div id="peopleList-right" class="swiper-right-arrow">
         <i class="material-icons small">navigate_next</i>
      </div>   
    </div>
    <div id="peopleList-pagination" class="carrusel-pagination"></div>
  </div>
</template>

<script>
import mixins from "./mixins.js";
import 'swiper/css/swiper.min.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


export default {
  name: "CarouselPeople",

  mixins: [mixins],

  props: {
    peopleList: Array,
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
          loopFillGroupWithBlank: false,
          pagination: {
            el: '#peopleList-pagination',
            type: 'fraction'
          },
          navigation: {
            nextEl: '#peopleList-right',
            prevEl: '#peopleList-left'
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
        .push({ name: "PeopleDetail", params: { type: "person", idPeople: m.id } })
        .catch(() => {});
    },
    fechaStr(fecha) {
        return fecha != null ? new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    },
  },

};
</script>
