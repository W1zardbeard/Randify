import {useState, useEffect} from 'react';

export default function SearchBar(props) {

    const [search, setSearch] = useState('');

    function handleChange(e: any){
        setSearch(e.target.value);
        props.searchGetter(e.target.value);
    }
    
    return (
        <div className="searchBar">
            <img src="src/assets/search.svg" alt="search"  />
            <input 
                value={search}
                onChange={handleChange}
                type="text" 
                placeholder="Search for a genre" 
            />
           
        </div>
    )
}