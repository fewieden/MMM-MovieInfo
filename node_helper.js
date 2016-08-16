/* Magic Mirror
 * Module: MMM-MovieInfo
 *
 * By fewieden https://github.com/fewieden/MovieInfo
 *
 * MIT Licensed.
 */

const request = require('request');
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
		var date = new Date();
		var start = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
		var end = (date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear()) + '-' + ('0' + (date.getMonth() + 2 % 12)).slice(-2) + '-01';
		var options = {
			url: 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=' + start + '&primary_release_date.lte=' + end + '&api_key=' + this.config.api_key
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
