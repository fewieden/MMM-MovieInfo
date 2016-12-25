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

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
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
        var start = moment().format("YYYY-MM-DD");
        var end = moment().add(1, "months").format("YYYY-MM-DD");

		var options = {
			url: 'https://api.themoviedb.org/3/discover/movie?' +
                'primary_release_date.gte=' + start +
                '&primary_release_date.lte=' + end +
                '&api_key=' + this.config.api_key +
                '&language=' + (this.config.language ? this.config.language : 'en')
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
