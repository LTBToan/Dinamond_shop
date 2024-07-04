import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfileUI = () => {
  const [user, setUser] = useState({});
  const currentUserId = sessionStorage.getItem("loginUserId");

  const fetchUserData = async () => {
    await axios
      .get(`http://localhost:8080/api/users/${currentUserId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("DASXAX: ", user);

  return (
    <div style={{ flex: "1", padding: "20px" }}>
      <h2>My Profile</h2>
      <p>Manage and protect your account</p>
      <hr></hr>
      <form>
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            style={{
              width: "150px",
              textAlign: "right",
              paddingRight: "20px",
              color: "gray",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={user.username}
            readOnly
            style={{ flex: "1", padding: "10px", marginTop: "5px" }}
          />
        </div>
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            style={{
              width: "150px",
              textAlign: "right",
              paddingRight: "20px",
              color: "gray",
            }}
          >
            Name
          </label>
          <input
            type="text"
            style={{ flex: "1", padding: "10px", marginTop: "5px" }}
          />
        </div>
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            style={{
              width: "150px",
              textAlign: "right",
              paddingRight: "20px",
              color: "gray",
            }}
          >
            Email
          </label>
          <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
            {user.email}
            <Button style={{ border: "none" }} type="link">
              Change
            </Button>
          </div>
        </div>
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            style={{
              width: "150px",
              textAlign: "right",
              paddingRight: "20px",
              color: "gray",
            }}
          >
            Phone Number
          </label>
          <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value=""
              style={{ flex: "1", padding: "10px", marginTop: "5px" }}
            />
            <Button style={{ border: "none" }} type="link">
              Add
            </Button>
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginLeft: "150px",
            padding: "10px 20px",
            backgroundColor: "#212529",
            color: "white",
            border: "none",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileUI;
