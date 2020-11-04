<template>
  <!-- REPARTO -->
  <div
    class="row seccion"
    v-if="people(movie) != null && people(movie).length > 0"
  >
    <div class="titulo-seccion secundario-texto">
      <div>Reparto de {{ movie.title }}</div>
      <div class="divider"></div>
    </div>
    <div class="marco-carrusel">
      <button role="button" id="flecha-izquierda" class="flecha-izquierda" @click.stop="scrollLeft">
        <i class="material-icons small" style="vertical-align: middle"
          >navigate_before</i
        >
      </button>
      <div ref ="contenedor_carrusel" class="contenedor-carrusel">
        <div class="carrusel">
          <div class="item-carrusel" v-for="(p,i) in people(movie)" :key="i">
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
  name: "MovieReparto",

  mixins: [mixins],

  props: {
    movie: null,
  },

  methods: {
    goTo: function (p) {
      this.$router
        .push({
          name: "PeopleDetail",
          params: { type: "credit", idPeople: p.credit_id },
        })
        .catch(() => {});
    },
    scrollRight: function() {
      this.$refs.contenedor_carrusel.scrollLeft += this.$refs.contenedor_carrusel.offsetWidth;
    },
    scrollLeft: function() {
      this.$refs.contenedor_carrusel.scrollLeft -= this.$refs.contenedor_carrusel.offsetWidth;
    },    
  },
};
</script>

