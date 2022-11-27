import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { GetStaticProps } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import React  from "react";
import { BsHeart } from "react-icons/bs";
import { MdAspectRatio, MdBathtub, MdKingBed } from "react-icons/md";
import toast, {Toaster} from 'react-hot-toast'
import { formatter } from "../../components/ListingCard";
import Navbar from "../../components/Navbar";
import { database } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";


interface IParams extends ParsedUrlQuery {
  home: string;
}
interface HomeProps {
  singleHome: {
    pictures: string[];
    price: number;
    title: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    phone: string;
  };
}
export type Home = {
  pictures: string[];
  price: number;
  title: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  phone: string;
};
const HomePage: React.FC<HomeProps> = ({ singleHome }) => {
    const { user } = useAuth();
  const addFav = async (home: Home) => {
    if (!user) {
        //error message when a user tries to favorite an item with out loging in
        toast('You need to sign in to favorite a home🤔', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      } else {
        const usersRef = doc(database, 'user', user.uid)
        await updateDoc(usersRef, {
          fav: arrayUnion(home),
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
      }
      /* setFavoriteClicked((prev: boolean) => !prev) */
  };
  return (
    <div className="dark:bg-gray-900 min-h-screen mb-0">
      <Navbar />
      <div className="maxwidth max-w-5xl 1072:mx-auto mx-6 pt-[67px] 1072:pt-[77px]">
        <Toaster position="bottom-center" />
        <div className="image-wrapper relative w-full overflow-hidden object-cover h-[335px]">
          <Image
            className="rounded-md object-cover"
            layout="fill"
            src={singleHome.pictures[0]}
          />
        </div>
        <div className="bottom-padding p-1">
          <div className="title-price flex justify-between">
            <p className="font-bold dark:text-gray-300">{singleHome.title}</p>
            <p className="text-[#4569f2] font-bold">
              {formatter.format(singleHome.price)}
            </p>
          </div>
          <p className="address text-gray-700 dark:text-gray-400 text-sm">
            {singleHome.address}
          </p>
          <hr className="my-4 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex justify-between text-xs text-gray-700 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="icn w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <MdKingBed color="#4569f2" />
              </div>
              <p>{singleHome.bedrooms} Bedrooms</p>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <div className="icn w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <MdBathtub color="#4569f2" />
              </div>
              <p>{singleHome.bathrooms} Bathrooms</p>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <div className="icn w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <MdAspectRatio color="#4569f2" />
              </div>
              <p>{singleHome.area} sqm</p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between items-center px-5 py-7 1072:px-[150px]">
          <p className="dark:text-white">
            Contact: <a href={`tel:${singleHome.phone}`} className="text-blue-500">{singleHome.phone}</a>
          </p>
          <button
            onClick={() => addFav(singleHome)}
            type="button"
            className="h-11 w-11 rounded-full bg-gray-300 hover:bg-pink-300"
          >
            <BsHeart className="m-auto" size={19} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const q = query(collection(database, "homes"));

  const querySnapshot = await getDocs(q);
  const homessArray: any[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.data().title);
    homessArray.push(doc.data().title);
  });
  const paths = homessArray.map((home: any) => ({
    params: {
      home: home,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { home } = context.params as IParams;

  const homesRef = collection(database, "homes");
  let resultsArray = [] as any[];
  const populationQuery = query(homesRef, where("title", "==", home));

  const querySnapshot = await getDocs(populationQuery);
  querySnapshot.forEach((doc) => {
    resultsArray.push(JSON.parse(JSON.stringify(doc.data())));
  });
  const singleHome = resultsArray[0];

  return {
    props: { singleHome },
  };
};

export default HomePage;
