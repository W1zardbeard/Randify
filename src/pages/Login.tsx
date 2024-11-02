import {react, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Logo from '../components/Logo';
import  CTA from '../components/CTA';


export default function Login(){
   
    const [authUrl, setAuthUrl] = useState(''); 
   
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/getAuthUrl')
        .then((res:any) => {
            setAuthUrl(res.data);
        }).catch((error:any) => {
            console.log(error);
        })
    },[])



    
    return(

        <div className='login'>
            <div className='loginContainer'>
                <Logo 
                    large={true}
                    width={"180"}
                />
                <CTA 
                    text={"Login with Spotify"}
                    url={authUrl}
                    style={"spotifyLogin"}
                />
            </div>
            <div className='splashImg'>
                
            </div>
        </div>
    )
    
}
