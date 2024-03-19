<template>
  <div v-if="imageList != null && imageList.length > 0">

    <div class="titulo-carrusel">
      {{titulo}}
    </div>

    <div class="swiper-outer">         

      <div :id="'image-left-'+id" class="swiper-left-arrow">
         <i class="material-icons small">navigate_before</i>
      </div>   

      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(m, i) in imageList" :key="i">        
          <img class="responsive-img materialboxed hoverable" :src="srcImageOriginal(m)" alt="" />
        </swiper-slide>
      </swiper>    

      <div :id="'image-right-'+id" class="swiper-right-arrow">
         <i class="material-icons small">navigate_next</i>
      </div>   

    </div>
    <div :id="'image-pagination-'+id" class="carrusel-pagination"></div>
  </div>
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


export default {
  name: "CarouselImages",

  mixins: [mixins],

  props: {
    id: null,
    imageList: Array,
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
          autoHeight: true,
          loop: false,
          freeMode: true,
          loopFillGroupWithBlank: false,
          effect: 'slide',
          pagination: {
            el: '#image-pagination-'+this.id,
            type: 'fraction'
          },
          navigation: {
            nextEl: '#image-right-'+this.id,
            prevEl: '#image-left-'+this.id,
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

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
      M.Materialbox.init(imgLightBox, {
        inDuration: 500,
        outDuration: 500
      });
  },  

};
</script>

<style scoped>
.carrusel-pagination {
    bottom: 0 !important;
}

</style>