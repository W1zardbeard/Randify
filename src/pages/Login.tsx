import {react, useState} from 'react';
import axios from 'axios';

// const AUTH_URL = "https://accounts

export default function Login(){

    async function handleLogin() {
       
        axios.get('/api/login')
        .then((res:any) => {
            console.log(res);
            
                window.location.href = res.data;
          
        }).catch((error:any) => {
            console.log(error);
        })
      
        
    } 


    return(
        <button onClick={handleLogin}>login with Spotify</button>
    )
}