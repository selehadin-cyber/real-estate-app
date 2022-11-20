import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { formatter } from "./ListingCard";

export interface HomesArray {
  homesArray: {
    pictures: string[]
    price: number
    title: string
    address: string
  }[]
}

const Slider: React.FC<HomesArray> = ({ homesArray }) => {

  return (
    <Swiper
      grabCursor={true}
      spaceBetween={32}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      navigation={{
        nextEl: '.next',
        prevEl: ".prev",
      }}
      modules={[Navigation]}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="max-w-[1024px] mt-[48px] slider-padding"
    >
      <div className="swiper-wrapper">
        {homesArray.map((home) => (
          <SwiperSlide className="swiper-slide w-[290px] 1072:w-[320px] swiper-fixed-width-300">
            <div className="card-container hover:shadow-[0_12px_16px_hsla(228,66%,45%,.1)] p-3 rounded-2xl w-[290px] 1072:w-[320px] dark:bg-[hsl(228,16%,12%)]">
              <div className="image-wrapper mb-4 relative w-full overflow-hidden object-cover h-[320px]">
                  <Image layout="fill" className="max-w-full h-auto object-cover rounded-2xl" src={home.pictures[0]} />
              </div>
              <h2 className="text-[#4569f2] font-bold text-xl 1072:text-2xl mb-1">
              {formatter.format(home.price)}
              </h2>
              <h2 className="dark:text-white font-bold text-base 1072:text-2xl mb-3">{home.title}</h2>
              <p className="dark:text-gray-400 text-[13px]">{home.address}</p>
            </div>
          </SwiperSlide>
          
        ))}
        
      
      </div>
    </Swiper>
  );
};

export default Slider;
