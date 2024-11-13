import SideNav from "../components/SideNav";
import TopHeader from "../components/TopHeader";
import SpotifyWebApi from 'spotify-web-api-node';
import {useState, useEffect} from 'react';

const spotifyApi = new SpotifyWebApi({
    clientId: 'e04c17fe2a1046138368640ad64f555e',
});


export default function Genres() {

     //get access token
     const accessToken = localStorage.getItem('accessToken');
     //get refresh token
     const refreshToken = localStorage.getItem('refreshToken');
     //get expires in
     const expiresIn = localStorage.getItem('expiresIn');
     //get user
     const [user, setUser] = useState<any>({});


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

    //get user info from spotify api
    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.getMe().then((res) => {
            setUser(res.body);
        });
    }, [accessToken]);



    return (
        <div className="dashboard">
            <SideNav />
            <div className="mainWrapper">
                <TopHeader 
                    pageTitle={"Genres"}
                    user={user}
                />

                <GenreEdit />
                </div>
        </div>
    )
    }