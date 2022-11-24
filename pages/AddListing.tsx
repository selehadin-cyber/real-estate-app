import React, { useCallback, useState } from "react";
import { Map, Marker } from "react-map-gl";
import type { MarkerDragEvent, LngLat } from "react-map-gl";
import { arrayUnion, doc, GeoPoint, setDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast, {Toaster} from 'react-hot-toast'
import { database, storage } from "../config/firebase";
import Navbar from "../components/Navbar";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import { User } from "firebase/auth";

const AddListing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

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
  const [homePics, setHomePics] = useState<File[]>([]);
  const [homePicURLs, setHomePicURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  const upload = async (file: File, user: User) => {
    const fileRef = ref(storage, `homes/${file.name}` + ".png");
    
    const snapShot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    setHomePicURLs((prev) => prev.concat(photoURL));
    
    console.log("succesfully uploaded");
  };

  const onSubmit = async (data: any) => {
    if (!user) {
      toast('You need to sign in to publish a home🤔', {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px',
        },
      })
      console.log("ABORTING")
      return null
    }
    const promises = [];

    for (var i = 0; i < homePics.length; i++) {
        const file = homePics[i];
        if (file !== null) {
            const storageRef = ref(storage, `homes/${file.name}` + ".png");
  
            promises.push(uploadBytesResumable(storageRef, file).then(uploadResult => {
                return getDownloadURL(uploadResult.ref)
            }))
        }
  
    }
    // Get all the downloadURLs
    const photos = await Promise.all(promises);
    
    // Update Firestore with the URLs array
    try {
        await setDoc(doc(database, "homes", data.title), {
          ...data,
          pictures: photos,
          coordinates: new GeoPoint(
            round5(marker.latitude),
            round5(marker.longitude)
          ),
        })
        const usersRef = doc(database, 'user', user.uid)
        await updateDoc(usersRef, {
          myListing: arrayUnion({
            ...data,
            pictures: photos,
            coordinates: new GeoPoint(
              round5(marker.latitude),
              round5(marker.longitude)
            ),
          }),
        })
        toast("Home added to favorites 👏!", {
          duration: 1000,
          style: {
            background: "green",
            color: "white",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
    } catch (err) {
        alert(err)
    }
  
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
    <div className="flex min-h-screen flex-col items-center justify-center my-1 dark:bg-gray-900">
      <Navbar />
      <Toaster position="bottom-center" />
      <main className="h-80 w-full mt-[72px]">
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
          selected location lng: {round5(marker.longitude)} lat:{" "}
          {round5(marker.latitude)}
        </p>  
      </main>
      <div className="form-container w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="addListing p-3 flex flex-col dark:bg-gray-900 max-w-[65vw] mx-auto">
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
              {...register("bathrooms", { required: true, valueAsNumber: true })}
            />
          </div>
          <div className="form-group flex flex-col mb-5 mx-auto w-full">
          <label htmlFor="bedrooms" className="flex items-center mb-2 dark:text-white text-lg">Bedrooms</label>
            <input
              type="number"
              placeholder="Bedrooms"
              id="bedrooms"
              className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]"
              {...register("bedrooms", { required: true, valueAsNumber: true })}
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
              {...register("price", { required: true, valueAsNumber: true })}
            />
          </div>
          <div className="form-group flex flex-col mb-5 mx-auto w-full">
          <label htmlFor="for" className="flex items-center mb-2 dark:text-white text-lg">Proprty Type</label>
            <select {...register("for", { required: true })}
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]">
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          <div className="form-group flex flex-col mb-5 mx-auto w-full">
          <label htmlFor="style" className="flex items-center mb-2 dark:text-white text-lg">Style</label>
            <select {...register("style", { required: true })}
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]">
              <option value="modern">Modern</option>
              <option value="islamic">Islamic</option>
            </select>
          </div>
          <div className="form-group flex flex-col mb-5 mx-auto w-full">
          <label htmlFor="type" className="flex items-center mb-2 dark:text-white text-lg">Building Type</label>
            <select {...register("type", { required: true })}
            className="h-9 py-1 px-3 bg-clip-padding rounded-[0.25rem]">
              <option value="apartment">Apartment</option>
              <option value="shop">Shop</option>
              <option value="house">House</option>
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
          <div className="mb-3 dark:text-white flex items-center xs:flex-col"><p className="xs:self-start">Upload pictures</p> <input type="file" className="block m-5 w-full text-sm text-gray-900 border max-w-[50%] xs:max-w-full border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" name="" id="" multiple={true} onChange={handleChange} /></div>
          <button disabled={loading || homePics.length == 0} type="submit" className="dark:text-white p-3 bg-green-600 rounded-md" >Publish Listing</button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
