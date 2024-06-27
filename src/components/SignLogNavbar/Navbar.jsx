import React, { useEffect, useState } from "react";
import eFurniLogo from "../../assets/logos/diamondlogo.png";
import "../../css/testnavbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FileDoneOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [currentUser, setCurrentUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [userCart, setUserCart] = useState([]);

  const handleMenuClick = (i) => {
    categories.map((item) => {
      if (item.key === i.key) {
        window.location.href = `/category/${item.label.toLowerCase()}`;
      }
    });
  };

  const fetchUserData = async () => {
    if (currentUserId) {
      await axios
        .get(`http://localhost:3344/users/${currentUserId}`)
        .then((res) => {
          setCurrentUser(res.data[0]);
        })
        .catch((err) => console.log(err.message));
    }
  };

  console.log("ca", currentUser);

  const fetchCategoryData = async () => {
    await axios
      .get("http://localhost:3344/categories")
      .then((res) => {
        let a = res.data;
        a.map((item, i) => {
          item["label"] = item.category_name;
          item["key"] = i.toString();
        });
        setCategories(a);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchUserCartData = async () => {
    if (currentUserId) {
      await axios
        .get(`http://localhost:3344/cartItems/${currentUserId}`)
        .then((res) => {
          setUserCart(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCategoryData();
    fetchUserCartData();
  }, [currentUserId]);

  const menuProps = {
    items: categories,
    onClick: handleMenuClick,
  };

  const logout = () => {
    sessionStorage.removeItem("loginUserId");
    setCurrentUser(null);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <img className="logo" src={eFurniLogo} alt="" />
        </Link>
      </div>
      <div style={{ display: "flex", marginRight: "100px" }}>
        <div className="menu-item">
          <span>RINGS</span>
          <div className="mega-menu">
            <div className="mega-menu-content">
              <div className="mega-menu-section">
                <h4>RING STYLES</h4>
                <ul>
                  <li>Solitaire</li>
                  <li>3 Stone Trilogy</li>
                  <li>Halo</li>
                  <li>Sidestone</li>
                  <li>Vintage</li>
                  <li>Cluster</li>
                  <li>Bridal Sets</li>
                  <li>Statement</li>
                  <li>Men's</li>
                  <li>All Rings</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>DIAMOND SHAPES</h4>
                <ul>
                  <li>Round</li>
                  <li>Princess cut</li>
                  <li>Emerald cut</li>
                  <li>Pear</li>
                  <li>Oval</li>
                  <li>Cushion</li>
                  <li>Baguette</li>
                  <li>Marquise</li>
                  <li>Radiant</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>GEMSTONE</h4>
                <ul>
                  <li>Mined Diamond</li>
                  <li>Lab Grown Diamond</li>
                  <li>Sapphire</li>
                  <li>Emerald</li>
                  <li>Ruby</li>
                  <li>Aquamarine</li>
                  <li>Tanzanite</li>
                  <li>Blue topaz</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>MATERIALS</h4>
                <ul>
                  <li>Yellow Gold</li>
                  <li>White Gold</li>
                  <li>Platinum</li>
                  <li>Silver</li>
                </ul>
                {/* <h4>BEST SELLERS</h4>
                <ul>
                  <li>Under ₫16,743,100</li>
                  <li>₫16,743,100 – ₫33,486,100</li>
                  <li>₫33,486,100 – ₫66,972,100</li>
                  <li>₫66,972,100 – ₫100,458,100</li>
                  <li>₫100,458,100 – ₫167,430,200</li>
                  <li>₫167,430,200+</li>
                </ul> */}
              </div>
              <div className="mega-menu-section">
                <img
                  src="https://images.ctfassets.net/7m8i36sp5l90/LXdm3IQFwGSPDYMbToZjw/e1f5e0f20330c16e0081aca990e0a7eb/diamond-right-hand-rings_thumb5.jpg"
                  style={{ width: "225px", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="menu-item">
          <span>BRACELETS</span>
          <div className="mega-menu">
            <div className="mega-menu-content">
              <div className="mega-menu-section">
                <h4>BRACELET TYPES</h4>
                <ul>
                  <li>Chain Bracelets</li>
                  <li>Bangle Bracelets</li>
                  <li>Cuff Bracelets</li>
                  <li>Beaded Bracelets</li>
                  <li>Diamond Bracelets</li>
                  <li>Gemstone Bracelets</li>
                  <li>Pearl Bracelets</li>
                  <li>All Bracelets</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>GEMSTONE</h4>
                <ul>
                  <li>Mined Diamond</li>
                  <li>Lab Grown Diamond</li>
                  <li>Sapphire</li>
                  <li>Emerald</li>
                  <li>Ruby</li>
                  <li>Aquamarine</li>
                  <li>Tanzanite</li>
                  <li>Blue topaz</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>MATERIALS</h4>
                <ul>
                  <li>Yellow Gold</li>
                  <li>White Gold</li>
                  <li>Platinum</li>
                  <li>Silver</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <img
                  src="https://zevarking.com/cdn/shop/collections/IMG_3095.jpg?v=1708827628"
                  style={{ width: "225px", height: "auto" }}
                />
              </div>
              {/* Additional sections for Bracelets can be added here */}
            </div>
          </div>
        </div>

        <div className="menu-item">
          <span>EARRINGS</span>
          <div className="mega-menu">
            <div className="mega-menu-content">
              <div className="mega-menu-section">
                <h4>EARRING STYLES</h4>
                <ul>
                  <li>Stud Earrings</li>
                  <li>Hoop Earrings</li>
                  <li>Dangle Earrings</li>
                  <li>Drop Earrings</li>
                  <li>Chandelier Earrings</li>
                  <li>Cluster Earrings</li>
                  <li>Ear Cuffs</li>
                  <li>All Earrings</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>GEMSTONE</h4>
                <ul>
                  <li>Mined Diamond</li>
                  <li>Lab Grown Diamond</li>
                  <li>Sapphire</li>
                  <li>Emerald</li>
                  <li>Ruby</li>
                  <li>Aquamarine</li>
                  <li>Tanzanite</li>
                  <li>Blue topaz</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>MATERIALS</h4>
                <ul>
                  <li>Yellow Gold</li>
                  <li>White Gold</li>
                  <li>Platinum</li>
                  <li>Silver</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <img
                  src="https://cdn.shopify.com/s/files/1/0044/1263/7277/files/KIMAI_FEVRIER_5_0263_fa36c63c-dd7b-4cce-9113-c0247923be66_860x864_crop_center.jpg?v=1710326132"
                  style={{ width: "225px", height: "auto" }}
                />
              </div>
              {/* Additional sections for Earrings can be added here */}
            </div>
          </div>
        </div>

        <div className="menu-item">
          <span>NECKLACES</span>
          <div className="mega-menu">
            <div className="mega-menu-content">
              <div className="mega-menu-section">
                <h4>NECKLACE TYPES</h4>
                <ul>
                  <li>Chain Necklaces</li>
                  <li>Pendant Necklaces</li>
                  <li>Choker Necklaces</li>
                  <li>Statement Necklaces</li>
                  <li>Pearl Necklaces</li>
                  <li>Diamond Necklaces</li>
                  <li>Gemstone Necklaces</li>
                  <li>All Necklaces</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>GEMSTONE</h4>
                <ul>
                  <li>Mined Diamond</li>
                  <li>Lab Grown Diamond</li>
                  <li>Sapphire</li>
                  <li>Emerald</li>
                  <li>Ruby</li>
                  <li>Aquamarine</li>
                  <li>Tanzanite</li>
                  <li>Blue topaz</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <h4>MATERIALS</h4>
                <ul>
                  <li>Yellow Gold</li>
                  <li>White Gold</li>
                  <li>Platinum</li>
                  <li>Silver</li>
                </ul>
              </div>
              <div className="mega-menu-section">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReY5mJx_FGwyrcEgQkhklCCKQ8uFhD9srHEg&s" />
              </div>
              {/* Additional sections for Necklaces can be added here */}
            </div>
          </div>
        </div>
        <div className="menu-item">
          <span onClick={() => navigate("/contact")}>SERVICE & SUPPORT</span>
        </div>
      </div>

      <div className="right">
        <button className="iconButton" onClick={() => navigate(`/search`)}>
          <SearchOutlined style={{ color: "#FFF", fontSize: "150%" }} />
        </button>
        {currentUser ? (
          <>
            <Tooltip title="Orders">
              <button className="iconButton" onClick={() => navigate(`/order`)}>
                <FileDoneOutlined style={{ color: "#FFF", fontSize: "150%" }} />
              </button>
            </Tooltip>
            <Tooltip title="Cart">
              <Badge count={userCart.length} showZero={true} title="">
                <button
                  className="iconButton"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCartOutlined
                    style={{ color: "#FFF", fontSize: "180%" }}
                  />
                </button>
              </Badge>
            </Tooltip>
            <Tooltip title="Profile">
              <button
                className="iconButton"
                onClick={() => navigate(`/profile/${currentUserId}`)}
              >
                <UserOutlined style={{ color: "#ce8f2b", fontSize: "150%" }} />
              </button>
            </Tooltip>
            <Tooltip title="Log out">
              <button className="logButton" onClick={logout}>
                <LogoutOutlined style={{ fontSize: "150%" }} />
              </button>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Sign in">
            <button className="logButton" onClick={() => navigate("/signin")}>
              <LoginOutlined style={{ fontSize: "150%" }} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Navbar;
