import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collection, getDocs, query } from "firebase/firestore";
import { database } from "../config/firebase";
import Image from "next/image";

export interface HomesArray {
  homesArray: any[];
}

const Slider: React.FC<HomesArray> = ({ homesArray }) => {
  console.log(homesArray[0]);
  return (
    <Swiper
      spaceBetween={50}
      /* slidesPerView={3} */
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {homesArray.map((home) => (
        <SwiperSlide>
          <div className="image-wrapper relative w-full overflow-hidden object-cover h-[135px]">
              <Image layout="fill" className="max-w-full h-auto object-cover" src={home[0]} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
