import GenreCard from "./GenreCard"
import { useCallback, useEffect, useState, useRef } from "react"
import axios from 'axios'

// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';





export default function GenreList() {

    

  
    //State for user genres
    const [userGenres, setUserGenres] = useState([])

    //Grab the users top genres from the API
    useEffect(() => {
        // Fetch user genres from the API
        axios.get('/api/getUserGenres').then((res) => {
            // Format the genre names to have each word capitalized
            const formattedGenres = res.data.map((genre: any) => {
                genre.name = genre.name
                    .split(' ')
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
                return genre;
            });
            // Update the state with the formatted genres
            setUserGenres(formattedGenres);
        }).catch((error) => {
            // Log any errors to the console
            console.log(error)
        })
    }, [])


    const swiperRef = useRef<SwiperType>();



    return (
        <div className="genreList">
            <div className="genreContHeader">
                <h2>My top genres</h2>
                <div className="chevronCont">
                    <img src="src/assets/chevron-left.svg" className="carouselButton" alt="chevron" onClick={() => swiperRef.current?.slidePrev()}/>
                    <img src="src/assets/chevron-right.svg" className="carouselButton"alt="chevron"  onClick={() => swiperRef.current?.slideNext()}/>
                </div>
            </div> 

            <div className="genreListCont swiper">
                <Swiper
                    loop={true}
                    breakpoints={{
                        1200: {
                            width: 1200,
                            slidesPerView: 7,
                        },
                        768: {
                            width: 768,
                            slidesPerView: 4,
                        },
                        576: {
                            width: 576,
                            slidesPerView: 7,
                        },
                        
                    }}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                    }}
                    slidesPerView={8}
                    spaceBetween={30}
                    pagination={{
                    clickable: true,
                    
                    }}
                    
                  
                    className="mySwiper"
                >
                    {userGenres.map((genre: any, index:number) => (
                        <>   
                            <SwiperSlide 
                                key={index}
                            >
                                <GenreCard 
                                    key={index+1}
                                    name={genre.name}
                                    image={"src/assets/genres/"+ genre.name +".png"}
                                />
                            </SwiperSlide>
                        </>    
                    ))}
                </Swiper>
            </div>
                    
                   
        </div>
    )
}