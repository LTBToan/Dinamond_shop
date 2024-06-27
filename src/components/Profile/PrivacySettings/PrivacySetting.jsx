import { Button } from "antd";
import React, { useState } from "react";

const PrivacySetting = () => {
  const [currentView, setCurrentView] = useState("privacy");

  const handleDeleteClick = () => {
    setCurrentView("deleteConfirmation");
  };

  return (
    <>
      {currentView === "privacy" ? (
        <>
          <h2>Privacy Settings</h2>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Request Account Deletion</p>
            <Button
              style={{
                backgroundColor: "#212529",
                color: "white",
                width: "100px",
                fontSize: "16px",
                border: "none",
              }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </>
      ) : (
        <DeleteConfirmation />
      )}
    </>
  );
};

const DeleteConfirmation = () => {
  return (
    <>
      <h2>Important</h2>
      <hr />
      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
        <li>
          Any remaining/unused Coins, purchased seller Coins, paid ads credit,
          vouchers, coupons, and other paid services in your account will be
          forfeited.
        </li>
        <li>
          Continuing with the application will be considered as your
          confirmation that there are no pending buying or selling transactions
          in your account, including any unused or non-refunded e-vouchers, etc.
        </li>
        <li>
          After successful deletion of your account, we will continue to
          hold transactional data for financial audit purposes.
        </li>
        <li>
          After successful deletion of your account, you will not be able to log
          in to a deleted account and view previous account history.
        </li>
        <li>
          After successful deletion of your account, you will not be able to
          access your affiliate account, and any remaining affiliate
          order/commission in your account will be forfeited.
        </li>
        <li>
          Shopee reserves the right to reject future account creation requests.
        </li>
      </ul>
      <Button
        style={{
          backgroundColor: "red",
          color: "white",
          marginTop: "30px",
          border: "none",
        }}
        size="large"
      >
        Proceed
      </Button>
    </>
  );
};

export default PrivacySetting;
