import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { Button, Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import eFurniLogo from "../../assets/logos/logoDia.png";

export default function Reset() {
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  console.log("PARAS: ", params);

  const getUser = async () => {
    await axios
      .get(`http://localhost:8080/api/users/${params.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("ASDAXAXXAXAA: ", user);

  const resetPasswordForm = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, "Password must contains within 5-18 letters")
        .max(18, "Password must contains within 5-18 symbols")
        .required(""),
      confirm: Yup.string().test(
        "passwords-match",
        "Passwords does not match",
        function (value) {
          return this.parent.password === value;
        }
      ),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .put(`http://localhost:8080/api/users/${params.id}`, {
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          password: values.password,
          role: "US",
          phonenumber: 0,
          address: "",
        })
        .then(() => {
          console.log("Password is successfully reset.");
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        setIsLoading(false);
        navigate("/signin", { state: { noti: "reset" } });
      }, 2000);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.rightContainer} style={{ padding: "20px 0" }}>
        <Image
          className={styles.image}
          src={eFurniLogo}
          width={250}
          preview={false}
        />
        <form
          onSubmit={resetPasswordForm.handleSubmit}
          className={styles.formContainer}
        >
          <h5>Enter your email address to reset password.</h5>
          <br />
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              value={resetPasswordForm.values.password}
            />
            <div className={styles.error}>
              {resetPasswordForm.errors.password ? (
                <i>{resetPasswordForm.errors.password}</i>
              ) : null}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm your password"
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              value={resetPasswordForm.values.confirm}
            />
            <div className={styles.error}>
              {resetPasswordForm.errors.confirm ? (
                <i>{resetPasswordForm.errors.confirm}</i>
              ) : null}
            </div>
          </div>
          <span
            className={styles.modalButtonGroup}
            style={{ flexDirection: "column", marginTop: "20px" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              block
              disabled={isLoading ? true : false}
            >
              {isLoading ? <LoadingOutlined /> : <p>Finish</p>}
            </Button>
            <Button
              type="default"
              shape="round"
              block
              onClick={() => {
                navigate("/signin");
              }}
            >
              Back
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
}
