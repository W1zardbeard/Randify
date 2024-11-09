
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaPlayButton,
  } from 'media-chrome/react';
  import MoonLoader from "react-spinners/MoonLoader";
  import {useState, useRef, useEffect} from 'react';


export default function Player(props: any) {

    const audioRef = useRef<HTMLAudioElement>(null);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [props.previewUrl]);

    const handlePlayButtonClick = () => {
        if (audioRef.current) {
            audioRef.current.play();
           
        }
    };

    function nextTrack() {
    
        props.getRandomTrack();
    }
  
    return (    

        
        <div className="player">

                {props.loading ? 
                    <>
                        <div className="loaderContainer">
                            <MoonLoader 
                                color={"#FF7E3A"} 
                                loading={props.loading} 
                                size={40} 
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div> 
                            <div className='trackDetails'>
                            <h2 className='songTitle'>Loading...</h2>
                            <p>Loading...</p>
                        </div>
                    </>
                : 
                    <>
                        <img src={props.cover} className='songThumbnail'/>
                        <div className='trackDetails'>
                            <h2 className='songTitle'>{props.name}</h2>
                            <p>{props.artist}</p>
                        </div>
                    </>
                }

            




            {/* //Player bar and controls */}
            <MediaController className="audioCont" audio>
                <audio
                slot="media"
                src={props.previewUrl}
                ref={audioRef}
                ></audio>
           
                    <MediaControlBar class="controlBar">
                        <div className="timerBar">
                            <MediaTimeDisplay className="timer" notoggle></MediaTimeDisplay>
                            <MediaTimeDisplay className="timer" remaining notoggle></MediaTimeDisplay>
                        </div>
                        <MediaTimeRange className="seeker"></MediaTimeRange>
                    </MediaControlBar>

                    {/* //controls */}
                    <div className="controls">
                        <div className="tooltip">
                            <a href={props.openSpotify} target="_blank">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 5C9.70996 5 5 9.71039 5 15.5V20.0194C5 20.0205 5.00064 20.0214 5.00064 20.0226V21.1963C5.00064 22.36 5.4556 23.4625 6.26935 24.285L7.47685 25.5013L9.22685 26.0088H9.25313C10.6968 26.0088 11.8781 24.8275 11.8781 23.3838V18.2213C11.8781 16.7775 10.6968 15.5963 9.25313 15.5963H9.22685L7.47685 16.1125L6.75 16.8422V15.5C6.75 10.6751 10.6755 6.75 15.5 6.75C20.3245 6.75 24.25 10.6751 24.25 15.5V16.8416L23.5238 16.1125L21.7738 15.5963H21.7475C20.3038 15.5963 19.1225 16.7775 19.1225 18.2213V23.3838C19.1225 24.8275 20.3038 26.0088 21.7475 26.0088H21.7738L23.5238 25.5013L24.7313 24.285C25.545 23.4625 26 22.36 26 21.1963C26 21.1064 26 15.4101 26 15.5C26 9.71039 21.29 5 15.5 5Z" fill="#4D5562"/>
                                </svg>               
                            </a>
                            <span className="tooltiptext">Listen on Spotify</span>
                        </div>
      
                        <MediaPlayButton  className="playBtn" id="playButton">
                            <svg onClick={handlePlayButtonClick} slot="play" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.941 14.244L14.119 10.236C12.686 9.50176 11 10.5696 11 12.2115V19.7885C11 21.4304 12.686 22.4982 14.119 21.764L21.941 17.756C23.353 17.0325 23.353 14.9675 21.941 14.244Z" fill="#E5E7EB"/>
                            </svg>

                            <svg slot="pause" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3333 22.3334V9" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M13 22.3334V9" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </MediaPlayButton>

                        <svg className="nextTrack" onClick={nextTrack}
                            
                            width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1864 14.2517L8.30466 10.9841C6.9716 10.2435 5.33337 11.2074 5.33337 12.7324V19.2676C5.33337 20.7926 6.9716 21.7566 8.30466 21.016L14.1864 17.7483C15.558 16.9863 15.558 15.0137 14.1864 14.2517Z" fill="#4D5562"/>
                            <path d="M21.3334 22.6667L21.3334 9.33335" stroke="#4D5562" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M26.6667 22.6667L26.6667 9.33335" stroke="#4D5562" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
            </MediaController>
        </div>
    )
}