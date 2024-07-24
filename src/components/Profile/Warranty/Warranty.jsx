import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Flex,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import WarrantyList from "./WarrantyList";

const ITEMS_PER_PAGE = 5;

export default function OrderList() {
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [warrantyList, setWarrantyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchWarrantyList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/warranties/get/account/id/${currentUserId}`
      );
      setWarrantyList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWarrantyList();
  }, [currentUserId]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = warrantyList.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(warrantyList.length / ITEMS_PER_PAGE);

  return (
    <>
      {warrantyList.length === 0 ? (
        <Flex justify="center" align="center" height="100vh" direction="column">
          <Text fontStyle="italic" opacity="0.6">
            There is nothing here yet
          </Text>
          <Heading size="md">
            <Link to="/" className="shopNow">
              SHOP NOW <ArrowForwardIcon />
            </Link>
          </Heading>
        </Flex>
      ) : (
        <>
          <Table
            border="none"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
          >
            <Thead bgColor="whitesmoke">
              <Tr>
                <Th>Warranty ID</Th>
                <Th>Product Information</Th>
                <Th>Purchase Date</Th>
                <Th>Expire Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <WarrantyList warrantList={currentPageData} />
            </Tbody>
          </Table>
          <Box mt={4}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </Box>
        </>
      )}
    </>
  );
}
