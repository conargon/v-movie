<template>
  <div v-if="peopleList
   != null && peopleList
  .length > 0">

    <div class="cabecera-carousel" v-if="titulo != null && titulo != ''">
      <div class="titulo-carrusel">
        {{titulo}}
      </div>
      <div class="switch">        
        <label>          
          <span>{{diario ? 'Hoy' : 'Esta semana'}}</span>        
          <input type="checkbox"  v-model="diario">
          <span class="lever"></span>
        </label>
      </div>
    </div>    

    <div class="swiper-outer">         

      <div id="peopleList-left" class="swiper-left-arrow">
         <i class="material-icons small">navigate_before</i>
      </div>

      <swiper class="swiper" :options="swiperOption" ref="swiperPeople">
        <swiper-slide v-for="(m, i) in peopleList" :key="i">        
          <div class="card hoverable">
            <div class="card-image">
                <img class="swiper-lazy" :src="srcPosterPerson(m)" @click="goTo(m)" alt="" />
                <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
            <div class="card-content">
                <strong>{{m.name}}</strong>
                <div style="font-style: italic;" v-if="m.character !== undefined">
                  {{m.character != null && m.character != "" ? m.character : "-"}}
                </div>
                <div style="font-style: italic;" v-if="m.job !== undefined">
                  {{m.job != null && m.job != "" ? m.job : "-"}}
                </div>                
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

  watch: {
    diario: function(val) {
      this.$emit('changeFilterDiario', val ? 'day' : 'week');
    }
  },

  data() {
    return {
        diario: true,
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 5,
          slidesPerGroup: 5,
          loop: false,
          lazy: true,
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
              spaceBetween: 10,
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
