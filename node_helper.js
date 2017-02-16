/* Magic Mirror
 * Module: MMM-MovieInfo
 *
 * By fewieden https://github.com/fewieden/MovieInfo
 *
 * MIT Licensed.
 */

const request = require('request');
const moment = require('moment');
const NodeHelper = require('node_helper');
require('datejs');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },

    serialize: function(obj) {
        return '?'+Object.keys(obj).reduce(function(a, k) {
            a.push(k + '=' + encodeURIComponent(obj[k]));
            return a
        },[]).join('&')
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "CONFIG") {
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
    getData: function() {
        var discover = this.config.discover;
        discover['api_key'] = this.config.api_key
        discover['language'] = (this.config.language ? this.config.language : 'en')

        if ('primary_release_date.gte' in discover)
            discover['primary_release_date.gte'] = Date.parse(discover['primary_release_date.gte']).toString("yyyy-MM-d");

        if ('primary_release_date.lte' in discover)
            discover['primary_release_date.lte'] = Date.parse(discover['primary_release_date.lte']).toString("yyyy-MM-d");

        var query = this.serialize(discover);
        var options = {
            url: 'https://api.themoviedb.org/3/discover/movie' + this.serialize(discover)
        };

        request(options, (error, response, body) => {
            if (response.statusCode === 200) {
                this.sendSocketNotification("DATA", JSON.parse(body));
            } else {
                console.log("Error getting movie info " + response.statusCode);
            }
        });
    }
});
