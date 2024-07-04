import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Input,
  Divider,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon, MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import RelatedProducts from "../../components/Related Products/RelatedProducts";
import Footer from "../../components/Home/Footer";
import SizeGuide from "./SizeGuide";
import { useCart } from "../../context/CartContext";

export default function Product() {
  const userId = sessionStorage.getItem("loginUserId");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    imageLink: "",
    description: "",
    productPrice: "",
    category_name: "",
    status: 0,
  });
  const { id } = useParams();

  const fetchProductInfo = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/products/get/${id}`)
      .then((res) => {
        setCurrentProduct(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const onQuantityChange = (value) => {
    if (value) setQuantity(value);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((currentQuantity) => currentQuantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 20) setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(
      id,
      currentProduct.productName,
      currentProduct.productPrice,
      quantity
    );
  };

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
            <Box ml={100} w="10%">
              <VStack>
                <Image
                  src={currentProduct.imageLink}
                  alt={currentProduct.productName}
                  boxSize="100px"
                  objectFit="cover"
                  onClick={() => console.log("Thumbnail clicked")}
                  cursor="pointer"
                />
                <Image
                  src={currentProduct.imageLink}
                  alt={currentProduct.productName}
                  boxSize="100px"
                  objectFit="cover"
                  onClick={() => console.log("Thumbnail clicked")}
                  cursor="pointer"
                />
              </VStack>
            </Box>
            <Box w="40%">
              <Image
                src={currentProduct.imageLink}
                alt={currentProduct.productName}
                boxSize="400px"
                objectFit="cover"
                pt={50}
                m="auto"
              />
            </Box>
            <Box p="4" w="50%">
              <Text fontSize="36px" fontWeight="600">
                {currentProduct.productName}
              </Text>
              <Text fontSize="xl" color="gray.500">
                {currentProduct.productPrice} $
              </Text>

              <Divider my="4" borderColor="gray.400" />

              <HStack spacing="4">
                <Button onClick={decreaseQuantity} isDisabled={quantity <= 1}>
                  <MinusIcon />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => onQuantityChange(parseInt(e.target.value))}
                  w="60px"
                  textAlign="center"
                />
                <Button onClick={increaseQuantity} isDisabled={quantity >= 20}>
                  <AddIcon />
                </Button>
              </HStack>
              <Button
                mt="4"
                colorScheme="teal"
                border="none"
                onClick={handleAddToCart}
              >
                ADD TO BAG
              </Button>
              <Button
                mt="4"
                border="none"
                colorScheme="yellow"
                // onClick={buyNowForm.handleSubmit}
              >
                BUY NOW
              </Button>

              <Divider my="4" borderColor="gray.400" />
              <Text as="p" fontSize="18px">
                <CheckIcon mx={3} />
                Product prices vary depending on the weight of gold and stones
              </Text>
              <Text as="p" fontSize="18px">
                <CheckIcon mx={3} />
                Exchange products within 48 hours at PNJ stores
              </Text>
              <Text as="p" fontSize="18px">
                <CheckIcon mx={3} />
                Pawnbroking and Purchasing.
              </Text>
              <Text as="p" fontSize="18px">
                <CheckIcon mx={3} />
                Free fast delivery nationwide 1-7 days
              </Text>

              <Divider my="4" borderColor="gray.400" />
              <Text as="h3" fontSize="20px">
                DETAILS FROM OUR MASTER JEWELLERS
              </Text>
              <Text mt="4" as="p" color="gray.500">
                {/* {currentProduct.description} */}
                Get the look of beautiful luxury on your wedding day with this
                magnificent Danielle diamond wedding ring featuring exquisite
                milgrain work. Skillfully handcrafted with 0.30ct of H/Si
                quality diamonds in UK hallmarked platinum. Also available with
                a perfectly matching Danielle diamond engagement ring.
              </Text>
            </Box>
          </Flex>

          <SizeGuide />
          <RelatedProducts />
        </>
      )}
      <Footer />
    </>
  );
}
