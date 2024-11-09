import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import GenreCard from './GenreCard';

export default function GenreList(props: any) {
    const [userGenres, setUserGenres] = useState([]);
    const swiperRef = useRef<SwiperType>();



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

    return (
        <div className="genreList">
            <div className="genreContHeader">
                <h2>My top genres</h2>
                <div className="chevronCont">
                    <img src="src/assets/chevron-left.svg" className="carouselButton" alt="chevron" onClick={() => swiperRef.current?.slidePrev()} />
                    <img src="src/assets/chevron-right.svg" className="carouselButton" alt="chevron" onClick={() => swiperRef.current?.slideNext()} />
                </div>
            </div>

            <div className="genreListCont swiper">
                <Swiper
                    key="swiper"
                    breakpoints={{
                        1200: {
                            width: 1200,
                            slidesPerView: 9,
                        },
                        768: {
                            width: 768,
                            slidesPerView: 5,
                        },
                        576: {
                            width: 576,
                            slidesPerView: 2,
                        },
                    }}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={10}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide key="all">
                        <GenreCard
                            name="All"
                            image={"src/assets/genres/all.png"}
                            setGenre={props.setGenre}
                            currentGenre={props.currentGenre}
                        />
                    </SwiperSlide>
                    {userGenres.map((genre: any, index: number) => (
                        <SwiperSlide key={genre.name + index}>
                            <GenreCard
                                currentGenre={props.currentGenre}
                                name={genre.name}
                                image={"src/assets/genres/" + genre.name + ".png"}
                                setGenre={props.setGenre}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}