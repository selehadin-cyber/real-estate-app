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
import GeocoderControl from "../utilities/geocoder-control";
import { useDarkMode } from "../hooks/userDarkMode";
import mapboxgl from "mapbox-gl";

interface Result {
  results: {
    lat: number;
    long: number;
    coordinates: {
      _lat: number
      _long: number
    }
    title: string
  }[];
}

type House = {
  title: string;
  coordinates: {
    _lat: number
    _long: number
  }
};

const MapComponent: React.FC<Result> = ({results}) => {
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

  useEffect(() => {
  }, [isDark])
  

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
      mapStyle={isDark ? "mapbox://styles/selah4416/cl9v9flls006q15smr34ya1tw": "mapbox://styles/selah4416/cl8y19tzx004q14nrh3xove2s"}
      mapboxAccessToken="pk.eyJ1Ijoic2VsYWg0NDE2IiwiYSI6ImNsOHY1NmR1eTBhaTgzcW80NHp1MjRvMjkifQ.TGbUXQquNidfFwgvlNHh8w"
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState as any)}
    >
      <GeocoderControl mapboxAccessToken={"pk.eyJ1Ijoic2VsYWg0NDE2IiwiYSI6ImNsOHY1NmR1eTBhaTgzcW80NHp1MjRvMjkifQ.TGbUXQquNidfFwgvlNHh8w"} position="top-left" />

      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {results?.map((result) => (
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
              <p className="text-xl">{result.title}</p>
            </Popup>
          ) : null}
        </div>
      ))}
    </Map>
  );
};

export default MapComponent;
