import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tr, Td, Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import OrderItem from "./WarrantyItem";
import Modal from "../../Modal";
import Certificate from "../../Certificate";

export default function WarrantyListItem({ warrantList }) {
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [warrantyList, setWarrantyList] = useState([]);
  const [user, setUser] = useState({});
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchWarrantyList = async () => {
    await axios
      .get(
        `http://localhost:8080/api/warranties/get/account/id/${currentUserId}`
      )
      .then((res) => {
        setWarrantyList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchWarrantyList();
  }, []);

  const fetchUserDate = async () => {
    await axios
      .get(`http://localhost:8080/api/users/${currentUserId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (warrantyList) {
    useEffect(() => {
      fetchUserDate();
    }, []);
  }

  const handleViewClick = (item) => {
    setSelectedWarranty(item);
    setIsOpenModal(true);
  };

  return (
    <>
      {warrantList.map((item, i) => (
        <Tr key={i} justifyContent="center">
          <OrderItem warrantyId={item.warrantyId} productId={item.productId} />
          <Td>
            <Flex direction="column" align="center">
              <Text>{moment(item.purchaseDate).format("DD/MM/YYYY")}</Text>
            </Flex>
          </Td>
          <Td>
            <Flex direction="column" align="center">
              <Text>{moment(item.expireDate).format("DD/MM/YYYY")}</Text>
            </Flex>
          </Td>
          <Td>
            <Button mb={4} border="none" onClick={() => handleViewClick(item)}>
              View
            </Button>
          </Td>
        </Tr>
      ))}
      {selectedWarranty && (
        <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
          <Certificate
            warrantyId={selectedWarranty.warrantyId}
            name={user.username}
            course={selectedWarranty.productId}
            dateOfConductStart={selectedWarranty.purchaseDate}
            dateOfConductEnd={selectedWarranty.warrantyUntil}
          />
        </Modal>
      )}
    </>
  );
}
