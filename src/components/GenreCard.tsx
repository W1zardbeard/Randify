export default function GenreCard(props: any) {
    return (
        <div className="genreCard">
            <img src={props.image} alt="genre" />
            <h3>{props.name}</h3>
        </div>
    )
}