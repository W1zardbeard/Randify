import { useEffect, useState, useRef } from "react";
import UseAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SideNav from "../components/SideNav";
import TopHeader from "../components/TopHeader";
import SpotifyWebApi from 'spotify-web-api-node';
import GenreList from "../components/GenreList";
import Player from "../components/Player"; 
import RecentlyPlayedList from "../components/RecentlyPlayedList"; 

const spotifyApi = new SpotifyWebApi({
    clientId: 'e04c17fe2a1046138368640ad64f555e',
});




export default function Dashboard(props: any) {

    //navigate setup
    const navigate = useNavigate();

    //get access token
    const accessToken = localStorage.getItem('accessToken');
    //get refresh token
    const refreshToken = localStorage.getItem('refreshToken');
    //get expires in
    const expiresIn = localStorage.getItem('expiresIn');
    //current track
    const [currentTrack, setCurrentTrack] = useState<any>({});
    //get user
    const [user, setUser] = useState<any>({});
    //Current genre
    const [currentGenre, setCurrentGenre] = useState('All');
    //loading state
    const [loading, setLoading] = useState(true);
    //recently played list
    const [recentlyPlayedList, setRecentlyPlayedList] = useState<any>([]);
    

    //check if access token is present and set it in the spotify api object 
    useEffect(() => {
        if(!accessToken){
            navigate('/');
            return;
        }
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);


    //check if token is expired and refresh it
    useEffect(() => {
        // If there is no refresh token or expiration time, do nothing
        if(!refreshToken || !expiresIn) return;
       
        // Set up an interval to refresh the access token before it expires
        const interval = setInterval(() => {
             // Make a POST request to the refresh API with the refresh token
             axios.post('/api/refresh', {
                   refreshToken,
             }).then((res:any) => {
                   // Update the expiration time and access token from the response
                   localStorage.setItem('accessToken', res.data.accessToken);
                   localStorage.setItem('expiresIn', res.data.expiresIn);
             }).catch((error:any) => {
                   // Redirect to the home page in case of an error
                   window.location = '/';
             })
        }, (expiresIn - 60) * 1000); // Refresh the token 1 minute before it expires
       
        // Clear the interval when the component is unmounted or dependencies change
        return () => clearInterval(interval);
       
       }, [refreshToken, expiresIn])


//===========================================================================================================

    

    //get user info from spotify api
    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.getMe().then((res) => {
            setUser(res.body);
        });
    }, [accessToken]);


    //set genre
    function setGenre(genre: string){
        setCurrentGenre(genre);
    };

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        getRandomTrack();
    }, [currentGenre]);


    

    //get random track from spotify api
    function getRandomTrack(){  
        setLoading(true);  
        if(currentGenre === 'All'){
            axios.get("https://random-word-api.herokuapp.com/word")
            .then((res) => {
                const randomWord = res.data[0];
                console.log(randomWord);
                spotifyApi.searchTracks(randomWord,{limit:50}).then(searchData =>{
                    const tracksSearchResult = searchData.body;
                    //randomly choose song from returned array
                    const randomSongNumber = Math.floor(Math.random() * tracksSearchResult.tracks.items.length);
                    console.log(tracksSearchResult.tracks.items[randomSongNumber]);
                    if(tracksSearchResult.tracks.items[randomSongNumber].preview_url == null || tracksSearchResult.tracks.items[randomSongNumber] == undefined){
                        console.log("No preview url found, trying again");
                        getRandomTrack();
                        return;
                    }
                    setCurrentTrack(tracksSearchResult.tracks.items[randomSongNumber]);
                    setRecentlyPlayedList(prevList => [ tracksSearchResult.tracks.items[randomSongNumber],...prevList]);
                    setLoading(false);
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }else{
            axios.get("https://random-word-api.herokuapp.com/word" + `?length=5`)
            .then((res) => {
                const randomWord = res.data[0];
                console.log(randomWord);
                spotifyApi.searchTracks(`track${randomWord} genre${currentGenre}`,{limit:50}).then(searchData =>{
                    const tracksSearchResult = searchData.body;
                    //randomly choose song from returned array
                    const randomSongNumber = Math.floor(Math.random() * tracksSearchResult.tracks.items.length);
                    console.log(tracksSearchResult.tracks.items[randomSongNumber]);
                    if(tracksSearchResult.tracks.items[randomSongNumber].preview_url == null || tracksSearchResult.tracks.items[randomSongNumber] == undefined){
                        console.log("No preview url found, trying again");
                        getRandomTrack();
                        return;
                    }
                    setCurrentTrack(tracksSearchResult.tracks.items[randomSongNumber]);
                    setRecentlyPlayedList(prevList => [tracksSearchResult.tracks.items[randomSongNumber],...prevList]);
                    setLoading(false);
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
        
       
    }


    //get current track from spotify api on page load
    useEffect(() => {
        if(!accessToken) return; 
        getRandomTrack(currentGenre);
    }, [accessToken]);







    return (
        <div className="dashboard">
            <SideNav />

            <div className="mainWrapper">
                <TopHeader 
                    pageTitle={"Dashboard"}
                    currentGenre={currentGenre.charAt(0).toUpperCase() + currentGenre.slice(1).toLowerCase()}
                    user={user}
                />
                <GenreList 
                    setGenre={setGenre}
                    currentGenre={currentGenre}
                /> 

                <div className="playerAndRecentlyPlayedContainer">
                <Player 
                    cover={currentTrack.album?.images?.[1]?.url || 'default-cover-url'}
                    previewUrl={currentTrack?.preview_url || ''}
                    name={currentTrack?.name || 'Unknown Track'}
                    artist={currentTrack?.artists?.[0]?.name || 'Unknown Artist'}
                    openSpotify={currentTrack?.external_urls?.spotify || '#'}
                    getRandomTrack={getRandomTrack}
                    loading={loading}
                />   
                <RecentlyPlayedList 
                    recentlyPlayedList={recentlyPlayedList}
                />
                </div>
            </div>
        </div>
    )
}