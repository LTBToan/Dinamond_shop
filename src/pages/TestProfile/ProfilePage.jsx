import React, { useState } from "react";
import Address from "../../components/Profile/Address/AddAddress";
import ProfileUI from "../../components/Profile/ProfileInfo/ProfileInfo";
import OrderList from "../Order/OrderList";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import PrivacySetting from "../../components/Profile/PrivacySettings/PrivacySetting";

const Sidebar = ({ selectedItem, onSelect }) => {
  const menuItems = [
    "Profile",
    "Address",
    "Change Password",
    "Order History",
    "Voucher",
    "Privacy Settings",
  ];

  return (
    <div
      style={{
        width: "200px",
        paddingRight: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#ccc",
            display: "inline-block",
            lineHeight: "100px",
            fontSize: "24px",
            color: "#fff",
          }}
        >
          No
        </div>
        <div style={{ marginTop: "10px", fontWeight: "bold" }}>gb4x4u_5hf</div>
        <div style={{ color: "#888", cursor: "pointer" }}>Edit Profile</div>
      </div>
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {menuItems.map((item) => (
          <li
            key={item}
            style={{
              padding: "10px 0",
              cursor: "pointer",
              backgroundColor:
                selectedItem === item ? "#f0f0f0" : "transparent",
              color: selectedItem === item ? "#000" : "#333",
              fontWeight: selectedItem === item ? "bold" : "normal",
            }}
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProfilePage = () => {
  const [selectedItem, setSelectedItem] = useState("Profile");

  const renderComponent = () => {
    switch (selectedItem) {
      case "Address":
        return <Address />;
      case "Profile":
        return <ProfileUI />;
      case "Order History":
        return <OrderList />;
      case "Change Password":
        return "Change Password";
      case "Voucher":
        return "Voucher";
      case "Privacy Settings":
        return <PrivacySetting />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          padding: "2rem 10rem 2rem 10rem",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Sidebar selectedItem={selectedItem} onSelect={setSelectedItem} />
        <div
          style={{
            flex: "1",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {renderComponent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
