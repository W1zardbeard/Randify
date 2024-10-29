import { useEffect } from "react";

export default function AuthHook() {

    // Get access token
    const accessToken: string | null = new URLSearchParams(window.location.search).get('accessToken');
    console.log(accessToken);
    const refreshToken: string | null = new URLSearchParams(window.location.search).get('refreshToken');
    console.log(refreshToken);
    const expiresIn = new URLSearchParams(window.location.search).get('expiresIn');
    console.log(expiresIn);

    useEffect(() => {
       
    },[])
    
}