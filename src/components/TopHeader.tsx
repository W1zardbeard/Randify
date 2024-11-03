import UserProfile from './UserProfile';


export default function TopHeader(props: any) {
    return (
        <div className="topHeader">
            <h1>{props.pageTitle}</h1>

            <UserProfile
                user={props.user}
            />
        </div>
    )
}