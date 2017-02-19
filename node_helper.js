/* Magic Mirror
 * Module: MMM-MovieInfo
 *
 * By fewieden https://github.com/fewieden/MMM-MovieInfo
 *
 * MIT Licensed.
 */

/* eslint-env node */
/* eslint-disable no-console */

const request = require('request');
const moment = require('moment');
const NodeHelper = require('node_helper');

const periods = ['day', 'week', 'month', 'quarter', 'year'];

module.exports = NodeHelper.create({

    start() {
        console.log(`Starting module: ${this.name}`);
    },


    serialize(obj) {
        return `?${Object.keys(obj).reduce((a, k) => {
            a.push(`${k}=${encodeURIComponent(obj[k])}`);
            return a;
        }, []).join('&')}`;
    },

    socketNotificationReceived(notification, payload) {
        if (notification === 'CONFIG') {
            this.config = payload;
            setInterval(() => {
                this.getData();
            }, this.config.updateInterval);

            this.getData();
        }
    },

    /**
     * getData
     * Request data from the supplied URL and broadcast it to the MagicMirror module if it's received.
     */
    getData() {
        const discover = this.config.discover;
        discover.api_key = this.config.api_key;
        discover.language = (this.config.language ? this.config.language : 'en');

        if (Object.prototype.hasOwnProperty.call(discover, 'primary_release_date.gte')) {
            discover['primary_release_date.gte'] = moment(discover['primary_release_date.gte'] === 'now' ?
                {} : discover['primary_release_date.gte']).format('YYYY-MM-DD');
        }

        if (Object.prototype.hasOwnProperty.call(discover, 'primary_release_date.lte')) {
            if (periods.includes(discover['primary_release_date.lte'])) {
                discover['primary_release_date.lte'] = moment()
                    .add(1, `${discover['primary_release_date.lte']}s`).format('YYYY-MM-DD');
            } else {
                discover['primary_release_date.lte'] = moment(discover['primary_release_date.lte'])
                    .format('YYYY-MM-DD');
            }
        }

        const options = {
            url: `https://api.themoviedb.org/3/discover/movie${this.serialize(discover)}`
        };

        request(options, (error, response, body) => {
            if (response.statusCode === 200) {
                this.sendSocketNotification('DATA', JSON.parse(body));
            } else {
                console.log(`Error getting movie info ${response.statusCode}`);
            }
        });
    }
});
