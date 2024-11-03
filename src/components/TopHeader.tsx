export default function TopHeader(props: any) {
    return (
        <div className="topHeader">
            <h1>{props.pageTitle}</h1>

            <div className="userProfile">
                <img src="https://placehold.co/50x50" alt="user" />
                <h3>John Doe</h3>
            </div>
        </div>
    )
}