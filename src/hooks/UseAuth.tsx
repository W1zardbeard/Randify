import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UseAuth(code:string) {
    
   const [accessToken, setAccessToken] = useState('');
   const [refreshToken, setRefreshToken] = useState('');
   const [expiresIn, setExpiresIn] = useState('');
useEffect(() => {
 // Retrieve the saved access token from local storage


 // Make a POST request to the login API with the provided code
 axios.post('/api/login', {
      code,
 }).then((res:any) => {
     console.log(res);
      // Set the access token, refresh token, and expiration time from the response
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);

      // Save the access token to local storage
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('expiresIn', res.data.expiresIn);
      return;
 }).catch((error:any) => {
      // Redirect to the home page in case of an error
      window.location = '/';
 })
}, [code])

// Return the access token
return accessToken;



  
}