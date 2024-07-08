import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Input,
  Divider,
  HStack,
  Spinner,
  Badge,
  Circle,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import RelatedProducts from "../../components/Related Products/RelatedProducts";
import Footer from "../../components/Home/Footer";
import SizeGuide from "./SizeGuide";
import { useCart } from "../../context/CartContext";
import { useFormik } from "formik";
import { generateUniqueId } from "../../assistants/Generators";

import payment_option_img from "../../assets/img/product/payment-option.png";

export default function Product() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    imageLink: "",
    description: "",
    productPrice: "",
    productSize: "",
    categoryId: "",
    status: 0,
  });
  const [shellProduct, setShellProduct] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const fetchProductInfo = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/products/get/${id}`
      );
      setCurrentProduct(res.data);
      setMainImage(res.data.imageLink);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShellProduct = async (shellId) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/products/get/shell/${shellId}`
      );
      setShellProduct(res.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductInfo();
  }, [id]);

  useEffect(() => {
    if (currentProduct.shellId) {
      fetchShellProduct(currentProduct.shellId);
    }
  }, [currentProduct.shellId]);

  const onQuantityChange = (value) => {
    if (value) setQuantity(value);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((currentQuantity) => currentQuantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 3) setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessage("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage("Please select a size.");
      return;
    }

    const updatedPrice = currentProduct.productPrice + selectedSize * 1000;

    addToCart(
      id,
      currentProduct.productName,
      updatedPrice,
      selectedSize,
      quantity
    );
  };

  console.log("XAXA: ", shellProduct);

  const buyNowForm = useFormik({
    initialValues: {
      quantity: quantity,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!selectedSize) {
        setErrorMessage("Please select a size.");
        return;
      }

      const updatedPrice = currentProduct.productPrice + selectedSize * 1000;

      console.log("Buy now form values: ", values);
      try {
        const res = await axios.post(
          "http://localhost:8080/api/payment/create_payment",
          {
            items: [
              {
                productId: id,
                productName: currentProduct.productName,
                quantity: values.quantity,
                price: updatedPrice,
              },
            ],
            orderInfo: generateUniqueId("O", 6),
            bankCode: "VNBANK",
            orderType: "other",
          }
        );
        const responseData = res.data.url;
        sessionStorage.setItem("productId", id);
        window.location.href = responseData;
        console.log("Post order: ", res.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    },
  });

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Flex align="center" justify="center" style={{ minHeight: "80vh" }}>
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex
            direction={{ base: "column", md: "row" }}
            p={10}
            justifyContent="center"
          >
            <Box w="50%">
              <Image
                src={mainImage}
                alt={currentProduct.productName}
                boxSize="500px"
                objectFit="cover"
                m="auto"
              />
              <HStack mt={5} justifyContent="center">
                <Box
                  onClick={() => {
                    setMainImage(currentProduct.imageLink);
                  }}
                  cursor="pointer"
                  border={
                    mainImage === currentProduct.imageLink
                      ? "1px solid #d4af37"
                      : "none"
                  }
                >
                  <Image
                    src={currentProduct.imageLink}
                    alt={currentProduct.productName}
                    boxSize="100px"
                    objectFit="cover"
                    _hover={{ border: "1px solid #d4af37", transition: "0.5s" }}
                  />
                </Box>
                {/* <Box
                  onClick={() => {
                    setMainImage(
                      "https://www.candere.com/media/jewellery/images/GR00103__1.jpeg"
                    );
                  }}
                  cursor="pointer"
                  border={
                    mainImage ===
                    "https://www.candere.com/media/jewellery/images/GR00103__1.jpeg"
                      ? "1px solid #d4af37"
                      : "none"
                  }
                >
                  <Image
                    src="https://www.candere.com/media/jewellery/images/GR00103__1.jpeg"
                    alt={currentProduct.productName}
                    boxSize="100px"
                    objectFit="cover"
                    _hover={{ border: "1px solid #d4af37", transition: "0.5s" }}
                  />
                </Box>
                <Box
                  onClick={() => {
                    setMainImage(
                      "https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/opr11105_1_0ufvimxzal9jqm1w.jpg"
                    );
                  }}
                  cursor="pointer"
                  border={
                    mainImage ===
                    "https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/opr11105_1_0ufvimxzal9jqm1w.jpg"
                      ? "1px solid #d4af37"
                      : "none"
                  }
                >
                  <Image
                    src="https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/opr11105_1_0ufvimxzal9jqm1w.jpg"
                    alt={currentProduct.productName}
                    boxSize="100px"
                    objectFit="cover"
                    _hover={{ border: "1px solid #d4af37", transition: "0.5s" }}
                  />
                </Box> */}
                {shellProduct.map((shell) => {
                  <Box
                    onClick={() => setMainImage(shell.imageLink)}
                    cursor="pointer"
                    border={
                      mainImage === shell.imageLink
                        ? "1px solid #d4af37"
                        : "none"
                    }
                  >
                    <Image
                      src={shell.imageLink}
                      alt={shell.productName}
                      boxSize="100px"
                      objectFit="cover"
                      _hover={{
                        border: "1px solid #d4af37",
                        transition: "0.5s",
                      }}
                    />
                  </Box>;
                })}
              </HStack>
            </Box>
            <Box w="50%" pr={40}>
              <Text lineHeight={1.2} fontSize="30px" fontWeight="400">
                {currentProduct.productName}
              </Text>
              <Badge px="2" my={2} bgColor="#d4af37" color="whitesmoke">
                in stock
              </Badge>
              <Text fontSize="24px" color="yellow.500" fontWeight="600">
                {(
                  currentProduct.productPrice +
                  (selectedSize ? selectedSize * 12000 : 0)
                ).toLocaleString()}
                ₫‌
              </Text>
              <HStack spacing={4} my={2}>
                <Text fontSize="16px">Size:</Text>

                {[7, 8, 9, 10].map((size) => (
                  <Button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    border="none"
                    bg={selectedSize === size ? "yellow.400" : "gray.200"}
                    color={selectedSize === size ? "white" : "black"}
                  >
                    {size}
                  </Button>
                ))}
              </HStack>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <Text fontSize="16px">Material:</Text>
              <HStack spacing={4} my={2}>
                <Circle
                  size="30px"
                  bg="#FFD700"
                  border={
                    mainImage === currentProduct.imageLink
                      ? "2px solid #d4af37"
                      : "none"
                  }
                  onClick={() => setMainImage(currentProduct.imageLink)}
                  cursor="pointer"
                />
                <Circle
                  size="30px"
                  bg="#C0C0C0"
                  border={
                    mainImage ===
                    "https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/opr11105_1_0ufvimxzal9jqm1w.jpg"
                      ? "2px solid #d4af37"
                      : "none"
                  }
                  onClick={() =>
                    setMainImage(
                      "https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/opr11105_1_0ufvimxzal9jqm1w.jpg"
                    )
                  }
                  cursor="pointer"
                />
                <Circle
                  size="30px"
                  bg="#e5e4e2"
                  border={
                    mainImage ===
                    "https://www.candere.com/media/jewellery/images/GR00103__1.jpeg"
                      ? "2px solid #d4af37"
                      : "none"
                  }
                  onClick={() =>
                    setMainImage(
                      "https://www.candere.com/media/jewellery/images/GR00103__1.jpeg"
                    )
                  }
                  cursor="pointer"
                />
              </HStack>
              <Text fontSize="16px">Quantity:</Text>
              <HStack spacing="3">
                <Button
                  border="none"
                  onClick={decreaseQuantity}
                  isDisabled={quantity <= 1}
                >
                  <MinusIcon />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => onQuantityChange(parseInt(e.target.value))}
                  w="60px"
                  textAlign="center"
                />
                <Button
                  border="none"
                  onClick={increaseQuantity}
                  isDisabled={quantity >= 3}
                >
                  <AddIcon />
                </Button>
                <Button
                  w="100%"
                  p={5}
                  bgColor="white"
                  color="black"
                  border="1px ridge gray"
                  onClick={handleAddToCart}
                  fontSize="14px"
                  _hover={{ bgColor: "black", color: "white" }}
                >
                  Add to Cart
                </Button>
              </HStack>

              <Button
                mt="4"
                border="none"
                bgColor="yellow.400"
                fontSize="18px"
                w="100%"
                onClick={buyNowForm.handleSubmit}
                _hover={{ bgColor: "black", color: "white" }}
              >
                Buy Now
              </Button>

              <Divider my="4" borderColor="gray.400" />

              <Text fontWeight={600}>Guaranteed safe checkout</Text>
              <Image src={payment_option_img} alt="payment_option_img" />

              <Divider my="4" borderColor="gray.400" />
              <Text as="h3" fontSize="20px">
                DETAILS FROM OUR MASTER JEWELLERS
              </Text>
              <Text mt="4" as="p" color="gray.500">
                {currentProduct.description}
              </Text>
            </Box>
          </Flex>

          <SizeGuide categoryId={currentProduct.categoryId} />
          <RelatedProducts categoryId={currentProduct.categoryId} />
        </>
      )}
      <Footer />
    </>
  );
}
