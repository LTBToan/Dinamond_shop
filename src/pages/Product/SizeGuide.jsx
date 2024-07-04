import React from "react";
import {
  Box,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Flex,
} from "@chakra-ui/react";

const SizeGuide = ({ categoryId }) => {
  console.log("CASS: ", categoryId);
  const bannerImage = () => {
    switch (categoryId) {
      case "001":
        return "/images/ring-measure.jpg";
      case "002":
        return "https://lovelements.com/wp-content/uploads/2024/01/Necklace-Length-Size-Chart-by-lovelements.com_-1024x536.png.webp";
      case "003":
        return "https://images-aka.ernestjones.co.uk/guides/earrings-size-guide/EJ2108W04_Size_Guide_Earring_Graphic_3840x1800.png";
      case "004":
        return "https://www.nafisadesigns.com/media/wysiwyg/Bangle-Size-Guide-Step-Lurree.jpg";
    }
  };
  return (
    <Box px={30}>
      <Flex alignItems="center">
        <Flex w="40%" alignItems="center">
          <Text as="h3" mt={1}>
            How to measure your ring size
          </Text>
        </Flex>
        <Divider />
      </Flex>
      <Text>
        To choose the right ring size, you need to measure your finger size
        accurately so that when wearing the ring, the ring is not too wide or
        too tight. Before that, you need to prepare a measuring tape or a piece
        of paper (paper cut long and about 1cm wide).
      </Text>
      <Text as="h3">Step by step:</Text>
      <ol>
        <li>
          Wrap the tape measure around your finger, just below your finger bone
          will wear ring.
        </li>
        <li>Mark the meeting point of the tape measure.</li>
        <li>
          Use a ruler to measure the length of the string just wrapped around
          your hand, which is the length your ring.
        </li>
      </ol>
      <Box display="flex" justifyContent="center">
        <Image src={bannerImage()} alt="Step 1 to 3" boxSize="70%" />
      </Box>
      <Text as="h3">Ring Size</Text>
      <Text>
        To choose the correct ring size, you should know the length of different
        types of rings. Below is a common size conversion table:
      </Text>

      <Table>
        <Thead>
          <Tr>
            <Th>Size vòng cổ (inch)</Th>
            <Th>Size vòng cổ (cm)</Th>
            <Th>Độ dài trên cơ thể</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>16"</Td>
            <Td>40 cm</Td>
            <Td>Sát cổ</Td>
          </Tr>
          <Tr>
            <Td>18"</Td>
            <Td>45 cm</Td>
            <Td>Chạm xương đòn</Td>
          </Tr>
          <Tr>
            <Td>20"</Td>
            <Td>50 cm</Td>
            <Td>Trên ngực</Td>
          </Tr>
          <Tr>
            <Td>24"</Td>
            <Td>60 cm</Td>
            <Td>Giữa ngực</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default SizeGuide;
