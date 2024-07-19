import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import { Typography } from "antd";

const AboutPage = () => {
  const { Paragraph } = Typography;
  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "30px 0",
          paddingInline: 200,
        }}
      >
        <img
          src="https://corano-demo.myshopify.com/cdn/shop/files/about_445x.jpg?v=1613781788"
          style={{ maxWidth: "50%", marginRight: "40px" }}
          alt="About Us"
        />
        <div>
          <h1>About Us</h1>
          <hr />
          <Paragraph>
            <p style={{ fontSize: "18px", fontWeight: 500 }}>
              Founded in 1986, DiamondShop, a family-owned & operated business
              has become a household name in states all over Vietnam as well as
              countries all over the world.
            </p>
            We understand that each ring is not just a piece of jewelry, but a
            symbol of love, commitment, and personal style. With a diverse
            collection ranging from classic to modern designs, Diamond Shop is
            dedicated to meeting the unique needs and tastes of every customer.
            Our diamonds are carefully selected to ensure the highest quality,
            accompanied by prestigious international certifications.
            <br />
            <br />
            Visit Diamond Shop to experience a luxurious shopping environment,
            professional consultation services, and enjoy exclusive offers
            tailored just for you. We believe that every customer at Diamond
            Shop will find the perfect ring to mark the most memorable moments
            of their lives.
          </Paragraph>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AboutPage;
