import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collection, getDocs, query } from "firebase/firestore";
import { database } from "../config/firebase";
import Image from "next/image";

export interface HomesArray {
  homesArray: {
    pictures: string[]
  }[]
}

const Slider: React.FC<HomesArray> = ({ homesArray }) => {
  console.log(homesArray)
  return (
    <Swiper
      grabCursor={true}
      spaceBetween={32}
      slidesPerView="auto"
      centeredSlides={true}
      loop={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      
    >
      <div className="swiper-wrapper">
        {homesArray.map((home) => (
          <SwiperSlide className="swiper-slide w-[320px] swiper-fixed-width-300">
            <div className="card-container w-[320px]">
              <div className="image-wrapper relative w-full overflow-hidden object-cover h-[320px]">
                  <Image layout="fill" className="max-w-full h-auto object-cover" src={home.pictures[0]} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default Slider;
