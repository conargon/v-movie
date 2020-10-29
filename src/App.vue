<template>
<div>

    <!-- CABECERA -->
    <nav class="primario">
      <div class="nav-wrapper">
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
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
 
    <!-- MENU MOBILE -->
    <ul id="slide-out" class="sidenav secundario">
      <li>
        <div class="valign-wrapper">
          <img src="imdb.svg" width="80" class="logoMobile" />
        </div>
      </li>
      <li><div class="divider"></div></li>
      <li>
        <a class="sidenav-close white-text" href="#" @click="goHome"><i class="small material-icons left white-text">home</i>Inicio</a>
      </li>          
      <li>
        <a class="sidenav-close white-text modal-trigger" href="#modal1"><i class="small material-icons left white-text">search</i>Buscar</a>
      </li>   
    </ul>
  
    <!-- FORMULARIO DE BUSQUEDA MOBILE -->
    <div id="modal1" class="modal secundario">
      <div class="modal-content">
        <i class="small material-icons left white-text">search</i>
        <p>Buscar</p>
        <div class="input-field valign-wrapper">
            <input id="searchMobile" type="search" v-model="searchText" @keydown.enter="onEnterSearchMobile" required>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="onEnterSearch">Aceptar</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="searchText=''">Cancelar</a>
      </div>
    </div>        


    <!-- VISTA PRINCIPAL -->
    <router-view :key="$route.fullPath" />

    <!-- PIE -->
    <footer class="page-footer primario">
      <div class="footer-copyright">
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

  data: () => ({
    searchText: "",
  }),

  methods: {
    onEnterSearch: function () {
      if(this.searchText == null || this.searchText.trim() == '') {
        return;
      }
      this.$store.commit("setCurrentPage", 1);
      this.$router
        .push({ name: "Search", params: { searchText: this.searchText } })
        .catch(() => {});
    },
    onEnterSearchMobile: function() {
      var instance = M.Modal.getInstance(document.getElementById("modal1"));
      instance.close();
      this.onEnterSearch();  
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
    //M.AutoInit();  
    var elemsSidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elemsSidenav, {});    
    var elemsModal = document.querySelectorAll('.modal');
    M.Modal.init(elemsModal, {
      onOpenEnd: function() {
        document.getElementById("searchMobile").focus();
      }
    });    
  },

};
</script>

<style scoped>

.logo {
  margin-left: 50px;
  width: 180px;
}

.logoMobile {
  margin-left: auto;
  margin-right: auto;  
  padding: 24px;
  width: 180px;
}

#modal1 .modal-content {
  font-size: 1.5em;
}

#slide-out {
  color:white;
}

.nav-content {
    padding-left: 16px;
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