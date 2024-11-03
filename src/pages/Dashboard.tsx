import { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SideNav from "../components/SideNav";
import TopHeader from "../components/TopHeader";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: 'e04c17fe2a1046138368640ad64f555e',
});




export default function Dashboard(props: any) {

    //navigate setup
    const navigate = useNavigate();

    //get access token
    const accessToken = localStorage.getItem('accessToken');

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

    //get user info from spotify api
    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.getMe().then((res) => {
            setUser(res.body);
            console.log(res.body);
        });
    }, [accessToken]);

    return (


       

        <div className="dashboard">
            <SideNav />

            <div className="mainWrapper">
                <TopHeader 
                    pageTitle="Dashboard"
                />    
            </div>
        </div>
    )
}