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

const code = new URLSearchParams(window.location.search).get('code');


export default function Dashboard(props: any) {

    const accessToken = UseAuth(props.code);

    const [user, setUser] = useState<any>({});

    

    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);


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