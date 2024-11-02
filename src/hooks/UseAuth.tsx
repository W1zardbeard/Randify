import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UseAuth(code:string) {
    
   const [accessToken, setAccessToken] = useState('');
   const [refreshToken, setRefreshToken] = useState('');
   const [expiresIn, setExpiresIn] = useState('');
useEffect(() => {
 // Retrieve the saved access token from local storage
 const savedToken = localStorage.getItem('accessToken');
 console.log(savedToken);

 // Make a POST request to the login API with the provided code
 axios.post('/api/login', {
      code,
 }).then((res:any) => {
      // Set the access token, refresh token, and expiration time from the response
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);

      // Update the URL to remove the code parameter
      window.history.pushState({}, '', '/');

      // Save the access token to local storage
      localStorage.setItem('accessToken', accessToken);
 }).catch((error:any) => {
      // Redirect to the home page in case of an error
      window.location = '/';
 })
}, [code])


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
            setExpiresIn(res.data.expiresIn);
            setAccessToken(res.data.accessToken);
      }).catch((error:any) => {
            // Redirect to the home page in case of an error
            window.location = '/';
      })
 }, (expiresIn - 60) * 1000); // Refresh the token 1 minute before it expires

 // Clear the interval when the component is unmounted or dependencies change
 return () => clearInterval(interval);

}, [refreshToken, expiresIn])

   return accessToken;

  
}