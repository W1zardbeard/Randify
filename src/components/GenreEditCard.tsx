import CTA from './CTA';



export default function GenreEditCard(props: any) {

    const formattedGenre = props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase();
    return (
        <div className="genreEditCard">
            <h3>{formattedGenre}</h3>

            <CTA 
                clickHandler={() => console.log('Add genre to list')}
                style="secondary"
                text="Add genre to list"
            />
        </div>
    )
}