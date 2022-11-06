import { collection, getDocs, query, where } from "firebase/firestore";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
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

const Findhome = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
  const [checked, setChecked] = useState(true);
  const [types, setTypes] = useState([]);
  const [value, setValue] = useState<number[]>([1000, 1000000]);
  const [buyOrSale, setBuyOrSale] = useState("sale");
  const [style, setStyle] = useState("");
  const homesRef = collection(database, "homes");
  const [typeCheckboxes, setTypeCheckboxes] = useState([
    { id: 0, value: "building", name: "Building", isChecked: false },
    { id: 1, value: "house", name: "Home", isChecked: false },
    { id: 2, value: "shop", name: "Shop", isChecked: false },
  ]);
  const [isDark] = useDarkMode();
  let filters = [
    where("for", "==", buyOrSale),
    where("price", "<", value[1]),
    where("price", ">", value[0]),
  ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const marks = [
    {
      value: 10,
      label: "$10",
    },
    {
      value: 900000,
      label: "$900,000",
    },
  ];

  useEffect(() => {
    if (types.length > 0) {
      filters.push(where("type", "in", types));
    }
    if (style != "") {
      filters.push(where("style", "==", style));
    } else {
      filters = filters.filter((q) => q != where("style", "==", style));
    }
    let resultsArray = [] as any[];
    const populationQuery = query(homesRef, ...filters);

    const queryFunction = async () => {
      const querySnapshot = await getDocs(populationQuery);
      querySnapshot.forEach((doc) => {
        resultsArray.push(doc.data());
      });
      setSearchResults(resultsArray as never[]);
    };
    queryFunction();
  }, [types, buyOrSale, value, style, typeCheckboxes]);
  console.log(buyOrSale);

  const handleTypeChange = (event: any) => {
    event.target.checked
      ? setTypes((prev) => prev.concat(event.target.name))
      : setTypes((prev) =>
          prev.filter((element) => element !== event.target.name)
        );
  };
  console.log(types);
  const handleStyleChange = (event: any) => {
    setChecked(event.target.checked);
    setStyle(event.target.name)
  };
  console.log(style);
  const handleRange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(newValue);
  };

  function valuetext(value: number) {
    return `${value} Dollars`;
  }

  const clearAll = () => {
    setTypes([])
    setValue((prev) => [1000, 1000000]);
    setStyle("");
    setBuyOrSale("sale");
    
  };
  console.log(typeCheckboxes)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 dark:bg-gray-900">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <main className="h-auto w-full flex xs:flex-col-reverse flex-row mt-[63px] dark:bg-gray-900">
      <div className="filtersection w-full flex grow xs:flex-col flex-row">
        <section className="left w-full p-5 dark:bg-gray-900">
          <div className="flex justify-between items-center pb-3 dark:text-white">
            <strong>Filter</strong>
            <div
              onClick={clearAll}
              className="flex gap-1.5 cursor-pointer text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <p>Clear all</p>
              <HiOutlineXCircle size={25} />
            </div>
          </div>
          <div className="type-of-place pb-3">
            <div className="text-gray-700 dark:text-white">TYPE OF PLACE</div>
            <div className="type-checkboxes dark:text-gray-300">
              {typeCheckboxes.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      className="dark:border-gray-400"
                      onChange={handleTypeChange}
                      checked={types.indexOf(option.value as never) != -1}
                    />
                  }
                  label={option.name}
                  name={option.value}
                  id={option.id}
                />
              ))}
            </div>
          </div>
          <div className="price-range px-[10px] pb-3">
            <p className="-ml-[10px] text-gray-700 dark:text-white">
              PRICE RANGE
            </p>
            <Slider
              getAriaLabel={() => "Temperature range"}
              valueLabelFormat={(value) => (
                <div>{formatter.format(value)}</div>
              )}
              value={value}
              onChange={handleRange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={1000000}
              marks={marks}
              sx={{
                color: "#4569f2",
                "& .MuiSlider-thumb": {
                  height: 24,
                  width: 24,
                  backgroundColor: "#4569f2",
                  border: "4px solid white",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "black",
                },
              }}
            />
          </div>
          <div className="style pb-3 dark:text-gray-300">
            <p className="text-gray-700 dark:text-white">STYLE</p>
            <FormControlLabel
              control={<Checkbox onChange={handleStyleChange} checked={"modern" == style}/>}
              label="Modern"
              name="modern"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleStyleChange} checked={"islamic" == style}/>}
              label="Islamic"
              name="islamic"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleStyleChange} checked={"contemporary" == style}/>}
              label="Contemporary"
              name="contemporary"
            />
          </div>
          <div className="sale-or-rent">
            <p className="text-gray-700 dark:text-white pb-2">
              FOR SALE OR FOR RENT
            </p>
            <select
              name=""
              id=""
              className="w-full dark:border-gray-300 bg-transparent border border-gray-900 p-2 rounded-md dark:text-gray-400 dark:bg-gray-900"
            >
              <option value="sale" onClick={(e) => setBuyOrSale("sale")}>
                Buy
              </option>
              <option value="rent" onClick={(e) => setBuyOrSale("rent")}>
                Rent
              </option>
            </select>
          </div>
        </section>
        <section className="right w-full bg-[#fefefe] dark:bg-gray-900 h-screen overflow-y-scroll min-w-[282px] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {searchResults.map((result) => (
            <div key={result.address}>
              <ListingCard listing={result} />
            </div>
          ))}
        </section>
      </div>
      <div className="map-container xs:h-[60vh] h-screen w-full sm:-mt-6 md:-mt-6 lg:-mt-2 py-5 dark:bg-gray-900">
        <MapComponent results={searchResults} />
      </div>
    </main>

    <Footer />
  </div>
  )
}

export default Findhome