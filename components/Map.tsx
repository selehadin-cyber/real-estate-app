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
import { database } from "../config/firebase";
import data from "../pages/data";

interface Result {
  results?: {
    lat: number;
    long: number;
  }[];
}

type House = {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  coordinates: {
    _lat: number
    _long: number
  }
};

const MapComponent: React.FC<Result> = () => {
  const [homes, setHomes] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState({} as House);
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  console.log(homes);

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
      mapStyle="mapbox://styles/selah4416/cl8y19tzx004q14nrh3xove2s"
      mapboxAccessToken="pk.eyJ1Ijoic2VsYWg0NDE2IiwiYSI6ImNsOHY1NmR1eTBhaTgzcW80NHp1MjRvMjkifQ.TGbUXQquNidfFwgvlNHh8w"
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState as any)}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {homes?.map((result: House) => (
        <div key={result.coordinates?._lat}>
          <Marker longitude={result.coordinates?._long} latitude={result.coordinates?._lat} anchor="bottom">
            <p
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedHouse(result)}
            >
              📌
            </p>
          </Marker>

          {selectedHouse?.coordinates?._long == result.coordinates?._long ? (
            <Popup
              closeOnClick={false}
              onClose={() => setSelectedHouse({} as House)}
              anchor="top"
              longitude={result.coordinates?._long}
              latitude={result.coordinates?._lat}
            >
              <p className="text-xl">waza</p>
            </Popup>
          ) : null}
        </div>
      ))}
    </Map>
  );
};

export default MapComponent;
