import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import { join, dirname } from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath from url module
import SpotifyWebApi from "spotify-web-api-node";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();
const port = 3000;
app.use(express.static(join(__dirname, "public")));

// Load environment variables
env.config();

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




app.get("/api/login", async (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state', 'streaming']
    res.send(spotifyApi.createAuthorizeURL(scopes));
    // res.send("Hello World");
});






// ==============================
// Start the server
// ==============================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
