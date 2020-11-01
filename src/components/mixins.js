export default {

    methods: {
        srcImage: function(image) {
            return image != null && image.file_path != null ?
                "http://image.tmdb.org/t/p/w342" + image.file_path :
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
            return movie != null && movie.release_date != null ? new Date(movie.release_date).toLocaleDateString('es-ES') : '';
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
        videos: function(movie) {
            return movie != null && movie.videos != null && movie.videos.results != null && movie.videos.results.length > 0 ?
                movie.videos.results :
                null;
        },
        people: function(movie) {
            return movie != null && movie.credits != null ? movie.credits.cast.filter(e => e.profile_path != null) : null;
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

        gallery(obj, nombre) {
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
                }
                return result;
            } else {
                return [];
            }
        }
    }

}