import { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Dashboard(props: any) {

    const accessToken = UseAuth(props.code);

    return (
        <div>
            <h1>{props.code}</h1>
        </div>
    )
}