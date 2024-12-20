export default function RecentlyPlayedCard(props: any) {
    return (
        <div className="recentlyPlayedCard">
            <div className="recentlyPlayedDetails">
                <img src={props.cover} className='songThumbnail'/>
                <div className="recentlyPlayedTileAndArtist">
                    <h3>{props.name}</h3>
                    <p>{props.artist}</p>
                </div>
            </div>
            <div className="recentlyPlayedButtons">
            <p><span>Generated word:<br/></span> {props.generatedWord.charAt(0).toUpperCase() + props.generatedWord.slice(1)}</p>
                <div className="tooltip">
                        <a href={props.openSpotify} target="_blank">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 5C9.70996 5 5 9.71039 5 15.5V20.0194C5 20.0205 5.00064 20.0214 5.00064 20.0226V21.1963C5.00064 22.36 5.4556 23.4625 6.26935 24.285L7.47685 25.5013L9.22685 26.0088H9.25313C10.6968 26.0088 11.8781 24.8275 11.8781 23.3838V18.2213C11.8781 16.7775 10.6968 15.5963 9.25313 15.5963H9.22685L7.47685 16.1125L6.75 16.8422V15.5C6.75 10.6751 10.6755 6.75 15.5 6.75C20.3245 6.75 24.25 10.6751 24.25 15.5V16.8416L23.5238 16.1125L21.7738 15.5963H21.7475C20.3038 15.5963 19.1225 16.7775 19.1225 18.2213V23.3838C19.1225 24.8275 20.3038 26.0088 21.7475 26.0088H21.7738L23.5238 25.5013L24.7313 24.285C25.545 23.4625 26 22.36 26 21.1963C26 21.1064 26 15.4101 26 15.5C26 9.71039 21.29 5 15.5 5Z" fill="#4D5562"/>
                            </svg>               
                        </a>
                        <span className="tooltiptext">Listen on Spotify</span>
                </div>
               
            </div>
        </div>
    )
}