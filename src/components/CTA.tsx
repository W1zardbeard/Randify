import {useMediaQuery} from "react-responsive";


export default function CTA(props){

    //this will return true or false depending on the screen size
    // const tablet = useMediaQuery({query: '(max-width:700px)'})

    switch (props.style){
        case "primary":
            return(
                <button 
                    className="ctaPrimary" 
                    type={props.type}
                    disabled={props.disabled}
                    onClick = {() => {
                        if(props.clickHandler){
                            props.clickHandler();
                        }
                        
                    }}
                >
                    {props.text}
                </button>
            );
            case "spotifyLogin":    
                return(
                    <a 
                        className="ctaSpotify" 
                        href={props.url}
                    >
                        <img src="src/assets/Spotify_logo_without_text.svg"/>   
                        {props.text}
                    </a>
                );
        case "secondary":
            return(
                <button 
                    className={"ctaSecondary" }
                    type={props.type}
                    disabled={props.disabled}
    
                    onClick = {() => {
                        if(props.clickHandler){
                            props.clickHandler();
                        }
                        
                    }}
                >   
                   
                        {props.text}
                    
                  
                   
                  
                </button>
            );
            break;
    }
}