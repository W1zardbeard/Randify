import GenreEditCard from "./GenreEditCard";




export default function GenreEdit(props: any) {

    console.log(props.allGenres);

    const allGenres = props.allGenres.genres;

    return (
        <div className="genreEdit">
            <h2>Edit your favorite genres</h2>
            <div className="genreEditList">
            {allGenres?.map((allGenres: any, index: number) => (
                    <GenreEditCard 
                        // key={allGenres.this + index}
                        name={allGenres}
                    />
                ))}
            </div>
        </div>
    )
}