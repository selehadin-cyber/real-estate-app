import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKingBed, MdBathtub, MdAspectRatio } from "react-icons/md";

interface Listing {
  listing: {
    title: string;
    pictures: string[];
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
  };
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const ListingCard: React.FC<Listing> = ({ listing }) => {

  return (
    <Link href={`/homes/${listing.title}`} className="w-full p-2.5 cursor-pointer">
      <div className="listing-container">
        <div className="image-wrapper relative w-full overflow-hidden object-cover h-[135px]">
          <Image
            className="rounded-md object-cover"
            layout="fill"
            src={listing.pictures[0]}
          />
        </div>
        <div className="bottom-padding p-1">
            <div className="title-price flex justify-between">
              <p className="font-bold dark:text-gray-300">{listing.title}</p>
              <p className="text-[#4569f2] font-bold">
                {formatter.format(listing.price)}
              </p>
            </div>
            <p className="address text-gray-700 dark:text-gray-400 text-sm">{listing.address}</p>
            <hr className="my-4 h-px bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="icn w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <MdKingBed color="#4569f2" />
                </div>
                <p>{listing.bedrooms} Bedrooms</p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <div className="icn w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <MdBathtub color="#4569f2" />
                </div>
                <p>{listing.bathrooms} Bathrooms</p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <div className="icn w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <MdAspectRatio color="#4569f2" />
                </div>
                <p>{listing.area} sqm</p>
              </div>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
