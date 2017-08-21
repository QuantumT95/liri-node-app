var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var action = process.argv[2];
var value = process.argv[3];

var clientTwitter = new Twitter({
  consumer_key: 'EThGvDaicAFEyeIjtS00HWALY',
  consumer_secret: 'aBPfTm4CsTXsIY50IZCmY3lLxpKZfBnRI0er13QilqKkCeso8K',
  access_token_key: '306002520-UEc58ws91C0wnvwdJIGO53IoAsk4H3iS4JqGneWy',
  access_token_secret: 'tTmKqURuHaYyTmc0xqT3j5LpuYgMwpuuSXlL5N7JqxOdv',
});

var spotify = new Spotify({
  id: 'c757507a466e4f93a5fab36b64a5531a',
  secret: 'b4125b94883441ce8ef482b84d631044',
});


switch (action) {
	case "my-tweets":
		latestTweets();
		break;
	case "spotify-this-song":
		spotifySong();
		break;
	case "movie-this":
		movieThis();
		break;
	case "do-what-it-says":
		doIt();
		break;	
}

function latestTweets() {
	clientTwitter.get('search/tweets', { id:306002520, q:'awesome'}, function (err, data, resp) {
		for (i = 0; i < data.statuses.length; i++)
			console.log(data.statuses[i].text);
	});
};

function spotifySong() {
	if (!song)  {
		// hard code of the song The Sign by Ace of Base
		spotify
			.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
			.then(function(data) {
				console.log('Artist: ' + data.album.artists[0].name);
				console.log('Song Name: ' + data.name);
				console.log('Preview Link: ' + data.preview_url);
				console.log('Album Name: ' + 	data.album.name);
			})
			.catch(function(err) {
				console.error('Error occurred: ' + err); 
			});
		}
	else {
		// manual search of song
		spotify
			.search({ type: 'track', query: value, limit: 1 })
			.then(function(response) {
				console.log('Artist: ' + response.tracks.items[0].album.artists[0].name);
				console.log('Song Name: ' + response.tracks.items[0].name);
				console.log('Preview Link: ' + response.tracks.items[0].preview_url);
				console.log('Album Name: ' + response.tracks.items[0].album.name);
			})
			.catch(function(err) {
				console.log(err);
			});
	}
}

function movieThis() {
	request
		.get('http://imdb.com')
		.search({ query: value })
		.on('response', function(response) {
			console.log(response)
		})
}





// client.get('search/tweets', { id:306002520 }, function (err, data, resp) {
// 	console.log(data);
// })