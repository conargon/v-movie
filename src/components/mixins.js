export default {

    computed: {
        baseUrl: {
            get() {
                return this.$store.state.baseUrl
            }
        },
        apiKey: {
            get() {
                return this.$store.state.apiKey
            }
        },
    },

    methods: {
        getUrlApi(metodo, idioma, parametros) {
            let result = this.baseUrl + metodo + "?api_key=" + this.apiKey + "&language=" + idioma + parametros;
            return result;
        },
        srcImage: function(image) {
            return image != null && image.file_path != null ?
                "http://image.tmdb.org/t/p/w342" + image.file_path :
                "./no-poster.jpg";
        },
        srcImageOriginal: function(image) {
            return image != null && image.file_path != null ?
                "http://image.tmdb.org/t/p/original" + image.file_path :
                "./no-poster.jpg";
        },
        srcPoster: function(movie) {
            return this.tienePoster(movie) ?
                "http://image.tmdb.org/t/p/w342" + movie.poster_path :
                "./no-poster.jpg";
        },
        tienePoster: function(movie) {
            return movie != null && movie.poster_path != null && movie.poster_path != "";
        },
        srcLogoProductora: function(movie) {
            var firstCompany = this.firstCompany(movie)
            return movie != null && firstCompany != null && firstCompany.logo_path != null ?
                "http://image.tmdb.org/t/p/original" + firstCompany.logo_path :
                "";
        },
        tituloOriginal: function(movie) {
            return movie != null && movie.poster_path != null ?
                movie.original_title + " " + (movie.production_countries != null && movie.production_countries.length > 0 ? '(' + movie.production_countries[0].name + ')' : '') :
                "";
        },
        anyoLanzamiento: function(movie) {
            return movie != null && movie.release_date != null ?
                " (" + movie.release_date.substr(0, 4) + ")" :
                "????";
        },
        anyoLanzamientoSerieTv: function(serieTv) {
            return serieTv != null && serieTv.first_air_date != null ?
                " (" + serieTv.first_air_date.substr(0, 4) + ")" :
                "????";
        },
        fechaLanzamiento: function(movie) {
            return movie != null && movie.release_date != null ? new Date(movie.release_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        },
        firstCompany: function(movie) {
            if (
                movie != null &&
                movie.production_companies != null &&
                movie.production_companies.length > 0
            ) {
                for (var i = 0; i < movie.production_companies.length; i++) {
                    if (
                        movie.production_companies[i].logo_path != null &&
                        movie.production_companies[i].logo_path != ""
                    ) {
                        return movie.production_companies[i];
                    }
                }
                return movie.production_companies.length > 0 ?
                    movie.production_companies[0] :
                    null;
            } else {
                return '';
            }
        },
        director: function(movie) {
            return movie != null && movie.credits != null ? movie.credits.crew.filter(e => e.job == 'Director') : null;
        },
        images: function(movie) {
            return movie != null && movie.images != null ? movie.images.backdrops : null;
        },
        posters: function(movie) {
            return movie != null && movie.images != null ? movie.images.posters : null;
        },
        allImages: function(movie) {
            let result = [];
            if (movie != null && movie.images != null) {
                if (movie.images.backdrops != null && movie.images.backdrops.length > 0) {
                    result = movie.images.backdrops;
                }
                if (movie.images.posters != null && movie.images.posters.length > 0) {
                    result = result.concat(movie.images.posters);
                }
                return result;
            } else {
                return null;
            }
        },
        videos: function(movie) {
            return movie != null && movie.videos != null && movie.videos.results != null && movie.videos.results.length > 0 ?
                movie.videos.results :
                null;
        },
        people: function(movie) {
            return movie != null && movie.credits != null ? movie.credits.cast.filter(e => e.profile_path != null) : null;
        },
        peopleCrew: function(movie) {
            return movie != null && movie.credits != null ? movie.credits.crew.filter(e => e.profile_path != null) : null;
        },
        allPeople: function(movie) {
            let result = [];
            let cast = this.people(movie);
            let crew = this.peopleCrew(movie);
            if (cast != null) {
                result = result.concat(cast)
            }
            if (crew != null) {
                result = result.concat(crew)
            }
            return result;
        },
        srcProfile: function(credit) {
            return credit != null && credit.profile_path != null ?
                "http://image.tmdb.org/t/p/w342" + credit.profile_path :
                "./no-poster.jpg";
        },
        birthdayLocalDate(person) {
            return person != null ? this.fechaStr(person.birthday) : '';
        },
        agePerson(person) {
            if (person != null && person.birthday != null && person.deathday == null) {
                var ageDifMs = Date.now() - new Date(person.birthday).getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            } else {
                return null;
            }
        },
        deathdayLocalDate(person) {
            return person != null ? this.fechaStr(person.deathday) : '';
        },
        srcPosterPerson: function(person) {
            return this.tienePosterPerson(person) ?
                "http://image.tmdb.org/t/p/w342" + person.profile_path :
                "./no-poster.jpg";
        },
        tienePosterPerson: function(person) {
            return person != null && person.profile_path != null && person.profile_path != '';
        },

        fechaStr(fecha) {
            return fecha != null ? new Date(fecha).toLocaleDateString('es-ES') : '';
        },

        galleryImages(obj, nombre) {
            let result = this.images(obj);
            if (result != null) {
                result = result.map(e => ({
                    src: 'http://image.tmdb.org/t/p/original' + e.file_path,
                    thumbnail: 'http://image.tmdb.org/t/p/w300' + e.file_path,
                    w: e.width,
                    h: e.height,
                    title: nombre,
                    alt: nombre
                }));
                return result;
            } else {
                return [];
            }
        },

        galleryPosters(obj, nombre) {
            let result = [];
            let posters = this.posters(obj);
            if (posters != null) {
                result.push(...posters.map(e => ({
                    src: 'http://image.tmdb.org/t/p/original' + e.file_path,
                    thumbnail: 'http://image.tmdb.org/t/p/w300' + e.file_path,
                    w: e.width,
                    h: e.height,
                    title: nombre + " (poster)",
                    alt: nombre
                })));
                return result;
            } else {
                return [];
            }
        },

        galleryAllImages(obj, nombre) {
            let result = [];
            result = result.concat(this.galleryImages(obj, nombre));
            result = result.concat(this.galleryPosters(obj, nombre));
            return result;
        },

        imageBackground(obj) {
            let images = this.images(obj);
            if (images != null && images.length > 0) {
                let voto = 0;
                let file_path = images[0].file_path;
                for (let image of images) {
                    if (image.vote_count > voto) {
                        voto = image.vote_average;
                        file_path = image.file_path;
                    }
                }
                return file_path != '' ? "http://image.tmdb.org/t/p/original" + file_path : '';
            } else {
                return "";
            }
        },

        colorBackground(obj) {
            let genres_colors = [{
                    "id": 28,
                    "color": "#01b4e4"
                },
                {
                    "id": 12,
                    "color": "#f8bbd0"
                },
                {
                    "id": 16,
                    "color": "#b2dfdb"
                },
                {
                    "id": 35,
                    "color": "#fff9c4"
                },
                {
                    "id": 80,
                    "color": "#f5f5f5"
                },
                {
                    "id": 99,
                    "color": "#ffecb3"
                },
                {
                    "id": 18,
                    "color": "#cfd8dc"
                },
                {
                    "id": 10751,
                    "color": "#c8e6c9"
                },
                {
                    "id": 14,
                    "color": "#e1bee7"
                },
                {
                    "id": 36,
                    "color": "#ffccbc"
                },
                {
                    "id": 27,
                    "color": "#c5cae9"
                },
                {
                    "id": 10402,
                    "color": "#fff9c4"
                },
                {
                    "id": 9648,
                    "color": "#dcedc8"
                },
                {
                    "id": 10749,
                    "color": "#f8bbd0"
                },
                {
                    "id": 878,
                    "color": "b3e5fc"
                },
                {
                    "id": 10770,
                    "color": "#d1c4e9"
                },
                {
                    "id": 53,
                    "color": "#f0f4c3"
                },
                {
                    "id": 10752,
                    "color": "#ffe0b2"
                },
                {
                    "id": 37,
                    "color": "#d7ccc8"
                }
            ];
            if (obj != null && obj.genres != null && obj.genres.length > 0) {
                let genres = genres_colors.find(e => e.id === obj.genres[0].id);
                if (genres != null) {
                    return genres.color;
                } else {
                    return "#01b4e4";
                }
            } else {
                return "#01b4e4";
            }

        },

        isMobile() {
            return window.innerWidth < 600;
        }
    }

}