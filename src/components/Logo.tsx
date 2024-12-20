import {useMediaQuery} from "react-responsive";

export default function Logo(props){
    const logoWidth ={
        width: props.width + "px"
    }

    const smallWidth ={
        width: "32px",
        display: "block"
    }

    const mobile = useMediaQuery({query: '(max-width:500px)'})

 
        
    if (props.editor === true){
        return(
        
            <img 
                style={mobile ? smallWidth : logoWidth}
                className="logo" 
                src={mobile ? "../src/assets/Logo.svg" : "../src/assets/Logo.svg"}
            />
        )

    } else {
        return(
        
            <img 
                style={logoWidth}
                className="logo loginLogo" 
                src={props.large ? "../src/assets/Logo.svg" : "../src/assets/Logo.svg"}
            />
        )
    }
    
}