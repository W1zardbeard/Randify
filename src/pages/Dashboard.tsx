import { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";


export default function Dashboard() {

    const [code, setCode] = useState('');
    
    useEffect(() => {
        const code = localStorage.getItem('code');
        setCode(code!);
        
    }
    ,[])

    
    
    const accessToken = UseAuth(code!);
   
    
    console.log(accessToken);


    
   
    
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}