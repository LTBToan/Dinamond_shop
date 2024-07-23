import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SizeGuide from "../../pages/Product/SizeGuide";
import axios from "axios";
import moment from "moment/moment";
import { generateUniqueId } from "../../assistants/Generators";
import { message } from "antd";

const StarRating = ({ rating, setRating }) => {
  const handleClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <Flex ml={3}>
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          cursor="pointer"
          color={index < rating ? "yellow.500" : "gray.300"}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </Box>
      ))}
    </Flex>
  );
};

const FeedbackCard = ({ rating, accountId, date, feedbackContent }) => {
  return (
    <Box border="none" borderColor="gray.200" borderRadius="md" p={2} mb={2}>
      <Flex alignItems="start">
        <Avatar display="ab" />
        <Box ml={4} lineHeight={0.5}>
          <Text color="yellow.400">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </Text>
          <Flex alignItems="center">
            <Text fontWeight="bold" mr={2}>
              {accountId}
            </Text>
            <Text color="gray.500">{moment(date).format("MMMM D, YYYY")}</Text>
          </Flex>
          <Text mt={2}>{feedbackContent}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const Feedback = ({ currentProduct }) => {
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [feedback, setFeedback] = useState([]);
  const [feedbackData, setFeedbackData] = useState({
    feedbackContent: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/feedbacks/get/${currentProduct.productId}`
        );
        setFeedback(data);
      } catch (error) {
        console.log("Error get the feedbacks: ", error);
      }
    };

    fetchFeedbackData();
  }, []);

  const handleFeedback = async () => {
    try {
      if (!currentUserId) {
        return message.error({
          key: "Feedback",
          content: "Please log in first",
          duration: 5,
        });
      }

      const newFeedback = {
        feedbackId: generateUniqueId("F", 5),
        feedbackContent: feedbackData.feedbackContent,
        rating: feedbackData.rating,
        productId: currentProduct.productId,
        accountId: currentUserId,
        date: new Date(),
      };
      await axios.post(`http://localhost:8080/api/feedbacks`, newFeedback);
      setFeedback((prevFeedback) => [...prevFeedback, newFeedback]);
      setFeedbackData({ feedbackContent: "", rating: 0 });
    } catch (error) {
      console.log("Error add feedback: ", error);
    }
  };

  return (
    <>
      <Box px={150} py={50}>
        <Tabs variant="enclosed" colorScheme="yellow">
          <TabList justifyContent="center">
            <Tab
              mx={5}
              border="none"
              fontSize="20px"
              color="gray.500"
              _hover={{ color: "black" }}
              _selected={{ color: "black" }}
            >
              Description
            </Tab>
            <Tab
              mx={5}
              border="none"
              fontSize="20px"
              color="gray.500"
              _hover={{ color: "black" }}
              _selected={{ color: "black" }}
            >
              Measure Size
            </Tab>
            <Tab
              mx={5}
              border="none"
              fontSize="20px"
              color="gray.500"
              _hover={{ color: "black" }}
              _selected={{ color: "black" }}
            >
              Reviews ({feedback.length})
            </Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="yellow.500" />
          <TabPanels>
            <TabPanel py="30px">
              <Text fontSize="18px">{currentProduct.description}</Text>
            </TabPanel>
            <TabPanel py="30px">
              <SizeGuide categoryId={currentProduct.categoryId} />
            </TabPanel>
            <TabPanel>
              <Flex gap={6} py="30px">
                <Box w="50%">
                  <Text fontSize="24px" fontWeight="500">
                    Rating & Review
                  </Text>
                  {feedback.length === 0 ? (
                    <Text>There is no review yet</Text>
                  ) : (
                    feedback.map((fback, index) => (
                      <FeedbackCard key={index} {...fback} />
                    ))
                  )}
                </Box>
                <Box w="50%">
                  <Text fontSize="24px" fontWeight="500">
                    Review this product
                  </Text>
                  <FormControl id="review">
                    <FormLabel
                      display="flex"
                      alignItems="baseline"
                      color="gray.500"
                    >
                      Your rating:
                      <StarRating
                        rating={feedbackData.rating}
                        setRating={(rating) =>
                          setFeedbackData((prev) => ({ ...prev, rating }))
                        }
                      />
                    </FormLabel>
                    <FormLabel>Your review</FormLabel>
                    <Textarea
                      placeholder="Write your review here..."
                      value={feedbackData.feedbackContent}
                      onChange={(e) => {
                        setFeedbackData((pre) => {
                          return { ...pre, feedbackContent: e.target.value };
                        });
                      }}
                    />
                  </FormControl>
                  <Button mt={2} colorScheme="yellow" onClick={handleFeedback}>
                    Submit
                  </Button>
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Feedback;
