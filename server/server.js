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
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.REDIRECT_URI
  });

// // Database connection
// const db = new pg.Client({
//     user: process.env.PG_USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PORT,
// });

// db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



// ==============================
// Endpoint to get Spotify authorization URL
// ==============================
app.get("/api/getAuthUrl", async (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state', 'streaming'];
  res.send(spotifyApi.createAuthorizeURL(scopes));
});

// ==============================
// Endpoint to handle Spotify login
// ==============================
app.post("/api/login", async (req, res) => {
  // Extract authorization code from request body
  const code = req.body.code;
  console.log(code);
   
  // Use the authorization code to get access and refresh tokens
  spotifyApi.authorizationCodeGrant(code).then(data => {
    // Send tokens and expiration time as response
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  }).catch(err => {
    // Log error and send 400 status if something goes wrong
    console.log(err);
    res.sendStatus(400);
  });
});

app.post("/api/refresh", async (req, res) => {
  // Extract refresh token from request body
  const refreshToken = req.body.refreshToken;

  // Use the refresh token to get a new access token
  spotifyApi.setRefreshToken(refreshToken);
  spotifyApi.refreshAccessToken().then(data => {
    // Send new access token as response
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    });
  }).catch(err => {
    // Log error and send 400 status if something goes wrong
    console.log(err);
    res.sendStatus(400);
  });
});










// ==============================
// Start the server
// ==============================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
