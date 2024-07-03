import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { Button, Image, Divider, Typography, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import emailjs from "@emailjs/browser";
import {
  generateCode,
  generateId,
  generatePassword,
} from "../../assistants/Generators";
import dateFormat from "../../assistants/date.format";
import axios from "axios";
import eFurniLogo from "../../assets/logos/logoDia.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";

export default function Signup() {
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const formRef = useRef();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { Text } = Typography;

  const [registerUser, setRegisterUser] = useState({
    accountId: "",
    email: "",
    password: "",
    username: "",
    fullname: "",
    role: "",
    phonenumber: "",
    address: "",
  });

  const [verifyCode, setVerifyCode] = useState("");
  const [codeStatus, setCodeStatus] = useState("");

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
            sessionStorage.setItem("loginUserId", foundUserByEmail.accountId);
          } else {
            const newUserId = generateId(30, "");
            var registerUser = {
              accountId: newUserId,
              email: decoded.email,
              password: generatePassword(20),
              username: "",
              fullname: decoded.name,
              role: "US",
              phonenumber: "",
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

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_qm91avr",
        "template_yyrd4jj",
        formRef.current,
        "WcYGL3eDIXuI0SMzS"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const signupForm = useFormik({
    initialValues: {
      email: location.state?.email,
      password: "",
      confirm: "",
      fullname: "",
      code: generateCode(6, ""),
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
      password: Yup.string()
        .min(5, "Password must contains within 5-18 symbols")
        .max(18, "Password must contains within 5-18 letters")
        .required("Please enter your password"),
      confirm: Yup.string().test(
        "passwords-match",
        "Passwords does not match",
        function (value) {
          return this.parent.password === value;
        }
      ),
      fullname: Yup.string().required("Please enter your full name"),
    }),
    onSubmit: async (values) => {
      const newUserId = generateId(30, "");
      setVerifyCode(values.code);
      setRegisterUser({
        accountId: newUserId,
        email: values.email,
        password: values.password,
        username: values.fullname,
        fullname: values.fullname,
        role: "US",
        phonenumber: "",
        address: "",
      });
      sendEmail();
      showModal();
    },
  });

  const codeVerifyForm = useFormik({
    initialValues: {
      code: "",
      email: registerUser.email,
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .min(6, "Verify code should be a 6-digit one.")
        .max(6, "Verify code should be a 6-digit one.")
        .required(""),
    }),
    onSubmit: (values) => {
      if (values.code === verifyCode) {
        console.log("Res: ", registerUser);
        axios
          .post("http://localhost:8080/api/users", registerUser)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        setIsLoading(true);
        setTimeout(() => {
          setOpen(false);
          setIsLoading(false);
          navigate("/signin", { state: { noti: "create" } });
        }, 2000);
      } else {
        setCodeStatus(
          "Incorrect verification code ! Please check your email and try again."
        );
      }
    },
  });

  console.log(verifyCode);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.rightContainer}>
          <Image
            className={styles.image}
            src={eFurniLogo}
            width={200}
            preview={false}
          />
          <form
            ref={formRef}
            onSubmit={signupForm.handleSubmit}
            className={styles.formContainer}
          >
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.email}
              />
              <div className={styles.error}>
                {signupForm.touched.email && signupForm.errors.email ? (
                  <i>{signupForm.errors.email}</i>
                ) : null}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.password}
              />
              <div className={styles.error}>
                {signupForm.touched.password && signupForm.errors.password ? (
                  <i>{signupForm.errors.password}</i>
                ) : null}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="confirm"
                placeholder="Confirm password"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.confirm}
              />
              <div className={styles.error}>
                {signupForm.touched.confirm && signupForm.errors.confirm ? (
                  <i>{signupForm.errors.confirm}</i>
                ) : null}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="fullname"
                placeholder="Full name"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.fullname}
              />
              <div className={styles.error}>
                {signupForm.touched.fullname && signupForm.errors.fullname ? (
                  <i>{signupForm.errors.fullname}</i>
                ) : null}
              </div>
            </div>
            <input
              type="hidden"
              name="code"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.code}
            />
            <br />
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              block
              disabled={isLoading ? true : false}
            >
              {isLoading ? <LoadingOutlined /> : <p>Sign up</p>}
            </Button>
          </form>
          <Divider>
            <Text italic style={{ fontSize: "70%" }}>
              or you can sign up with
            </Text>
          </Divider>
          <div className={styles.otherLogin}>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              size="medium"
              type="standard"
            />
            <Modal
              title="Email sent"
              open={open}
              onCancel={handleCancel}
              confirmLoading={isLoading}
              footer={null}
            >
              <form onSubmit={codeVerifyForm.handleSubmit}>
                <h5>Please check your email for the verification code.</h5>
                <br />
                <input
                  type="text"
                  name="code"
                  placeholder="Enter the code here"
                  onChange={codeVerifyForm.handleChange}
                  onBlur={codeVerifyForm.handleBlur}
                  value={codeVerifyForm.values.code}
                />
                <div className={styles.error}>
                  {codeStatus != "" ? <i>{codeStatus}</i> : null}
                </div>
                <input
                  type="hidden"
                  name="email"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.email}
                />
                <span className={styles.modalButtonGroup}>
                  <Button type="default" shape="round" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? <LoadingOutlined /> : <p>Verify</p>}
                  </Button>
                </span>
              </form>
            </Modal>
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
