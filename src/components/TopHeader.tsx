import UserProfile from './UserProfile';


export default function TopHeader(props: any) {
    return (
        <div className="topHeader">
            <div className="pageTitle">
                <h1>{props.pageTitle}</h1>
                <img src="src/assets/chevron-right.svg" className="carouselButton" alt="chevron" onClick={() => swiperRef.current?.slidePrev()}/>
                <h2>{props.currentGenre}</h2>
            </div>
            <UserProfile
                user={props.user}
            />
        </div>
    )
}