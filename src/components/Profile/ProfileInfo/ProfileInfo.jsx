import { Button } from "antd";
import React from "react";

const ProfileUI = () => {
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
            style={{ width: "150px", textAlign: "right", paddingRight: "20px", color: "gray" }}
          >
            Username
          </label>
          <input
            type="text"
            value="gb4x4u_5hf"
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
            style={{ width: "150px", textAlign: "right", paddingRight: "20px", color: "gray" }}
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
            style={{ width: "150px", textAlign: "right", paddingRight: "20px", color: "gray" }}
          >
            Email
          </label>
          <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
            us*************@gmail.com
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
            style={{ width: "150px", textAlign: "right", paddingRight: "20px", color: "gray" }}
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
