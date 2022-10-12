import React, { useCallback, useState } from "react";
import { Map, Marker } from "react-map-gl";
import type { MarkerDragEvent, LngLat } from "react-map-gl";

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

  console.log(events)

  return (
    <main className="h-96 w-full">
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
      <p>selected location {events.onDrag.lng}</p>
    </main>
  );
};

export default AddListing;
