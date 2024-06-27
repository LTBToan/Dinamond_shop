import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";

import prod1 from "../../Pictures/image-product-1.jpg";
import prod2 from "../../Pictures/image-product-2.jpg";
import prod3 from "../../Pictures/image-product-3.jpg";
import prod4 from "../../Pictures/image-product-4.jpg";

import thumb1 from "../../Pictures/image-product-1-thumbnail.jpg";
import thumb2 from "../../Pictures/image-product-2-thumbnail.jpg";
import thumb3 from "../../Pictures/image-product-3-thumbnail.jpg";
import thumb4 from "../../Pictures/image-product-4-thumbnail.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const IMAGES = [prod1, prod2, prod3, prod4];
const THUMBS = [thumb1, thumb2, thumb3, thumb4];

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(prod1);
  const [currentPassedImage, setCurrentPassedImage] = useState(prod1);
  const [open, setOpen] = useState(false);
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

  const handleClick = (index) => {
    setCurrentImage(IMAGES[index]);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };
  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <img src={currentProduct.image_url} alt="" onClick={handleToggle} />
        </div>
        {/* <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
        /> */}
        <div className="thumbnails">
          {/* {THUMBS.map((th, index) => {
            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div className={`outlay ${index === 0 && "activated"}`}></div>
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })} */}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
