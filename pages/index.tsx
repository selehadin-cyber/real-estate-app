import { collection, getDocs, query } from "firebase/firestore";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { database } from "../config/firebase";
import Footer from "../components/Footer";
import Slider, { HomesArray } from "../components/Slider";
import SimpleAccordion from "../components/Accordions";

const Home: NextPage<HomesArray> = ({ homesArray }) => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {/* home section */}
      <section className="home bg-gradient-bg w-full mt-[60px] flex items-center justify-center">
        <div className="pt-16 grid mx-6 md:grid-cols-2 lg:gap-x-16 gap-y-14 dark:text-white max-w-[1024px]">
          <div className="pb-8">
            <h1 className="text-4xl text-white pb-5 lg:pb-8 lg:text-6xl leading-[120%] font-semibold">
              Take Your <br />
              Home Search
              <br /> Global
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
                src="https://firebasestorage.googleapis.com/v0/b/ihsan-home.appspot.com/o/homes%2Fhome.jpg?alt=media&token=2ed6fda5-298a-4b47-8f55-8d562c871b2b"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[hsl(228,12%,8%)] p-[4.5rem_0_2rem] 1072:p-[7.5rem_0_1rem]">
        <div className="mx-6">
          <div className="max-w-[1024px] mx-auto">
            <p className="text-[#4569f2] text-[13px] 1072:text-base">Global Reach</p>
            <h2 className="mt-2.5 text-[20px] 1072:text-4xl font-semibold dark:text-white">Some of our listings<span className="text-[#4569f2]">.</span></h2>
          </div>
          <Slider homesArray={homesArray} />
          <div className="slider-buttons mt-7 max-w-[1024px] mx-auto flex items-center justify-center gap-3">
            <button className="prev dark:text-white w-10 h-10 border-[3px] border-[hsl(228,16%,14%)] rounded-full bg-[hsl(228,16%,12%)] flex items-center justify-center"><HiChevronLeft color="#4569f2"/></button>
            <button className="next dark:text-white w-10 h-10 border-[3px] border-[hsl(228,16%,14%)] rounded-full bg-[hsl(228,16%,12%)] flex items-center justify-center"><HiChevronRight color="#4569f2"/></button>
          </div>
        </div>
      </section>
      <section className="bg-[hsl(228,12%,8%)] w-full">
        <div className="max-w-[1024px] flex xs:flex-col justify-center items-center gap-20 mx-6 1072:mx-auto">
          <div className="left border-[5px] border-gray-500 rounded-tl-full rounded-tr-full relative flex justify-center 1072:max-w-[461px] 1072:h-[601px] w-[250px] h-[300px] max-w-[266px]">
            <Image layout="fill" className="rounded-tl-full h-auto rounded-tr-full" src={"https://firebasestorage.googleapis.com/v0/b/ihsan-home.appspot.com/o/value.jpg?alt=media&token=20b27227-99c0-435f-8321-9f63cc0d3352"}></Image>
          </div>
          <div className="right w-full flex flex-col">
            <div>
              <span className="text-[#4569f2] text-base mb-3">Our Value</span>
              <h2 className="text-[hsl(228,8%,95%)] text-4xl font-semibold mb-4 mt-1">Value we give to you</h2>
              <p className="text-gray-400 text-base">
                We always ready to help by providing the best service for you.
                We believe a good place to live can make your life better.{" "}
              </p>
            </div>
            <SimpleAccordion />
          </div>
        </div>
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
    homesArray.push(JSON.parse(JSON.stringify(doc.data())));
  });

  return {
    props: {
      homesArray,
    },
  };
};
