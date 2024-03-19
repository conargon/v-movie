<template>
  <!-- TEMPORADAS -->
  <div class="row seccion">
    <div class="titulo-seccion secundario-texto">
      <div>Temporadas de {{ serieTv.name }}</div>
      <div class="divider"></div>
    </div>

    <table class="striped">
      <thead>
        <tr>
          <th class="center-align">Poster</th>
          <th class="center-align">Número</th>
          <th class="center-align">Fecha</th>
          <th class="center-align">Capítulos</th>
          <th class="hide-on-med-and-down">Resumen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in serieTv.seasons" :key="s.id">
          <td class="center-align thumbnail">
            <img
              class="responsive-img materialboxed poster"
              :src="srcPoster(s)"
              :data-caption="serieTv.name"
            />
          </td>
          <td class="center-align">{{ s.name }}</td>
          <td class="center-align">{{ fechaStr(s.air_date) }}</td>
          <td class="center-align">{{ s.episode_count }}</td>
          <td class="left-align hide-on-med-and-down">{{ s.overview }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import mixins from "./mixins.js";

export default {
  name: "TvSeasons",

  mixins: [mixins],

  props: {
    serieTv: null,
  },
};
</script>

<style scoped>

blockquote p:first-child {
  font-size: 1.3em;
}
</style>