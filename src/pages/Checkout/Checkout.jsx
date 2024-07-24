import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  HStack,
  Divider,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import { CartContext } from "../../context/CartContext";
import { generateUniqueId, truncateString } from "../../assistants/Generators";

function Checkout() {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [streetName, setStreetName] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
  const [addressData, setAddressData] = useState("");
  const [phone, setPhone] = useState("");

  const currentUserId = sessionStorage.getItem("loginUserId");
  const { cartItems, totalAmount } = useContext(CartContext);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const { data } = await axios.get(
          `https://vapi.vnappmob.com/api/province/`
        );
        setProvince(data.results);
      } catch (error) {
        console.log("Error get province: ", error);
      }
    };

    fetchProvince();
  }, []);

  const handleSelectProvince = async (event) => {
    const province_id = event.target.value;
    const province_name = event.target.options[event.target.selectedIndex].text;
    setSelectedProvinceName(province_name);
    try {
      const { data } = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province_id}`
      );
      setDistrict(data.results);
      setSelectedDistrictName("");
      setSelectedWardName("");
    } catch (error) {
      console.log("Error get the district: ", error);
    }
  };

  const handleSelectDistrict = async (event) => {
    const district_id = event.target.value;
    const district_name = event.target.options[event.target.selectedIndex].text;
    setSelectedDistrictName(district_name);
    try {
      const { data } = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district_id}`
      );
      setWard(data.results);
      setSelectedWardName("");
    } catch (error) {
      console.log("Error get the ward: ", error);
    }
  };

  const handleSelectWard = (event) => {
    const ward_name = event.target.options[event.target.selectedIndex].text;
    setSelectedWardName(ward_name);
  };

  const handleStreetNameChange = (event) => {
    setStreetName(event.target.value);
  };

  useEffect(() => {
    setAddressData(
      `${streetName}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`
    );
  }, [
    streetName,
    selectedWardName,
    selectedDistrictName,
    selectedProvinceName,
  ]);

  const handleCheckout = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/users/patch/${currentUserId}`,
        {
          address: addressData
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D"),
          // phonenumber: phone,
        }
      );

      const res = await axios.post(
        "http://localhost:8080/api/payment/create_payment",
        {
          items: cartItems,
          orderInfo: generateUniqueId("O", 6),
          bankCode: "VNBANK",
          orderType: "other",
        }
      );
      const responseData = res.data.url;
      window.location.href = responseData;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box p={8}>
        <HStack spacing={8} align="start">
          {/* Billing Details */}
          <VStack
            spacing={4}
            flex="60%"
            align="start"
            borderWidth={1}
            borderRadius="md"
            p={6}
          >
            <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
              Billing Details
            </Text>
            <FormControl id="province" isRequired>
              <FormLabel>Province:</FormLabel>
              <Stack spacing={3}>
                <Select
                  variant="outline"
                  placeholder="Select your province"
                  onChange={handleSelectProvince}
                  zIndex={1}
                >
                  {province &&
                    province.map((provin) => (
                      <option
                        key={provin.province_id}
                        value={provin.province_id}
                      >
                        {provin.province_name}
                      </option>
                    ))}
                </Select>
              </Stack>
            </FormControl>
            <HStack spacing={4} width="full">
              <FormControl id="district" isRequired>
                <FormLabel>District:</FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select your district"
                  onChange={handleSelectDistrict}
                >
                  {district &&
                    district.map((dist) => (
                      <option key={dist.district_id} value={dist.district_id}>
                        {dist.district_name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl id="ward" isRequired>
                <FormLabel>Ward:</FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select your ward"
                  onChange={handleSelectWard}
                >
                  {ward &&
                    ward.map((war) => (
                      <option key={war.ward_id} value={war.ward_id}>
                        {war.ward_name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </HStack>
            <FormControl id="street-address" isRequired>
              <FormLabel>Street address</FormLabel>
              <Input
                placeholder="House number and street name"
                value={streetName}
                onChange={handleStreetNameChange}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="Enter your phone number"
                type="number"
                onChange={(event) => setPhone(event.target.value)}
              />
            </FormControl>
            <FormControl id="order-notes">
              <FormLabel>Order notes (optional)</FormLabel>
              <Textarea
                h="200px"
                placeholder="Notes about your order, e.g. special notes for delivery"
              />
            </FormControl>
          </VStack>

          {/* Order Summary */}
          <VStack
            spacing={4}
            flex="15%"
            borderWidth={1}
            borderRadius="md"
            p={4}
          >
            <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
              Your Order
            </Text>
            <VStack spacing={2} width="full">
              <HStack justifyContent="space-between" width="full">
                <Text fontWeight="bold">Product</Text>
                <Text fontWeight="bold">Price</Text>
              </HStack>
              <HStack justifyContent="space-between" width="full">
                <Text>
                  {cartItems &&
                    cartItems.map((item) => (
                      <Text>
                        {truncateString(item.prodName, 20)} x {item.quantity}
                      </Text>
                    ))}
                </Text>
                <Text>
                  {cartItems &&
                    cartItems.map((item) => (
                      <Text>{item.price.toLocaleString()}₫</Text>
                    ))}
                </Text>
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" width="full">
                <Text fontWeight="bold">Total</Text>
                <Text>{totalAmount.toLocaleString()}₫</Text>
              </HStack>
              <Button
                colorScheme="yellow"
                width="full"
                border="none"
                onClick={handleCheckout}
              >
                Place Order
              </Button>
            </VStack>
          </VStack>
        </HStack>
      </Box>
      <Footer />
    </>
  );
}

export default Checkout;
