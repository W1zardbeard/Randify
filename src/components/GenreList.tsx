import GenreCard from "./GenreCard"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function GenreList() {

    const [userGenres, setUserGenres] = useState([])

    useEffect(() => {
        //get user genres
        axios.get('/api/getUserGenres').then((res) => {
            console.log(res.data)
            setUserGenres(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="genreList">
            <div className="genreContHeader">
                <h2>Top genres</h2>
                <div className="chevronCont">
                    <img src="src/assets/chevron-left.svg" alt="chevron" />
                    <img src="src/assets/chevron-right.svg" alt="chevron" />
                </div>
            </div> 

            <div className="genreListCont">
                {userGenres.map((genre: any, index:number) => {
                    return (
                        <GenreCard 
                            key={index}
                            name={genre.name}
                            image={"src/assets/genres/"+ genre.name +".png"}
                        />
                    )
                }
                )}
            </div>
                    
                   
        </div>
    )
}