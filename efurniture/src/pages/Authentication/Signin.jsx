import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { Button, Image, Divider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import eFurniLogo from "../../assets/logos/DiamondBlue.jpg";
import { generateId, generatePassword } from "../../assistants/Generators";
import dateFormat from "../../assistants/date.format";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { Text } = Typography;
  const randomImage =
    "data:image/jpeg;base64,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";

  useEffect(() => {
    if (location.state) {
      if (location.state?.noti === "signup") {
        toast.warning(
          "Your email has been registered before. Please enter your password to sign in."
        );
      }
      if (location.state?.noti === "reset") {
        toast.success("Your password has been successfully reset.");
      }
      if (location.state?.noti === "create") {
        toast.success(
          "Your account has been successfully signed up. Please login to continue."
        );
      }
    }
  }, []);

  const onGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    var decoded;
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential);
      console.log(
        "SIGNIN SUCCESSFULLY. Google login user's email:",
        decoded.email
      );

      await fetch("http://localhost:3344/users")
        .then((res) => res.json())
        .then((data) => {
          var foundUserByEmail = data.find(
            (account) => account.email === decoded.email
          );
          if (foundUserByEmail) {
            sessionStorage.setItem("loginUserId", foundUserByEmail.user_id);
          } else {
            const newUserId = generateId(30, "");
            const createAt = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
            var registerUser = {
              user_id: newUserId,
              email: decoded.email,
              password: generatePassword(20),
              fullName: decoded.name,
              role_id: "US",
              phone: "",
              create_at: createAt,
              status: true,
              efpoint: 0,
            };
            axios
              .post("http://localhost:3344/users", registerUser)
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

  const loginForm = useFormik({
    initialValues: {
      email: location.state?.email,
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      await fetch("http://localhost:3344/users")
        .then((res) => res.json())
        .then((data) => {
          var loginUser = data.find(
            (account) =>
              account.email === values.email &&
              account.password === values.password
          );
          if (loginUser) {
            sessionStorage.setItem("loginUserId", loginUser.user_id);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/");
            }, 2000);
          } else {
            setTimeout(() => {
              setIsLoading(false);
              toast.error("Incorrect credentials. Please try again.");
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Image src={randomImage} width={400} preview={false} />
      </div>
      <Divider type="vertical" />
      <div className={styles.rightContainer}>
        <Image
          className={styles.image}
          src={eFurniLogo}
          width={250}
          preview={false}
        />
        <form
          onSubmit={loginForm.handleSubmit}
          className={styles.formContainer}
        >
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
            />
          </div>
          <Button
            type="link"
            className={styles.forgot}
            onClick={() => {
              navigate("/forgot");
            }}
          >
            Forgot password?
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            block
            disabled={isLoading ? true : false}
          >
            {isLoading ? <LoadingOutlined /> : <p>Sign in</p>}
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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={1}
        />
        <div className={styles.formFooter}>
          <p>Don't have an account yet?&nbsp;</p>
          <a
            onClick={() => {
              navigate("/signup/email");
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
