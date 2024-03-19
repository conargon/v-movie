<template>
<div class="row seccion">

    <!-- CREDITOS -->
    <div class="titulo-seccion secundario-texto">
      <div>Créditos de {{person.name}}</div>
      <div class="divider"></div>
    </div>         

    <div v-if="person.credits != null && person.credits.cast != null && person.credits.cast.length > 0">
      <div class="subtitulo-seccion terciario-texto">Como actor</div>
      <table class="striped">
        <thead>
          <tr>
            <th class="center-align">Título</th>
            <th class="center-align">Fecha</th>
            <th class="center-align">Personaje</th>
            <th v-if="!isMobile()">Resumen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in person.credits.cast" :key="s.id">
            <td class="center-align"><a href="#" @click="goToCredit(s.credit_id)"><strong>{{ s.title }}</strong></a></td>
            <td class="center-align">{{ fechaStr(s.release_date) }}</td>
            <td class="center-align">{{ s.character }}</td>
            <td class="left-align" v-if="!isMobile()">{{ s.overview }}</td>
          </tr>
        </tbody>
      </table>    
    </div>

    <div v-if="person.credits != null && person.credits.crew != null && person.credits.crew.length > 0">
      <div class="subtitulo-seccion terciario-texto">Equipo</div>
        <table class="striped" v-if="person.credits != null && person.credits.crew != null && person.credits.crew.length > 0">
          <thead>
            <tr>
              <th class="center-align">Título</th>
              <th class="center-align">Fecha</th>
              <th class="center-align">Perfil</th>
              <th v-if="!isMobile()">Resumen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in person.credits.crew" :key="s.id">
              <td class="center-align"><a href="#" @click="goToCredit(s.credit_id)"><strong>{{ s.title }}</strong></a></td>
              <td class="center-align">{{ fechaStr(s.release_date) }}</td>
              <td class="center-align">{{ s.job }}</td>
              <td class="left-align" v-if="!isMobile()">{{ s.overview }}</td>
            </tr>
          </tbody>
        </table>    
    </div>

</div>  
</template>

<script>
import mixins from "./mixins.js";
import axios from 'axios';

export default {
  name: "PeopleCreditos",

  mixins: [mixins],

  props: {
    person: null,
  },

  methods: {
        goToCredit: function(credit_id) {
            axios
                .get('https://api.themoviedb.org/3/credit/' + credit_id + '?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES')
                .then(
                    response => {
                        let credit = response.data;
                        if (credit != null && credit.media != null) {
                            if (credit.media_type == 'movie') {
                                this.$router
                                    .push({ name: "MovieDetail", params: { idMovie: credit.media.id } })
                                    .catch(() => {});
                            } else if (credit.media_type == 'tv') {
                                this.$router
                                    .push({ name: "TvDetail", params: { idSerieTv: credit.media.id } })
                                    .catch(() => {});
                            } else if (credit.media_type == 'person') {
                                this.$router
                                    .push({ name: "PeopleDetail", params: { type: 'credit', idPeople: credit.media.id } })
                                    .catch(() => {});
                            }
                        }
                    }
                )
                .catch(
                    e => console.log(e)
                )
        },    
  }

}
</script>
