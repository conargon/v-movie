<template>
    <!-- REPARTO -->
    <div class="row seccion" v-if="people(serieTv) != null && people(serieTv).length > 0">
      <div class="titulo-seccion secundario-texto">
        <div>Reparto de {{serieTv.name}}</div>
        <div class="divider"></div>
      </div>
      <div class="marco-carrusel">
        <button role="button" id="flecha-izquierda" class="flecha-izquierda" @click.stop="scrollLeft">
          <i class="material-icons small" style="vertical-align: middle"
            >navigate_before</i
          >
        </button>
        <div ref ="reparto_serie_tv" class="contenedor-carrusel">
          <div class="carrusel">
            <div class="item-carrusel" v-for="(p,i) in people(serieTv)" :key="i">
                <img
                  class="hoverable"
                  :src="srcProfile(p)"
                  @click.stop="goTo(p)"
                  :title="'Ver ficha de ' + p.name"
                />
                <div class="fondo-datos-items-carrusel"></div>
                <div class="datos-item-carrusel">
                  <p class="actor">{{p.name}}</p>
                  <p class="personaje">{{p.character != null && p.character != "" ? p.character : "-"}}</p>
                </div>                 
            </div>
          </div>
        </div>
        <button role="button" id="flecha-derecha" class="flecha-derecha" @click.stop="scrollRight">
          <i class="material-icons small" style="vertical-align: middle"
            >navigate_next</i
          >
        </button>
      </div>
    </div>
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "TvReparto",

  mixins: [mixins],

  props: {
    serieTv: null
  },

  methods: {
    goTo: function(p) {
      this.$router
        .push({ name: "PeopleDetail", params: { type: 'credit', idPeople: p.credit_id } })
        .catch(() => {});
    },
    scrollRight: function() {
      this.$refs.reparto_serie_tv.scrollLeft += this.$refs.reparto_serie_tv.offsetWidth;
    },
    scrollLeft: function() {
      this.$refs.reparto_serie_tv.scrollLeft -= this.$refs.reparto_serie_tv.offsetWidth;
    },     
  },

};
</script>
