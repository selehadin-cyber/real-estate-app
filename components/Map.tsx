import React, { useEffect, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { collection, getDocs, query } from "firebase/firestore";
import { BsFillHouseDoorFill } from "react-icons/bs";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { database } from "../config/firebase";
import GeocoderControl from "../utilities/geocoder-control";
import { useDarkMode } from "../hooks/userDarkMode";
import mapboxgl from "mapbox-gl";
import Image from "next/image";
import { formatter } from "./ListingCard";
import Link from "next/link";

interface Result {
  results: {
    lat: number;
    long: number;
    coordinates: {
      _lat: number;
      _long: number;
    };
    title: string;
    pictures: string[];
    address: string;
    price: number;
  }[];
}

type House = {
  title: string;
  coordinates: {
    _lat: number;
    _long: number;
  };
};

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path color="#5169ea" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const MapComponent: React.FC<Result> = ({ results }) => {
  const [homes, setHomes] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState({} as House);
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  const [isDark, setIsDark] = useDarkMode();

  console.log(homes);

  useEffect(() => {}, [isDark]);

  useEffect(() => {
    const base = async () => {
      const q = query(collection(database, "homes"));

      const querySnapshot = await getDocs(q);
      const homesArray: any[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        homesArray.push(doc.data());
      });
      setHomes(homesArray as any[]);
    };
    base();
  }, []);

  return (
    <Map
      mapStyle={
        isDark
          ? "mapbox://styles/selah4416/cl9v9flls006q15smr34ya1tw"
          : "mapbox://styles/selah4416/cl8y19tzx004q14nrh3xove2s"
      }
      mapboxAccessToken="pk.eyJ1Ijoic2VsYWg0NDE2IiwiYSI6ImNsOHY1NmR1eTBhaTgzcW80NHp1MjRvMjkifQ.TGbUXQquNidfFwgvlNHh8w"
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState as any)}
    >
      <GeocoderControl
        mapboxAccessToken={
          "pk.eyJ1Ijoic2VsYWg0NDE2IiwiYSI6ImNsOHY1NmR1eTBhaTgzcW80NHp1MjRvMjkifQ.TGbUXQquNidfFwgvlNHh8w"
        }
        position="top-left"
      />

      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {results?.map((result) => (
        <div key={result.coordinates?._lat}>
          <Marker
            longitude={result.coordinates?._long}
            latitude={result.coordinates?._lat}
            anchor="bottom"
            offset={[12, -3]}
          >
            <p
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedHouse(result)}
            >
              <div className="circle w-6 h-6 bg-white flex items-center justify-center">
                <HomeIcon fontSize="small" />
              </div>
            </p>
          </Marker>

          {selectedHouse?.coordinates?._long == result.coordinates?._long ? (
            <Popup
              closeOnClick={false}
              onClose={() => setSelectedHouse({} as House)}
              anchor="bottom"
              offset={[0, -40]}
              longitude={result.coordinates?._long}
              latitude={result.coordinates?._lat}
              className="rounded-lg"
            >
              <Link href={`/homes/${result.title}`}>
                <div className="popup-container grid grid-cols-3 items-center">
                  <div className="right px-2 my-1 relative w-full h-full">
                    <Image
                      className="rounded-md object-cover"
                      layout="fill"
                      src={result.pictures[0]}
                    />
                  </div>
                  <div className="left p-2 col-span-2 ">
                    <p className="font-bold">{result.title}</p>
                    <p className="text-gray-400">{result.address}</p>
                    <p className="text-[#4569f2] font-bold">
                      {formatter.format(result.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </Popup>
          ) : null}
        </div>
      ))}
    </Map>
  );
};

export default MapComponent;
