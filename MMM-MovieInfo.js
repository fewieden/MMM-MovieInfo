/* global Module Log config */

/* Magic Mirror
 * Module: MMM-MovieInfo
 *
 * By fewieden https://github.com/fewieden/MMM-MovieInfo
 *
 * MIT Licensed.
 */

Module.register('MMM-MovieInfo', {

    index: 0,

    defaults: {
        api_key: false,
        updateInterval: 180 * 60 * 1000,
        rotateInterval: 3 * 60 * 1000,
        genre: true,
        rating: true,
        plot: true,
        useLanguage: false,
        discover: {}
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.genres = {
            28: this.translate('ACTION'),
            12: this.translate('ADVENTURE'),
            16: this.translate('ANIMATION'),
            35: this.translate('COMEDY'),
            80: this.translate('CRIME'),
            99: this.translate('DOCUMENTARY'),
            18: this.translate('DRAMA'),
            10751: this.translate('FAMILY'),
            14: this.translate('FANTASY'),
            10769: this.translate('FOREIGN'),
            36: this.translate('HISTORY'),
            27: this.translate('HORROR'),
            10402: this.translate('MUSIC'),
            9648: this.translate('MYSTERY'),
            10749: this.translate('ROMANCE'),
            878: this.translate('SCIENCE_FICTION'),
            10770: this.translate('TV_MOVIE'),
            53: this.translate('THRILLER'),
            10752: this.translate('WAR'),
            37: this.translate('WESTERN')
        };
        if (this.config.useLanguage) {
            this.config.language = config.language;
        }
        this.sendSocketNotification('CONFIG', this.config);
        setInterval(() => {
            this.index += 1;
            this.updateDom(1000);
        }, this.config.rotateInterval);
    },

    getStyles() {
        return ['font-awesome.css', 'MMM-MovieInfo.css'];
    },

    getTranslations() {
        return {
            en: 'translations/en.json',
            de: 'translations/de.json'
        };
    },

    socketNotificationReceived(notification, payload) {
        if (notification === 'DATA') {
            this.upcoming = payload;
            this.updateDom(1000);
        }
    },

    getDom() {
        const wrapper = document.createElement('div');
        if (this.upcoming) {
            if (this.index >= this.upcoming.results.length) {
                this.index = 0;
            }
            wrapper.classList.add('wrapper', 'align-left');

            const movie = this.upcoming.results[this.index];

            const title = document.createElement('div');
            title.classList.add('bright', 'small');
            title.innerHTML = movie.title;
            wrapper.appendChild(title);

            const poster = document.createElement('img');
            poster.classList.add('poster');
            poster.src = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`;
            wrapper.appendChild(poster);

            if (this.config.genre) {
                const genres = document.createElement('div');
                const genrespan = document.createElement('span');
                genrespan.classList.add('xsmall', 'float-left');
                genrespan.innerHTML = `${this.translate('GENRES')}: `;
                genres.appendChild(genrespan);
                const max = Math.min(3, movie.genre_ids.length);
                for (let i = 0; i < max; i += 1) {
                    if (Object.prototype.hasOwnProperty.call(this.genres, movie.genre_ids[i])) {
                        const genre = document.createElement('span');
                        genre.classList.add('xsmall', 'thin', 'badge', 'float-left');
                        genre.innerHTML = this.genres[movie.genre_ids[i]];
                        genres.appendChild(genre);
                    }
                }
                wrapper.appendChild(genres);
            }

            if (this.config.rating) {
                const stars = document.createElement('div');
                stars.classList.add('xsmall');
                const star = document.createElement('i');
                star.classList.add('fa', 'fa-star-o');
                stars.appendChild(star);
                const starspan = document.createElement('span');
                starspan.innerHTML = ` ${movie.vote_average}`;
                stars.appendChild(starspan);
                wrapper.appendChild(stars);
            }

            if (this.config.plot) {
                const plot = document.createElement('div');
                plot.classList.add('xsmall', 'plot');
                plot.innerHTML = movie.overview.length > 250 ?
                    `${movie.overview.substring(0, 248)}&#8230;` : movie.overview;
                wrapper.appendChild(plot);
            }
        }
        return wrapper;
    }
});
