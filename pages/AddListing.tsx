import React, { useCallback, useState } from "react";
import { Map, Marker } from "react-map-gl";
import type { MarkerDragEvent, LngLat } from "react-map-gl";
import { doc, GeoPoint, setDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import Navbar from "../components/Navbar";

const AddListing = () => {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  const [title, setTitle] = useState("")
  const [area, setArea] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");

  const publishListing = async () => {
    console.log("publishing")
    await setDoc(doc(database, "homes", title), {
      address: address,
      area: area,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      price: price,
      for: type,
      coordinates: new GeoPoint(round5(events.onDrag?.lat), round5(events.onDrag?.lng))
    });
  };

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  function round5(value: number) {
    return parseFloat((Math.round(value * 1e5) / 1e5).toFixed(5));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Navbar />
      <main className="h-96 w-full ">
        <Map
          mapStyle="mapbox://styles/selah4416/cl8y19tzx004q14nrh3xove2s"
          mapboxAccessToken="pk.eyJ1Ijoic2VsYWg0NDE2IiwiYSI6ImNsOHY1NmR1eTBhaTgzcW80NHp1MjRvMjkifQ.TGbUXQquNidfFwgvlNHh8w"
          {...viewport}
          onMove={(evt) => setViewport(evt.viewState as any)}
        >
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}
          >
            <p className="cursor-pointer text-2xl">📌</p>
          </Marker>
        </Map>
        <p>
          selected location lng: {round5(events.onDrag?.lng)} lat:{" "}
          {round5(events.onDrag?.lat)}
        </p>
        <div>
          Title{" "}
          <input
            type="text"
            name=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id=""
          />
        </div>
        <div>
          area{" "}
          <input
            type="number"
            name=""
            value={area}
            onChange={(e) => setArea(parseInt(e.target.value))}
            id=""
          />
        </div>
        <div>
          bathrooms{" "}
          <input
            type="number"
            name=""
            value={bathrooms}
            onChange={(e) => setBathrooms(parseInt(e.target.value))}
            id=""
          />
        </div>
        <div>
          bedrooms{" "}
          <input
            type="number"
            name=""
            value={bedrooms}
            onChange={(e) => setBedrooms(parseInt(e.target.value))}
            id=""
          />
        </div>
        <div>
          address{" "}
          <input
            type="text"
            name=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id=""
          />
        </div>
        <div>
          price{" "}
          <input
            type="number"
            name=""
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            id=""
          />
        </div>
        <div>
          type{" "}
          <input
            type="text"
            name=""
            value={type}
            onChange={(e) => setType(e.target.value)}
            id=""
          />
        </div>
        <button onClick={publishListing}>Publish</button>
      </main>
    </div>
  );
};

export default AddListing;
