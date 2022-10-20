import React, { useCallback, useState } from "react";
import { Map, Marker } from "react-map-gl";
import type { MarkerDragEvent, LngLat } from "react-map-gl";
import { doc, GeoPoint, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { database, storage } from "../config/firebase";
import Navbar from "../components/Navbar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import { User } from "firebase/auth";

const AddListing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    await setDoc(doc(database, "homes", data.title), {
      ...data,
      coordinates: new GeoPoint(
        round5(events.onDrag?.lat),
        round5(events.onDrag?.lng)
      ),
    });
  };

  console.log(errors);
  const { user } = useAuth();
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
  const [title, setTitle] = useState("");
  const [area, setArea] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [homePics, setHomePics] = useState<File[]>([]);
  const [homePicURLs, setHomePicURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(0);

  const upload = async (file: File, user: User) => {
    const fileRef = ref(storage, `homes/${file.name}` + ".png");
    setLoading(true);
    const snapShot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    setHomePicURLs((prev) => prev.concat(photoURL));
    setLoading(false);
    console.log("succesfully uploaded");
  };

  const publishListing = async () => {
    console.log("publishing");
    console.log(homePics);

    Array.from(homePics).forEach(async (pic) => await upload(pic, user));
    await setDoc(doc(database, "homes", title), {
      address: address,
      area: area,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      price: price,
      for: type,
      coordinates: new GeoPoint(
        round5(events.onDrag?.lat),
        round5(events.onDrag?.lng)
      ),
      pictures: homePicURLs,
      phone: phoneNumber,
    });
  };
  console.log(homePicURLs);
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

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setHomePics(e.target.files);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center my-1">
      <Navbar />
      <main className="h-96 w-full mt-[-150px]">
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 flex flex-col dark:bg-gray-900">
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
          <label htmlFor="Title" className="flex items-center mb-2 dark:text-white text-lg">Title</label>
          <input
            type="text"
            placeholder="Title"
            id="Title"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("title", { required: true })}
          />
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="area" className="flex items-center mb-2 dark:text-white text-lg">Total Area</label>
          <input
            type="number"
            id="area"
            placeholder="Area"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("area", { required: true })}
          />
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="bathrooms" className="flex items-center mb-2 dark:text-white text-lg">Bathrooms</label>
          <input
            type="number"
            placeholder="Bathrooms"
            id="bathrooms"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("bathrooms", { required: true })}
          />
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="bedrooms" className="flex items-center mb-2 dark:text-white text-lg">Bedrooms</label>
          <input
            type="number"
            placeholder="Bedrooms"
            id="bedrooms"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("bedrooms", { required: true })}
          />
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="address" className="flex items-center mb-2 dark:text-white text-lg">Address</label>
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("address", { required: true })}
          />
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="price" className="flex items-center mb-2 dark:text-white text-lg">Price</label>
          <input
            type="number"
            placeholder="Price"
            id="price"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("price", { required: true })}
          />
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="type" className="flex items-center mb-2 dark:text-white text-lg">Proprty Type</label>
          <select {...register("type", { required: true })}
          className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]">
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        <div className="form-group flex flex-col mb-5 mx-auto w-full">
        <label htmlFor="phone" className="flex items-center mb-2 dark:text-white text-lg">Phone Number</label>
          <input
            type="tel"
            placeholder="Mobile number"
            id="phone"
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
            {...register("phone", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
        </div>
        <div className="mb-3 dark:text-white">Upload pictures <input type="file" name="" id="" multiple={true} onChange={handleChange} /></div>
        <button disabled={loading || homePics.length == 0} type="submit" className="dark:text-white p-3 bg-green-600" >Publish Listing</button>
      </form>
        
      </main>
    </div>
  );
};

export default AddListing;