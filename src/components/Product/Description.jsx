import React, { useEffect, useState } from "react";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";
import { useParams } from "react-router-dom";
import axios from "axios";

const Description = ({ onQuant, onAdd, onRemove, onSetOrderedQuant }) => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    image_url: "",
    description: "",
    price: "",
    category_name: "",
    status: 0,
  });

  useEffect(() => {
    const fetchProductInfo = async () => {
      // setIsLoading(true);
      await axios
        .get(`http://localhost:3344/products/${id}`)
        .then((res) => {
          setCurrentProduct(res.data);
          setTimeout(() => {
            // setIsLoading(false);
          }, 0);
        })
        .catch((err) => console.log(err.message));
    };

    fetchProductInfo();
  }, []);

  return (
    <section className="description">
      <p className="pre">DIAMOND BRAND</p>
      <h1 style={{ fontSize: "40px" }}>{currentProduct.name}</h1>
      <p className="desc">{currentProduct.description}</p>
      <div className="price">
        <div className="main-tag">
          <p>${currentProduct.price}</p>
          <p></p>
        </div>
        {/* <s>$250.00</s> */}
      </div>
      <div className="buttons">
        <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />
        <button
          className="add-to-cart"
          onClick={() => {
            onSetOrderedQuant(onQuant);
          }}
        >
          <CartIcon />
          add to cart
        </button>
      </div>
    </section>
  );
};

export default Description;
