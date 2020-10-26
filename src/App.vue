<template>
<div>

    <!-- CABECERA -->
    <nav>
      <div class="nav-wrapper">
        <!-- <img src="imdb.svg" width="80" class="logo" /> -->
        <img src="./assets/tmdb_long.svg" class="logo" />
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="#" @click="goHome"><i class="large material-icons left">home</i></a>
          </li>          
        <li>
          <div class="input-field">
            <input id="search" type="search" v-model="searchText" @keydown.enter="onEnterSearch" required>
            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
            <i class="material-icons" @click="searchText=''">close</i>
          </div>
        </li>          
        </ul>
      </div>
    </nav>

    <!-- VISTA PRINCIPAL -->
    <router-view :key="$route.fullPath" />

    <!-- PIE -->
    <footer class="page-footer">
      <div class="footer-copyrigh">
        <div class="container center-align">
          <strong
            >&copy; Constantino Argüello González&nbsp;{{
              new Date().getFullYear()
            }}</strong
          >
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import M from "materialize-css";

export default {
  name: "App",

  components: {
    // ImagePreview,
  },

  props: {
    // source: String,
  },

  data: () => ({
    searchText: "",
  }),

  methods: {
    onEnterSearch: function () {
      this.$store.commit("setCurrentPage", 1);
      this.$router
        .push({ name: "MovieSearch", params: { searchText: this.searchText } })
        .catch(() => {});
    },
    goHome: function () {
      this.searchText = "";
      this.$router.push({ name: "Home" }).catch(() => {});
    },
  },

  created() {
    this.$store.commit("clearSrcImagePreview");
  },

  mounted() {
    M.AutoInit();
  },

};
</script>

<style scoped>

.logo {
  margin-left: 16px;
  width: 180px;
}

#search {
  height: auto;
}

.page-footer {
  padding-top: 0;
  position: fixed;
  left: 0;
  bottom: 0;  
  width: 100%;
}

</style>