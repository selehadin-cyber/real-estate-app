import { collection, getDocs, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import MapComponent from "../components/Map";
import Navbar from "../components/Navbar";
import { database } from "../config/firebase";

const Home: NextPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const homesRef = collection(database, "homes");
  let resultsArray = [] as any[]
  const populationQuery = query(homesRef,where("type", "==", "house"), where("for", "==", "sale"), where("style", "==", "modern"), where("price", "<", 600000), where("price", ">", 100000));
  const queryFunction = async () => {
    const querySnapshot = await getDocs(populationQuery);
  querySnapshot.forEach((doc) => {
    resultsArray.push(doc.data());
    console.log(doc.data())
  });
  
  }
  queryFunction()
  console.log(resultsArray)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="h-96 w-full">
        <div className="filtersection"></div>
        <div className="map-container h-96 sm:-mt-6 md:-mt-6 lg:-mt-2">
          <MapComponent />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

/* export async function getServerSideProps() {
  const results = await fetch("https://jsonkeeper.com/b/5NPS").then(res => res.json())
  console.log(results)
  return {
    props: {
      results,
    }
  } 
} */
