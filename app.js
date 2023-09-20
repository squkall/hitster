//test spotify
var SpotifyWebApi = require('spotify-web-api-node');
var spotify = require("./back/spotify.js")
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'fb9611c1bdd94c1c8b8416bb573dd2fb',
    clientSecret: '9d3291a6af3746479cd69e3bbec66033',
    redirectUri: 'http://localhost/'
});







// Imports
const express = require('express')
const app = express()
const port = 8080

// Static Files
app.use(express.static('public'));
// Specific folder example
console.log(__dirname + 'css')
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/Assets/img'))

// Set View's
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('Accueil', { text: 'Hey' })
})

app.get('/afficherCards', (req, res) => {
    res.render('afficherCards')
})


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))

app.get("/getToken", (req, res) =>{
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            res.send(data.body['access_token'])
        },
        (err) => {
            console.log(err)
            res.send(500)
        }
        )
})

app.get('/musicsSimple', (req, res)=>{
    console.log(req.query)
    spotifyApi.clientCredentialsGrant().then(
    (data) => {
        spotify.initToken().then(() => {
            spotify.getRandomMusic(req.query.years, req.query.style).then((data) => {
                //console.log(data.body.tracks.items[0]);
                res.send(data.body.tracks)
            })
        })
        
    }, 
    (err)=>{
        console.error(err)
    }
   /*  function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.getCategories({
            limit: 50,
            offset: 0,
            country: 'EN',
            locale: 'en_US'
        }).then((categories) => {
            console.log(categories.body.categories.items);
        }, (err) => {
            console.log(err)
        });
        spotifyApi.getPlaylistsForCategory('pop', {
            country: 'US',
            limit : 10,
            offset : 0
        })
        .then(function(data) {
          console.log(data.body);
          console.log(data.body.playlists.items);
        }, function(err) {
          console.log("Something went wrong!", err);
        });

        spotifyApi.getPlaylist('37i9dQZF1DXcBWIGoYBM5M')
            .then(function(data) {
                console.log('Some information about this playlist', data.body.tracks.items[0]);
                data.body
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        

        

             spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
                function(data) {
                  console.log('Artist albums', data.body);
                },
                function(err) {
                  console.error(err);
                }
              ); 
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    } */
);
})

