import { collection, getDocs, query, where } from "firebase/firestore";
import Checkbox from "@mui/material/Checkbox";

import { styled } from "@mui/material/styles";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEventHandler, EventHandler, useState, useEffect } from "react";
import MapComponent from "../components/Map";
import Navbar from "../components/Navbar";
import { database } from "../config/firebase";
import { FormControlLabel } from "@mui/material";
import { HiOutlineXCircle } from "react-icons/hi2";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useDarkMode } from "../hooks/userDarkMode";
import Slider, { HomesArray } from "../components/Slider";

const Home: NextPage<HomesArray>   = ({homesArray}) => {
  
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {/* home section */}
      <section className="home bg-gradient-bg w-screen mt-[60px] flex items-center justify-center">
        <div className="pt-16 grid mx-6 md:grid-cols-2 lg:gap-x-16 gap-y-14 dark:text-white max-w-[1024px]">
          <div className="pb-8">
            <h1 className="text-4xl text-white pb-5 lg:pb-8 lg:text-6xl leading-[120%] font-semibold">
              Take Your <br/>Home Search<br/> Global
            </h1>
            <p className="dark:text-gray-400 mb-8">
              Find a variety of properties that suit you very easily, forget all
              difficulties in finding a residence for you{" "}
            </p>
            <div className="stats flex items-center justify-start gap-10 w-full">
              <div>
                <h1 className="text-2xl lg:text-4xl">
                  9K <span className="text-[#4569f2]">+</span>
                </h1>
                <span className="dark:text-gray-400">
                  Premium <br></br>Products
                </span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl">
                  3K <span className="text-[#4569f2]">+</span>
                </h1>
                <span className="dark:text-gray-400">
                  Awards <br></br>Won
                </span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl">
                  37K <span className="text-[#4569f2]">+</span>
                </h1>
                <span className="dark:text-gray-400">
                  Happy <br></br>Customers
                </span>
              </div>
            </div>
          </div>
          <div className="home-image relative flex justify-center w-full 1072:w-fit">
            <div className="home__orbe 1072:w-[504px] 1072:h-[611px] 1072:rounded-[256px_256px_0_0]"></div>
            <div className="home-img absolute w-[250px] h-[300px] 1072:w-[472px] 1072:h-[634px] lg:rounded-[236px_236px_12px_12px] overflow-hidden rounded-[125px_125px_12px_12px] flex items-end -bottom-6 1072:-bottom-10">
              <img
                className="max-w-full h-auto"
                src="https://firebasestorage.googleapis.com/v0/b/ihsan-home.appspot.com/o/homes%2Fhome.jpg?alt=media&token=2ed6fda5-298a-4b47-8f55-8d562c871b2b"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[hsl(228,12%,8%)]">
        <Slider homesArray={homesArray} />
      </section>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const q = query(collection(database, "homes"));

  const querySnapshot = await getDocs(q);
  const homesArray: any[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    homesArray.push(doc.data().pictures);
  });

  return {
    props: {
      homesArray,
    },
  };
};
