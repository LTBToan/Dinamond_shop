import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import ProductList from "../../components/ProductList/ProductList";

const ProductListPage = () => {
  return (
    <>
      <Navbar />
      <ProductList />
      <Footer />
    </>
  );
};

export default ProductListPage;
