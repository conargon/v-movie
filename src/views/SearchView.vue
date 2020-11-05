<template>
  <div class="container">
    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>
    <div v-if="!loading && multi != null && multi.total_results == 0">
      <p class="no_results">No se han encontrado resultados</p>
    </div>
    <SearchGrid
      v-bind:multi="multi"
      @pageChange="onPageChange($event)"
      v-if="!loading && multi != null && multi.total_results > 0"
    />
  </div>
</template>

<script>
import axios from "axios";
import SearchGrid from "@/components/SearchGrid";
import mixins from "@/components/mixins.js";

export default {
  name: "SearchView",

  components: {
    SearchGrid,
  },

  mixins: [mixins],

  data: function () {
    return {
      multi: null,
      loading: true,
    };
  },

  computed: {
    searchMovies: {
      get() {
        return this.$store.state.searchMovies;
      },
    },
    searchPeople: {
      get() {
        return this.$store.state.searchPeople;
      },
    },
    searchTv: {
      get() {
        return this.$store.state.searchTv;
      },
    },
    multiQuery: {
      get() {
          return this.$store.state.searchMovies
              && this.$store.state.searchPeople
              && this.$store.state.searchTv;
      }
    }
  },    

  methods: {
    // TODO usar api para recuperar la config.
    searchMulti: function (query, page) {
        this.loading = true;
      let params = "&query=" + query +
                   "&page=" + page +
                   "&include_adult=false";           
        axios
          .get(this.getUrlApi("/search/multi", "es-ES", params))
/*           .get(
            "https://api.themoviedb.org/3/search/multi?api_key=91e88eab577c30d2e4546d14c947362a&language=es-ES&" +
              "query=" +
              query +
              "&page=" +
              page +
              "&include_adult=false"
          ) */
          .then((response) => {
            this.multi = response.data;
            if (this.multi != null) {
              this.multi.results = this.multi.results.sort(
                (a, b) => b.vote_count - a.vote_count
              );
            }
          })
          .catch((e) => console.log(e))
          .finally((this.loading = false));
    },
    searchParcial: function (query, page) {
        this.loading = true;
        let params = "&query=" + query +
                     "&page=" + page +
                     "&include_adult=false";       

        const urlRequestMovies = this.getUrlApi("/search/movie", "es-ES", params);
        const urlRequestPeople = this.getUrlApi("/search/person", "es-ES", params);
        const urlRequestSeriesTv = this.getUrlApi("/search/tv", "es-ES", params);

        const requestMovies = axios.get(urlRequestMovies);
        const requestPeople = axios.get(urlRequestPeople);
        const requestSeriesTv = axios.get(urlRequestSeriesTv);    

        axios.all([requestMovies, requestPeople, requestSeriesTv]).then(axios.spread((...responses) => {
          const responseMovies = responses[0]
          const responsePeople = responses[1]
          const responseTv = responses[2]
         
          let total_pages = 0; 
          let total_results = 0;
          let multi = {};
          multi.results = [];

          if(this.searchMovies) {
            let multiMovies = responseMovies.data;
            multiMovies.results = multiMovies.results.map(obj=> ({ ...obj, media_type : 'movie' }));
            //multiMovies.results = multiMovies.results.filter(obj => this.tienePoster(obj));
            total_pages += multiMovies.total_pages;
            total_results += multiMovies.total_results;
            multi.results.push(...multiMovies.results);
          }

          if(this.searchPeople) {
            let multiPeople = responsePeople.data;
            multiPeople.results = multiPeople.results.map(obj=> ({ ...obj, media_type : 'person' }));
            //multiPeople.results = multiPeople.results.filter(obj => this.tienePosterPerson(obj));
            total_pages += multiPeople.total_pages;
            total_results += multiPeople.total_results;
            multi.results.push(...multiPeople.results);
          }

          if(this.searchTv) {
            let multiTv = responseTv.data;
            multiTv.results = multiTv.results.map(obj=> ({ ...obj, media_type : 'tv' }));
            //multiTv.results = multiTv.results.filter(obj => this.tienePoster(obj));
            total_pages += multiTv.total_pages;
            total_results += multiTv.total_results;
            multi.results.push(...multiTv.results);
          }          

          multi.page = 1;
          multi.total_pages = total_pages;
          multi.total_results = total_results;

          multi.results = multi.results.sort(
            (a, b) => b.vote_count - a.vote_count
          );          

          this.multi = multi;

        }))
        .catch((e) => console.log(e))
        .finally((this.loading = false));

    },    
    search: function (query, page) {
        if(this.multiQuery) {
          this.searchMulti(query, page);
        } else {
          this.searchParcial(query, page);
        }
    },
    onPageChange: function (newPage) {
      //this.$store.commit("setCurrentPage", newPage);
      this.search(this.$route.params.searchText, newPage);
    },
  },

  created() {
    let currentPage = this.$store.state.currentPage;
    if (currentPage == null) {
      currentPage = 1;
      this.$store.commit("setCurrentPage", currentPage);
    }
    this.search(this.$route.params.searchText, currentPage);
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.no_results {
  font-size: 2em;
}
</style>