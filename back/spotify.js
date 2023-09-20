//test spotify
const { query } = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'fb9611c1bdd94c1c8b8416bb573dd2fb',
    clientSecret: '9d3291a6af3746479cd69e3bbec66033',
    redirectUri: 'http://localhost/'
});


get50Titles = (styles, years, )=>{

    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
    
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
            console.log(
                'Something went wrong when retrieving an access token',
                err.message
            );
        }
    )

    listMusic = [];
    for(i = 0; i < 51 ; i++){
        //Premiere etape, on récup une musique
        musicRandom = getRandomMusic(styles, years)
        //On try 3 fois de chopper une autre musique si la musique existe déja dans la liste
        count = 0
        while(listMusic.includes(musicRandom)){
            musicRandom = getRandomMusic(styles, years)
            count+= 1;
            if(count === 3){
                throw new Error("Apres 3 essais on arrive pas a trouver une musique qu'on as pas déja")
            }
        }
        listMusic.push(musicRandom);
    }
    return listMusic;
}

getRandomMusic = (years = "1990-2015", genre = ["pop"]) =>{
        return new Promise((resolve, reject) => {
            console.log("il se passe des trucs")
            quer = ""
            'year:1980-2020 AND genre:"pop"'
            if(years.length !== 0){
                quer += `year:${years} AND `
            }
            quer += `genre:"${genre}"`
            quer += 
            spotifyApi.search(quer, ["track"], {
                limit: 50,
                offset: 550,
                locale: 'ES',
            }).then((response) => {
                resolve(response);  
            },
            (err)=> {
                reject(err)
            })
    });
}


initToken = () => {
    return new Promise((resolve, reject) => {
        spotifyApi.clientCredentialsGrant().then(
            function (data) {
           
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
                resolve()
            },
            function (err) {
                console.log(
                    'Something went wrong when retrieving an access token',
                    err.message
                );
            }
        )
    })
}


//https://api.spotify.com/v1/search?query=year%3A1980-2022+AND+genre%3A%22pop%22&type=track&locale=fr-FR%2Cfr%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=30
//https://api.spotify.com/v1/search?query=year%3A1980-2022+AND+genre%3A%22pop%22&type=track&offset=0&limit=50



module.exports = {
    getRandomMusic,
    initToken
}