import { collection, getDocs, query, where } from "firebase/firestore";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEventHandler, EventHandler, useState, useEffect } from "react";
import MapComponent from "../components/Map";
import Navbar from "../components/Navbar";
import { database } from "../config/firebase";
import { FormControlLabel } from "@mui/material";

const Home: NextPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [checked, setChecked] = useState(true);
  const [types, setTypes] = useState([]);
  const [value, setValue] = useState<number[]>([1000, 1000000]);
  const [buyOrSale, setBuyOrSale] = useState("sale");
  const [style, setStyle] = useState("modern");
  const homesRef = collection(database, "homes");
  const [typeCheckboxes, setTypeCheckboxes] = useState([
    { id: 0, value: "building", name: "Building", isChecked: false },
    { id: 1, value: "house", name: "Home", isChecked: false },
    { id: 2, value: "shop", name: "Shop", isChecked: false },
  ]);
  const filters = [ where("for", "==", buyOrSale),
  where("style", "==", style),
  where("price", "<", value[1]),
  where("price", ">", value[0])]

  if (types.length > 0) {filters.push(where("type", "in", types))}

  useEffect(() => {
    let resultsArray = [] as any[];
    const populationQuery = query(
      homesRef, ...filters
    );

    const queryFunction = async () => {
      const querySnapshot = await getDocs(populationQuery);
      querySnapshot.forEach((doc) => {
        resultsArray.push(doc.data());
      });
      setSearchResults(resultsArray as never[]);
    };
    queryFunction();
  }, [types, buyOrSale, value, style]);
  console.log(buyOrSale);

  const handleTypeChange = (event: any) => {
    event.target.checked
      ? setTypes((prev) => prev.concat(event.target.name))
      : setTypes((prev) =>
          prev.filter((element) => element !== event.target.name)
        );
  };
  console.log(types)
  const handleStyleChange = (event: any) => {
    setChecked(event.target.checked);
    
    event.target.checked
      ? setStyle((prev) => (event.target.name)) : ""
      
  };
  console.log(style)
  const handleRange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(newValue);
  };

  function valuetext(value: number) {
    return `${value} Lira`;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="h-96 w-full flex">
        <div className="filtersection w-full flex">
          <section className="left w-full">
            <div>Type of place</div>
            <div className="type-checkboxes">
              {typeCheckboxes.map((option) => (
                <FormControlLabel
                control={
                  <Checkbox onChange={handleTypeChange} />
                }
                label={option.name}
                name={option.value}
                id={option.id}
              />
              ))}
              
              
            </div>
            <div className="price-range">
              <p>Price range</p>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleRange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={1000000}
              />
            </div>
            <div className="style">
              <p>Style</p>
              <FormControlLabel
                control={<Checkbox onChange={handleStyleChange} />}
                label="Modern"
                name="modern"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleStyleChange} />}
                label="Islamic"
                name="islamic"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleStyleChange} />}
                label="Contemporary"
                name="contemporary"
              />
            </div>
            <div className="sale-or-rent">
              <p>For Sale or Rent</p>
              <select name="" id="">
                <option value="sale" onClick={(e) => setBuyOrSale("sale")}>
                  Buy
                </option>
                <option value="rent" onClick={(e) => setBuyOrSale("rent")}>
                  Rent
                </option>
              </select>
            </div>
          </section>
          <section className="right w-full">
            {searchResults.map((result) => (
              <div key={result.address}>
                <p>{result.address}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="map-container h-96 w-full sm:-mt-6 md:-mt-6 lg:-mt-2">
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
