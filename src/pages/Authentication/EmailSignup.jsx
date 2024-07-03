import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { Button, Image, Divider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { generateId, generatePassword, generateUniqueId } from "../../assistants/Generators";
import dateFormat from "../../assistants/date.format";
import axios from "axios";
import eFurniLogo from "../../assets/logos/logoDia.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";

export default function EmailSignup() {
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const [isLoading, setIsLoading] = useState(false);
  const { Text } = Typography;

  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please enter your email"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      await fetch("http://localhost:8080/api/users")
        .then((res) => res.json())
        .then((data) => {
          var foundAccountByEmail = data.find(
            (account) => account.email === values.email
          );
          if (foundAccountByEmail) {
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
            setTimeout(() => {
              navigate("/signin", {
                state: { noti: "signup", email: values.email },
              });
            }, 2000);
          } else {
            navigate("/signup", { state: { email: values.email } });
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const onGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    var decoded;
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential);
      console.log(
        "SIGNIN SUCCESSFULLY. Google login user's email:",
        decoded.email
      );

      await fetch("http://localhost:8080/api/users")
        .then((res) => res.json())
        .then((data) => {
          var foundUserByEmail = data.find(
            (account) => account.email === decoded.email
          );
          if (foundUserByEmail) {
            sessionStorage.setItem("loginUserId", foundUserByEmail.user_id);
          } else {
            const newUserId = generateId(30, "");
            // const createAt = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
            var registerUser = {
              accountId: newUserId,
              email: decoded.email,
              password: generatePassword(20),
              username: decoded.name,
              fullname: decoded.name,
              role: "US",
              phonenumber: "",
              // create_at: createAt,
              // status: true,
              // efpoint: 0,
              address: "",
            };
            axios
              .post("http://localhost:8080/api/users", registerUser)
              .then(() => {
                console.log(
                  "A new account has been created by email ",
                  decoded.email
                );
              })
              .catch((err) => {
                console.log("Error: ", err.response);
              });
            sessionStorage.setItem("loginUserId", newUserId);
          }
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
    } else {
      console.log("Not found data");
    }
  };

  const onGoogleError = (err) => {
    console.log("Failed to login with Google: ", err.message);
  };

  const handleLick = () => {
    const idUs = generateUniqueId("C", 3);
    console.log("dada:", idUs);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.rightContainer}>
          <Image
            className={styles.image}
            src={eFurniLogo}
            width={250}
            preview={false}
          />
          <button onClick={handleLick}>TESTTTTTTTTTTT</button>
          <form
            onSubmit={emailForm.handleSubmit}
            className={styles.formContainer}
          >
            <div className={styles.inputContainer}>
              <br />
              <h6 style={{ textAlign: "start" }}>Email</h6>
              <input
                type="text"
                name="email"
                placeholder="email@example.com"
                onChange={emailForm.handleChange}
                onBlur={emailForm.handleBlur}
                value={emailForm.values.email}
              />
              <div className={styles.error}>
                {emailForm.errors.email ? (
                  <i>{emailForm.errors.email}</i>
                ) : null}
              </div>
            </div>
            <br />
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              block
              disabled={isLoading ? true : false}
            >
              {isLoading ? <LoadingOutlined /> : <p>Continue</p>}
            </Button>
          </form>
          <Divider>
            <Text italic style={{ fontSize: "70%" }}>
              or you can sign in with
            </Text>
          </Divider>
          <div className={styles.otherLogin}>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              size="medium"
              type="standard"
            />
          </div>
          <div className={styles.formFooter}>
            <p>Already have account?</p>
            <a
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
