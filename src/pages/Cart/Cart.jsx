import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Divider,
  Button,
  Image,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../../components/Home/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import CartItem from "./CartItem.jsx";
import CartDetailList from "./CartDetailList.jsx";
import AddAddressModal from "../../components/AddAddressModal/AddAddressModal.jsx";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  const currentUserId = sessionStorage.getItem("loginUserId");
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getTotalPrice = (price) => {
    setTotalAmount((c) => c + price / 2);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${currentUserId}`
        );
        setUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/carts/get/user/${currentUserId}`
        );
        setCart(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
    fetchCartItems();
  }, [currentUserId]);

  useEffect(() => {
    if (cart.cartId) {
      const fetchCartItemQuantity = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/carts/product/get/${cart.cartId}`
          );
          console.log("Cart item data:", res.data);
          setCartItems(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };

      fetchCartItemQuantity();
    }
  }, [cart.cartId]);

  console.log("XXXXX: ", cartItems);

  const handleCheckout = async () => {
    console.log("HELLO");
    try {
      await axios
        .post("http://localhost:8080/api/payment/create_payment", {
          items: cartItems,
          orderInfo: "Thanh toan",
          bankCode: "VNBANK",
          orderType: "other",
        })
        .then((res) => {
          const responseData = res.data.url;
          window.location.href = responseData;
          console.log("Post order: ", res.data);
        });
    } catch (error) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Flex justify="center" align="center" height="80vh">
          <Spinner size="xl" />
        </Flex>
      ) : cartItems.length === 0 ? (
        <Flex direction="column" align="center" my={40}>
          <Image
            src="https://www.iconpacks.net/icons/2/free-shopping-cart-icon-1985-thumb.png"
            alt="Empty Cart"
            boxSize="150px"
            mb={4}
          />
          <Text fontStyle="italic" color="gray.500">
            There is nothing here yet
          </Text>
          <Heading size="lg" mt={4}>
            <Link
              to=""
              onClick={() => (window.location.href = "/")}
              color="yellow.600"
            >
              Shop Now <ArrowForwardIcon />
            </Link>
          </Heading>
        </Flex>
      ) : (
        <>
          <Heading color="yellow.600" textAlign="center" my={10}>
            Your Shopping Cart
          </Heading>
          <Flex justify="space-evenly" align="flex-start" mb={30}>
            <Box w="60%" mx={4}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  cartItemId={cart.cartId}
                  productId={item.productId}
                  quantity={item.quantity}
                  totalPrice={getTotalPrice}
                />
              ))}
            </Box>
            <Flex
              direction="column"
              align="center"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              bg="white"
              w="30%"
              px={4}
            >
              <Heading size="md" mb={4} color="yellow.600">
                SUMMARY
              </Heading>
              <Box w="100%" mb={4}>
                {cartItems.map((item) => (
                  <CartDetailList
                    key={item.productId}
                    productId={item.productId}
                    quantity={item.quantity}
                  />
                ))}
              </Box>
              <Divider />
              <Flex justify="space-between" w="100%" mt={4} mb={4}>
                <Text fontSize="xl" fontWeight="bold">
                  Total: {Math.round(totalAmount * 100) / 100} $
                </Text>
              </Flex>
              <Button
                colorScheme="yellow"
                border="none"
                w="100%"
                mb={2}
                onClick={() => {
                  handleCheckout();
                }}
              >
                Checkout
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/017/350/123/original/green-check-mark-icon-in-round-shape-design-png.png"
                  width={6}
                  ml={2}
                />
              </Button>
              <AddAddressModal open={open} setOpen={setOpen} />
              <Button
                variant="outline"
                border="none"
                w="100%"
                mt={2}
                onClick={() => navigate("/")}
              >
                Back to shop <ArrowForwardIcon />
              </Button>
            </Flex>
          </Flex>
        </>
      )}
      <Footer />
    </>
  );
}
