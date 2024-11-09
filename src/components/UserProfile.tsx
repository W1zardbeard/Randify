export default function UserProfile(props: any) {
    return(
        <div className="userProfile">
            {props && props.user && props.user.images && props.user.images[1] ? 
                <img src={props.user.images[1].url} alt="user" />
            :	
                <img src={"https://placehold.co/50x50"} alt="user" />
            }
                <div>
                    <h3>{props.user?.id || "Unknown User"}</h3>
                    <p>{props.user?.email || "No Email Provided"}</p>
                </div>
        </div>
    )
}
