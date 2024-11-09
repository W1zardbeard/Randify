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
                        cover={track.album?.images?.[2]?.url || 'default-cover-url'}
                        previewUrl={track?.preview_url || ''}
                        name={track?.name || 'Unknown Track'}
                        artist={track?.artists?.[0]?.name || 'Unknown Artist'}
                        openSpotify={track?.external_urls?.spotify || '#'}
                        />
                    )
                })}
                </div>
        </div>
    )
}