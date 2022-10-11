import React, { useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import data from "../pages/data";

interface Result {
  results?: {
    lat: number;
    long: number;
  }[];
}

type House ={ 
  result: {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
  }
}

const MapComponent: React.FC<Result> = () => {
  const [selectedHouse, setSelectedHouse] = useState({} as House);
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  console.log(selectedHouse);
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
      {data?.map((result) => (
        <div key={result.lat}>
          <Marker longitude={result.long} latitude={result.lat} anchor="bottom">
            <p
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedHouse({ result })}
            >
              📌
            </p>
          </Marker>

          {selectedHouse?.result?.long == result.long ? (
            <Popup
              closeOnClick={false}
              onClose={() => setSelectedHouse({} as House)}
              anchor="top"
              longitude={result.long}
              latitude={result.lat}
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
