export default function GenreCard(props: any) {

    let name = props.name;

    if (name === "Drum-and-bass") {
       name = "DnB"
    }else if(name === "Death-metal"){
        name = "Death Metal"
    }

    function handleClick() {
        props.setGenre(props.name);
    }


    if(props.currentGenre === props.name){
        return (
            <div onClick={handleClick} className="genreCard" style={{backgroundColor: "#FFD7C2"}}>
                <img src={props.image} alt="genre" />    
                <p>{name}</p>
            </div>
        )
    } else{    
        return (
        <div onClick={handleClick} className="genreCard">
            <img src={props.image} alt="genre" />    
            <p>{name}</p>
        </div>
        )
    }

}