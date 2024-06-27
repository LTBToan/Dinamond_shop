import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Image, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Order.module.css";

export default function OrderItem({ productId, quantity }) {
  const navigate = useNavigate();
  const { Text, Title } = Typography;
  const [product, setProduct] = useState({});

  const fetchProductData = async () => {
    await axios
      .get(`http://localhost:3344/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <td>
        <Image
          src={product.image_url}
          alt=""
          width={100}
          style={{ borderRadius: "20px" }}
        />
      </td>
      <td>
        <p style={{ fontSize: "120%" }}>
          <strong>{product.name}</strong>
        </p>
      </td>
      <td>{quantity}</td>
      <td style={{ fontSize: "120%" }}>
        <strong>{quantity * product.price} $</strong>
      </td>
    </>
  );
}
