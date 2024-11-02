import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import { join, dirname } from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath from url module
import SpotifyWebApi from "spotify-web-api-node";
import cors from "cors";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();
const port = 3000;
app.use(express.static(join(__dirname, "public")));

// Load environment variables
env.config();

// Enable CORS
app.use(cors());

// Spotify API
// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_SECRET,
//     redirectUri: process.env.REDIRECT_URI
//   });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



// ==============================
// Endpoint to get Spotify authorization URL
// ==============================
app.get("/api/getAuthUrl", async (req, res) => {

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.REDIRECT_URI
  });

  const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state', 'streaming'];
  res.send(spotifyApi.createAuthorizeURL(scopes));
});


// ==============================
// Endpoint to handle Spotify login and get tokens back
// ==============================
app.post("/api/login", (req, res) => {

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.REDIRECT_URI
  });

  const code = req.body.code;

  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }
  ).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

// ==============================
// Endpoint refreshtoken
// ==============================


app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
 
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken,
  });

  spotifyApi.refreshAccessToken()
  .then((data) => {
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
    }).catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
   
    

});












// ==============================
// Endpoint to handle Spotify login
// ==============================
app.get("/api/babababa", async (req, res) => {
  const error = req.query.error;
  const code = req.query.code;


  try{
    spotifyApi.authorizationCodeGrant(code).then(data =>{
      const accessToken = data.body['access_token'];
      const refreshToken = data.body['refresh_token'];
      const expiresIn = data.body['expires_in'];
      console.log("Access Token: ", accessToken);
      console.log("Refresh Token: ", refreshToken);
      console.log("Expires in: ", expiresIn);

     

      res.redirect("/dashboard");
      

     
     

      setInterval(async() =>{
        const data = await spotifyApi.refreshAccessToken();
        const accessTokenRefreshed = data.body['access_token'];
        spotifyApi.setAccessToken(accessTokenRefreshed);
      }, expiresIn/2*1000);
    });
    
    
  }catch(err){
    console.log(err);
  }
  
});











// ==============================
// Start the server
// ==============================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
