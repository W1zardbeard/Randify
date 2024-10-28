import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function UseAuth(code:string) {
    
    // Navigate
    const navigate = useNavigate();

    // State variables to store access token, refresh token and expiry time
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [expiresIn, setExpiresIn] = useState(0);

    // Get access token
    useEffect(() => {
        if (!code) return;
        console.log("ive been passed a valid code");
        axios.post("/api/login", {
            code
        }).then((res:any) => {
            
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
        }).catch((error:any) => {
            console.log(error);
            navigate('/');
        })
    },[code])


    // Refresh token
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const timeout = setTimeout(() => {
        axios.post("/api/refresh", {
            refreshToken
        }).then((res:any) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
        }).catch((error:any) => {
            console.log(error);
            navigate('/');
        })
        }, (expiresIn - 60) * 1000)
        return () => clearTimeout(timeout);
    },[refreshToken, expiresIn])

    
    return accessToken;
}