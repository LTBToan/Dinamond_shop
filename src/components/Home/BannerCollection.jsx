import React from "react";
import { Link } from "react-router-dom";
import banner_bg_1 from "../../assets/img/banner/4/banner-1.jpg";
import banner_bg_2 from "../../assets/img/banner/4/banner-2.jpg";
import banner_bg_3 from "../../assets/img/banner/4/banner-3.jpg";
import banner_bg_4 from "../../assets/img/banner/4/banner-4.jpg";

function BannerItem({ cls, bg_clr, bg, content, title, isBtn = false }) {
  return (
    <div
      className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      style={{
        backgroundColor: `#${bg_clr}`,
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="tp-banner-content-4" style={{ width: "100%" }}>
        <span style={{ display: "block", marginBottom: "10px", color: "#888" }}>
          {content}
        </span>
        <h3
          className="tp-banner-title-4"
          style={{ marginBottom: "10px", fontSize: "24px" }}
        >
          <Link to="/shop" style={{ color: "#000", textDecoration: "none" }}>
            {title}
          </Link>
        </h3>
        {isBtn && (
          <div className="tp-banner-btn-4">
            <Link
              to="/shop"
              className="tp-btn tp-btn-border"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                border: "1px solid #000",
                color: "#000",
                textDecoration: "none",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#000";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#000";
              }}
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
      <div
        className="tp-banner-thumb-4 include-bg black-bg transition-3"
        style={{
          backgroundImage: `url(${bg})`,
          width: "150%",
          height: "250px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}

const JewelryShopBanner = () => {
  return (
    <>
      <section className="tp-banner-area" style={{ padding: "50px 0" }}>
        <div
          className="container"
          style={{ maxWidth: "1500px", margin: "0 auto" }}
        >
          <div
            className="row"
            style={{ display: "flex", flexWrap: "wrap", margin: "-15px" }}
          >
            <div className="col-xl-6 col-lg-7" style={{ padding: "15px" }}>
              <div
                className="row"
                style={{ display: "flex", flexWrap: "wrap", margin: "-15px" }}
              >
                <div className="col-xl-12" style={{ padding: "15px" }}>
                  <BannerItem
                    cls="mb-25"
                    bg_clr="F3F7FF"
                    bg={banner_bg_1}
                    content="Collection"
                    title={
                      <>
                        Ardeco pearl <br /> Rings style 2023
                      </>
                    }
                    isBtn={true}
                  />
                </div>
                <div className="col-md-6 col-sm-6" style={{ padding: "15px" }}>
                  <BannerItem
                    cls="has-green sm-banner"
                    bg_clr="F0F6EF"
                    bg={banner_bg_2}
                    content="Trending"
                    title="Tropical Set"
                  />
                </div>
                <div className="col-md-6 col-sm-6" style={{ padding: "15px" }}>
                  <BannerItem
                    cls="has-brown sm-banner"
                    bg_clr="F8F1E6"
                    bg={banner_bg_3}
                    content="New Arrival"
                    title="Gold Jewelry"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5" style={{ padding: "15px" }}>
              <div
                className="tp-banner-full tp-banner-full-height fix p-relative z-index-1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundImage: `url(${banner_bg_4})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  padding: "20px",
                }}
              >
                <div
                  className="tp-banner-full-content"
                  style={{ position: "relative" }}
                >
                  <span
                    style={{
                      display: "block",
                      color: "#fff",
                    }}
                  >
                    Collection
                  </span>
                  <h3
                    className="tp-banner-full-title"
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      marginBottom: "20px",
                    }}
                  >
                    <Link
                      to="/shop"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "40px",
                      }}
                    >
                      Ring gold with <br /> diamonds
                    </Link>
                  </h3>
                  <div className="tp-banner-full-btn">
                    <Link
                      to="/shop"
                      className="tp-btn tp-btn-border"
                      style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        border: "1px solid #fff",
                        color: "#fff",
                        textDecoration: "none",
                        transition: "background-color 0.3s, color 0.3s",
                        marginBottom: "20px",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#fff";
                        e.target.style.color = "#000";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#fff";
                      }}
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JewelryShopBanner;
