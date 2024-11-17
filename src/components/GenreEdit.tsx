import { useEffect, useState } from "react";
import GenreEditCard from "./GenreEditCard";

import SearchBar from "./SearchBar";




export default function GenreEdit(props: any) {

   

    const allGenres = props.allGenres.genres;

    const [filteredGenres, setFilteredGenres] = useState<any>([]);

    useEffect (() => {
        setFilteredGenres(allGenres?.filter(allGenres => allGenres.toLowerCase().includes(props.searchTerm.toLowerCase())));
    }, [props.searchTerm]);

    console.log(filteredGenres);    
    return (
        <div className="genreEdit">
            <div className="genreEditHeader">
                <h2>Edit your favorite genres</h2>
                <SearchBar 
                    searchGetter={props.searchGetter}
                />
            </div>
                <div className="genreEditList">
                {filteredGenres ? 
                    filteredGenres.length === 0 ?
                        <h3>No genres found</h3>
                    :
                    filteredGenres.map((filteredGenres: any, index: number) => (
                        <GenreEditCard
                            key={index}
                            name={filteredGenres}
                        />
                    ))
                
                    :
                allGenres?.map((allGenres: any, index: number) => (
                        <GenreEditCard 
                            key={index}
                            // key={allGenres.this + index}
                            name={allGenres}
                        />
                    ))
                }
                </div>
        </div>
    )
}