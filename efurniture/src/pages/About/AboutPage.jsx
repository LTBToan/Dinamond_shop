import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { Paragraph } = Typography;
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <Paragraph className="lead text-center">
          Welcome to Diamond Shop, the premier jewelry store specializing in
          exquisite and elegant diamond rings. At Diamond Shop, we take pride in
          offering our customers the finest diamond products, meticulously
          crafted by talented artisans with exceptional skill and attention to
          detail. We understand that each ring is not just a piece of jewelry,
          but a symbol of love, commitment, and personal style. With a diverse
          collection ranging from classic to modern designs, Diamond Shop is
          dedicated to meeting the unique needs and tastes of every customer.
          Our diamonds are carefully selected to ensure the highest quality,
          accompanied by prestigious international certifications. Visit Diamond
          Shop to experience a luxurious shopping environment, professional
          consultation services, and enjoy exclusive offers tailored just for
          you. We believe that every customer at Diamond Shop will find the
          perfect ring to mark the most memorable moments of their lives.
        </Paragraph>

        <h2 className="text-center py-4">Our Featured Products</h2>
        <Row gutter={16}>
          <Col span={6}>
            <Link to={"/category/ring"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://i5.walmartimages.com/seo/Elegant-1-Carat-Square-Cut-Diamond-Twisted-Band-Pave-Double-Halo-Engagement-Ring-10K-White-Gold_c514c99f-cfe7-4c02-9168-ed17cea8e972.3eef2c114b45c51ae0761d851a806cc7.jpeg"
                  />
                }
              >
                <h4 className="card-title text-center">Diamond Ring White</h4>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/category/necklace"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://www.inayatdiamonds.in/wp-content/uploads/2020/03/j2.jpg"
                  />
                }
              >
                <h4 className="card-title text-center">Diamond Ring Gold</h4>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/category/earrings"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://www.jewelove.in/cdn/shop/files/jewelove-platinum-rose-gold-couple-rings-with-diamonds-jl-pt-998-rg-both-si-ij-28211693060248.jpg?v=1682636759&width=1024"
                  />
                }
              >
                <h4 className="card-title text-center">Diamond Ring Couple</h4>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/category/bracelets"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://cdn.perrian.com/product/pr21-1245/rg/3.webp?w=640&q=100"
                  />
                }
              >
                <h4 className="card-title text-center">Diamond Ring Couple</h4>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
