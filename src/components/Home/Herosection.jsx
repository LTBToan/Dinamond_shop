import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/herosection.module.css";
import { Button, Carousel } from "antd";

const Herosection = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <div className={styles.container}>
      <Carousel {...settings} className={styles.slider}>
        <div>
          <div className={styles.placeholder}>
            <h1 className={styles.heading}>
              Elegance in Every Drop: Discover Our Stunning Earring Collection
            </h1>
            <h5 className={styles.tag}>
              Explore our exquisite range of earrings, from delicate studs to
              dazzling chandeliers.
            </h5>
            <Button
              size="large"
              className={styles.bannerButton}
              onClick={() => navigate("/products")}
            >
              Discover More
            </Button>
          </div>
          <img
            className={styles.chairImage}
            src="./images/earringbanner.png"
            alt="Diamond Collection 1"
          />
        </div>
        <div>
          <div className={styles.placeholder}>
            <h1 className={styles.heading}>
              Timeless Beauty: Shop Our Ring Collection
            </h1>
            <h5 className={styles.tag}>
              Find the perfect ring to celebrate love, commitment, or personal
              style.
            </h5>
            <Button
              size="large"
              className={styles.bannerButton}
              onClick={() => navigate("/products")}
            >
              Discover More
            </Button>
          </div>
          <img
            className={styles.chairImage}
            src="./images/ringsbanner.png"
            alt="Diamond Collection 2"
          />
        </div>
        <div>
          <div className={styles.placeholder}>
            <h1 className={styles.heading}>
              Wrist Charms: Explore Our Bracelet Assortment
            </h1>
            <h5 className={styles.tag}>
              Wrap your wrist in luxury with our handcrafted bracelets.
            </h5>
            <Button
              size="large"
              className={styles.bannerButton}
              onClick={() => navigate("/products")}
            >
              Discover More
            </Button>
          </div>
          <img
            className={styles.chairImage}
            src="./images/braceletsbanner.png"
            alt="Diamond Collection 3"
          />
        </div>
        <div>
          <div className={styles.placeholder}>
            <h1 className={styles.heading}>
              Graceful Necklines: Discover Our Necklace Selection
            </h1>
            <h5 className={styles.tag}>
              Adorn your neckline with our captivating necklaces.
            </h5>
            <Button
              size="large"
              className={styles.bannerButton}
              onClick={() => navigate("/products")}
            >
              Discover More
            </Button>
          </div>
          <img
            className={styles.chairImage}
            src="./images/necklacesbanner.png"
            alt="Diamond Collection 3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Herosection;
