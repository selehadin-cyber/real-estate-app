import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdAspectRatio, MdBathtub, MdKingBed } from "react-icons/md";
import { formatter } from "../components/ListingCard";
import Navbar from "../components/Navbar";
import { database, upload } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { Home } from "./homes/[home]";

const User = () => {
  const [favorites, setFavorites] = useState([]);
  const [listings, setListings] = useState([]);
  const [photo, setPhoto] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = () => {
    upload(photo, user, setLoading);
  };

  useEffect(() => {
    const callback = async () => {
      if (user) {
        const docRef = doc(database, "user", user?.uid)!;
        const userSnap = await getDoc(docRef);

        if (userSnap.exists()) {
          setFavorites(userSnap.get("fav"));
          setListings(userSnap.get("myListing"));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {
        setFavorites([]);
      }
    };
    callback();
  }, []);

  return (
    <div className="dark:bg-gray-900">
      <Navbar />
      <div className="maxWidthContainer 1072:max-w-5xl 1072:mx-auto mx-5">
        <div className="pt-28 w-full flex flex-col items-center justify-center ">
          <img
            src={photoURL}
            alt="avatar"
            className="rounded-full border-[5px] border-blue-300 h-44 w-44 object-cover"
          />
          <h2 className="dark:text-white">{user?.displayName}</h2>
          <p className="dark:text-gray-400">{user?.email}</p>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="multiple_images"
          >
            Change your profile picture
          </label>
          <input
            type="file"
            accept="image/*"
            name=""
            id="multiple_images"
            className="block m-5 w-full text-sm text-gray-900 border max-w-[50%] xs:max-w-[75%] border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            onChange={handleChange}
          />
          <button
            disabled={loading || !photo}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleClick}
          >
            Upload
          </button>
        </div>
        <div className="general-container w-full flex flex-col gap-3 justify-center items-start">
          <div className="favorites w-full">
            <h2 className="font-bold pb-3 dark:text-white">
              My favorite homes
            </h2>
            <ul className="flex flex-col justify-center items-center">
              {favorites.map((favItem: Home) => (
                <div className="popup-container w-full 1072:mb-6 mb-4 grid grid-cols-3 items-center">
                  <div className="right px-2 my-1 relative w-full h-full">
                    <Image
                      className="rounded-md object-cover"
                      layout="fill"
                      src={favItem.pictures[0]}
                    />
                  </div>
                  <div className="left p-2 col-span-2 ">
                    <p className="font-bold dark:text-gray-300">
                      {favItem.title}
                    </p>
                    <p className="text-gray-400">{favItem.address}</p>
                    <p className="text-[#4569f2] font-bold">
                      {formatter.format(favItem.price)}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div className="listings w-full">
            <h2 className="font-bold pb-3 dark:text-white">My listings</h2>
            <ul>
              {listings.map((listing: Home) => (
                <div className="popup-container mb-2 1072:mb-6 grid grid-cols-3 items-center">
                  <div className="right px-2 my-1 relative w-full h-full">
                    <Image
                      className="rounded-md object-cover"
                      layout="fill"
                      src={listing.pictures[0]}
                    />
                  </div>
                  <div className="left p-2 col-span-2 ">
                    <p className="font-bold  dark:text-gray-300">
                      {listing.title}
                    </p>
                    <p className="text-gray-400">{listing.address}</p>
                    <p className="text-[#4569f2] font-bold">
                      {formatter.format(listing.price)}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
