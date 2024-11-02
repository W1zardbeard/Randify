import {react, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


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

       


        <a href={authUrl}>Login with Spotify</a>
    )
    
}
