import React from "react";
import styles from "./home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Herosection from "../../components/Home/Herosection";
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
import Fade from "react-reveal";

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Fade>
        <Herosection />
        <ShopYourChoice />
        <Catagories />
        <ProductsOfTheWeek />
        <AboutUs />
        <FeatureCollection />
        <UpcomingCollections />
        <BlueBanner />
      </Fade>
      <Chatbot />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
