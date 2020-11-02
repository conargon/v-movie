<template>
  <!-- INFO -->
  <div class="row seccion">

    <!-- TITULO DE LA SERIE Y LOGO DE LA PRODUCTORA  -->
    <div class="titulo-seccion secundario-texto">
      <div v-if="srcLogoProductoraTv(serieTv) != null && srcLogoProductoraTv(serieTv) != ''">
        <img class="responsive-img right" :src="srcLogoProductoraTv(serieTv)" style="height:48px;margin-left:40px;margin-right:20px;" />
      </div>
      <div><i class="material-icons medium" style="vertical-align: middle;">tv</i>&nbsp;{{serieTv.name}} {{anyoLanzamientoSerieTv(serieTv)}}</div>          
      <div class="divider"></div>
    </div>      

    <!-- POSTER -->
    <div class="col s12 m3">
      <img class="responsive-img materialboxed poster" :src="srcPoster(serieTv)" :data-caption="serieTv.name" />
    </div>

    <!-- FICHA -->
    <div class="col s12 m9">
      <ul class="collection">      
        <li class="collection-item"><div v-html="`Título original: <strong> ${tituloOriginalTv(serieTv)} </strong>`"/></li> 
        <li class="collection-item"><div v-html="`Lanzamiento: <strong>${fechaLanzamientoTv(serieTv)}</strong>`"/></li>
        <li class="collection-item"><div v-html="`Última emisión: <strong>${fechaUltimaEmisionTv(serieTv)}</strong>`"/></li>
        <li class="collection-item"><div v-html="`Temporadas: <strong>${serieTv.number_of_seasons}</strong>`"/></li>
        <li class="collection-item"><div v-html="`Capítulos: <strong>${serieTv.number_of_episodes}</strong>`"/></li>
        <li class="collection-item"><div v-html="`Creado por: <strong>${creadores(serieTv)}</strong>`"/></li>
        <!-- <li class="collection-item"><div v-html="`Último capítulo: <strong>${serieTv.last_episode_to_air.name}</strong><br>${serieTv.last_episode_to_air.overview}`"/></li> -->
        <li class="collection-item" v-if="serieTv.homepage != null && serieTv.homepage != ''"> 
          <p>
            Página principal:
            <a :href="serieTv.homepage" target="_blank" class="text-decoration-none">{{serieTv.homepage}}</a>
          </p>
        </li>           
        <li class="collection-item">Valoración:
          <div style="display:inline; vertical-align: middle;">
              <i class="material-icons tiny" :style="i<=Math.round(serieTv.vote_average/2) ? 'color:#fdd835' : 'color:#424242'" 
                  v-for="i in 5" :key="i">star</i>
          </div>
           <strong>&nbsp;{{serieTv.vote_average}}</strong>
        </li>
        <li class="collection-item">
          Temática:&nbsp;&nbsp;&nbsp; 
          <span v-for="g in serieTv.genres" :key="g.id">
            <div class="chip green white-text">{{g.name}}</div>
          </span>
        </li>
        <li class="collection-item" v-if="serieTv.overview != ''" >
          <blockquote>
            <p>{{serieTv.overview}}</p>
            </blockquote>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixins from "./mixins.js";
import M from "materialize-css";

export default {
  name: "TvInfo",

  mixins: [mixins],

  props: {
    serieTv: null
  },

  methods: {
    srcLogoProductoraTv: function(serieTv) {
        var firstCompany = this.firstCompany(serieTv)
        return serieTv != null && firstCompany != null && firstCompany.logo_path != null ?
            "http://image.tmdb.org/t/p/original" + firstCompany.logo_path :
            "";
    },
    tituloOriginalTv: function(serieTv) {
        return serieTv != null ?
            serieTv.original_name + " " + (serieTv.origin_country != null && serieTv.origin_country.length > 0 ? '(' + serieTv.origin_country[0] + ')' : '') :
            "";
    },        
    fechaLanzamientoTv: function(serieTv) {
        return serieTv != null ? this.fechaStr(serieTv.first_air_date) : '';
    },
    fechaUltimaEmisionTv: function(serieTv) {
        return serieTv != null ? this.fechaStr(serieTv.last_air_date) : '';
    },
    creadores: function(serieTv)  {
        if(serieTv != null) {
           return serieTv.created_by.map(e => e.name).join(', ');
        } else {
          return "";
        }
    }
  },

  mounted() {
    const imgLightBox = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(imgLightBox, {
      inDuration: 500,
      outDuration: 500
    });
  }  
};
</script>

<style scoped>
.titulo-seccion {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 40px; 
}

.poster {
  border-radius: 8px;
}

</style>