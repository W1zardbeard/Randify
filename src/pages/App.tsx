import {react, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function App(){
   
    const [authUrl, setAuthUrl] = useState(''); 
    const code: string | null = new URLSearchParams(window.location.search).get('code');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/getAuthUrl')
        .then((res:any) => {
            setAuthUrl(res.data);
        }).catch((error:any) => {
            console.log(error);
        })
    },[])

    useEffect(() => {
        if(code){
            console.log(code);
            window.localStorage.setItem('code', code);
            navigate('/dashboard');
        }
    },[code])

    
    return(
        <a href={authUrl}>Login with Spotify</a>
    )
    
}
