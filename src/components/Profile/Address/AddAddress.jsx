import React, { useState } from "react";
import AddressForm from "./AddressModal";
import { Image } from "antd";

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState(true);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>My Address</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#212529",
            color: "white",
            border: "none",
            float: "right",
          }}
        >
          + Add New Address
        </button>
      </div>
      <hr />
      {address ? (
        <p>hello</p>
      ) : (
        <div style={{ clear: "both", textAlign: "center", marginTop: "120px" }}>
          <Image
            src="https://png.pngtree.com/png-clipart/20220429/original/pngtree-pin-location-icon-with-folded-map-png-image_7581594.png"
            alt="No address"
            width={100}
            preview={false}
          />
          <p>You don't have addresses yet.</p>
        </div>
      )}
      <AddressForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default Address;
