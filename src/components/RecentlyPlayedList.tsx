import RecentlyPlayedCard from "./RecentlyPlayedCard"

export default function RecentlyPlayedList(props: any) {

    console.log(props.recentlyPlayedList)
    

    return (
        <div className="recentlyPlayedContainer">
            <h2>Recently Played</h2>
            
            <div className="recentlyPlayedCards">
                {props.recentlyPlayedList?.map((track: any) => {
                    return (
                        <RecentlyPlayedCard
                            cover={track.albumCovers[2] || 'default-cover-url'}
                            previewUrl={track?.preview_url || ''}
                            name={track?.name || 'Unknown Track'}
                            artist={track?.artist || 'Unknown Artist'}
                            openSpotify={track?.openSpotify || '#'}
                            generatedWord={track?.generatedWord || 'Unknown Word'}
                        />
                    )
                })}
                </div>
        </div>
    )
}