import React from "react";
import styles from "../../css/footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.footerContainer}>
          {/* <div className={styles.icon}>
            <img className={styles.logo} src="./images/logo.png" alt="" />
          </div> */}
          <div className={styles.Services}>
            <h3>Service</h3>
            <p>Delivery Service</p>
            <p>Customer Service</p>
          </div>
          <div className={styles.Link}>
            <h3>Links</h3>
            <p>Buying Guides</p>
            <p>Size guide</p>
            <p>FAQ's</p>
          </div>
          <div className={styles.Support}>
            <h3>Support</h3>
            <p>Monday to Sunday: 8 am - 8 pm</p>
            <p>DiamondLuxury@email.com</p>
            <p>Phone: +84 963210123</p>
          </div>
        </div>
        <div className={styles.SocialMediaLinks}>
          <div className={styles.SocialMediaLinksImg}>
            <a href="#">
              <img src="./images/linkdein.svg" alt="" />
            </a>
          </div>
          <div className={styles.SocialMediaLinksImg}>
            <a href="#">
              <img src="./images/facebook.svg" alt="" />
            </a>
          </div>
          <div className={styles.SocialMediaLinksImg}>
            <a href="#">
              <img src="./images/insta.svg" alt="" />
            </a>
          </div>
          <div className={styles.SocialMediaLinksImg}>
            <a href="#">
              <img src="./images/twitter.svg" alt="" />
            </a>
          </div>
        </div>
        <div className={styles.teamLine}></div>
      </div>
    </>
  );
};

export default Footer;
