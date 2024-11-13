import Login from './Login';
import Dashboard from './Dashboard';
import UseAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const code = new URLSearchParams(window.location.search).get('code');


export default function App(){

    const navigate = useNavigate();

    // If there is a code in the URL, use the UseAuth hook to get the access token and store it in local storage
    if(code){
        const accessToken = UseAuth(code);
        useEffect(() => {
            if(accessToken){
                localStorage.setItem('accessToken', accessToken);
                navigate('/home');
            }
        }, [accessToken])
    }

    
   
  
    return(
        <Login />
    )
    
}
