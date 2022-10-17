import React, { useState, useEffect } from "react";
import { upload } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

const User = () => {
    const [photo, setPhoto] = useState<any>(null)
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
        setPhoto(e.target.files[0])
    }
  };

  const handleClick = () => {
    upload(photo, user, setLoading)
  };
  return (
    <div>
      <input type="file" name="" id="" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src={photoURL} alt="avatar" className="rounded-full h-7" />
    </div>
  );
};

export default User;
