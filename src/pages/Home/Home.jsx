import React from "react";
import styles from "./home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Herosection from "../../components/Home/Herosection";
import BannerCollection from "../../components/Home/BannerCollection";
import ShopCollection from "../../components/Home/ShopCollection";
import ShopYourChoice from "../../components/Home/ShopYourChoice";
import ProductsOfTheWeek from "../../components/Home/ProductsOfTheWeek";
import FeatureCollection from "../../components/Home/FeatureCollection";
import Catagories from "../../components/Home/Catagories";
import UpcomingCollections from "../../components/Home/UpcomingCollections";
import BlueBanner from "../../components/Home/BlueBanner";
import Features from "../../components/Home/Features";
import Footer from "../../components/Home/Footer";

import AboutUs from "../../pages/About/AboutPage";
import Chatbot from "../../components/Chatbot/ChatBot";
import { Fade } from "react-awesome-reveal";

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Herosection />
      <Features />
      <Fade direction="up" triggerOnce>
        <BannerCollection />
        <Catagories />
        <ShopCollection />
        {/* <ShopYourChoice /> */}
        <ProductsOfTheWeek />
        <AboutUs />
        <FeatureCollection />
      </Fade>
      <UpcomingCollections />
      <BlueBanner />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;
