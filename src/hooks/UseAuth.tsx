import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UseAuth(code:string) {
    
   const [accessToken, setAccessToken] = useState('');
   const [refreshToken, setRefreshToken] = useState('');
   const [expiresIn, setExpiresIn] = useState('');

   useEffect(() =>{
        axios.post('/api/login', {
            code,
        }).then((res:any) => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);

            window.history.pushState({}, '', '/');
        }).catch((error:any) => {
            window.location = '/';
        })
   }, [code])


   useEffect(() => {
    if(!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
        axios.post('/api/refresh', {
            refreshToken,
        }).then((res:any) => {
            setExpiresIn(res.data.expiresIn);
            setAccessToken(res.data.accessToken);
        }).catch((error:any) => {
            window.location = '/';
        })
    },(expiresIn - 60) * 1000);
    return () => clearInterval(interval);

   }, [refreshToken, expiresIn])

   return accessToken;

  
}