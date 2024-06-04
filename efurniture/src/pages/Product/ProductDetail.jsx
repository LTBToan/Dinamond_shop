import React, { useState } from "react";
import "./ProductDetail.css";
import { Container } from "@mui/material";
import Gallery from "../../components/Product/Gallery";
import Description from "../../components/Product/Description";
import MobileGallery from "../../components/Product/MobileGallery";
// import Navbar from "../../components/Product/Navbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";

const ProductDetail = () => {
  const [quant, setQuant] = useState(0);
  const [orderedQuant, setOrderedQuant] = useState(0);

  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };

  return (
    <>
      <Navbar />
      {/* <Navbar onOrderedQuant={orderedQuant} onReset={resetQuant} /> */}
      <Container component="section" maxWidth={"lg"}>
        <section className="core">
          <Gallery />
          <MobileGallery />
          <Description
            onQuant={quant}
            onAdd={addQuant}
            onRemove={removeQuant}
            onSetOrderedQuant={setOrderedQuant}
          />
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
