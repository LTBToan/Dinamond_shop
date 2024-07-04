import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Grid,
  GridItem,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  IconButton,
  Checkbox,
  VStack,
  Collapse,
  Badge,
  useToast,
  ButtonGroup,
  Button,
  Image,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css";

const ProductList = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Alphabetically, A-Z");
  const [categoryDataSource, setCategoryDataSource] = useState([]);
  const [productDataSource, setProductDataSource] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [opacity, setOpacity] = useState(1);
  const [layoutChange, setLayoutChange] = useState(false);
  const toast = useToast();

  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);

  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/all`);
        setProductDataSource(res.data);
      } catch (err) {
        toast({
          title: "Error fetching product data",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    const fetchCategoryData = async () => {
      try {
        const res = await axios.get("http://localhost:3344/categories");
        setCategoryDataSource(res.data);
      } catch (err) {
        toast({
          title: "Error fetching category data",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCategoryData();
    fetchProductData();
  }, [toast]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (layoutChange) {
      setOpacity(0);
      const timer = setTimeout(() => {
        setOpacity(1);
        setLayoutChange(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [layoutChange]);

  const handleLayoutChange = (newLayout) => {
    if (layout !== newLayout) {
      setLayoutChange(true);
      setTimeout(() => {
        setLayout(newLayout);
      }, 500);
    }
  };

  const handleCategoryChange = (category) => {
    const newSelectedCategories = [...selectedCategories];
    const index = newSelectedCategories.indexOf(category);

    if (index > -1) {
      newSelectedCategories.splice(index, 1);
    } else {
      newSelectedCategories.push(category);
    }

    setSelectedCategories(newSelectedCategories);
  };

  const filteredProducts = productDataSource
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category_name)
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handlePageChange = (event) => {
    setPage(event.selected);
  };

  return (
    <Container maxW="90vw" mt={10}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
        <Box p={4}>
          <InputGroup mb={5}>
            <Input
              placeholder="Search Your Diamond..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
          <VStack align="start">
            <Button
              width="100%"
              justifyContent="space-between"
              border="none"
              bg="none"
              rightIcon={
                isCategoryFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
              }
              fontSize="xl"
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
            >
              Categories
            </Button>
            <Collapse in={isCategoryFilterOpen}>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                lineHeight={10}
                px={3}
              >
                {categoryDataSource.map((category) => (
                  <Checkbox
                    key={category.category_name}
                    isChecked={selectedCategories.includes(
                      category.category_name
                    )}
                    onChange={() =>
                      handleCategoryChange(category.category_name)
                    }
                  >
                    {category.category_name}
                  </Checkbox>
                ))}
              </Box>
            </Collapse>
            <Button
              width="100%"
              justifyContent="space-between"
              border="none"
              bg="none"
              rightIcon={
                isCategoryFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
              }
              fontSize="xl"
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
            >
              Categories
            </Button>
            <Collapse in={isCategoryFilterOpen}>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                lineHeight={10}
                px={3}
              >
                {categoryDataSource.map((category) => (
                  <Checkbox
                    key={category.category_name}
                    isChecked={selectedCategories.includes(
                      category.category_name
                    )}
                    onChange={() =>
                      handleCategoryChange(category.category_name)
                    }
                  >
                    {category.category_name}
                  </Checkbox>
                ))}
              </Box>
            </Collapse>
            <Button
              width="100%"
              justifyContent="space-between"
              border="none"
              bg="none"
              rightIcon={
                isCategoryFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
              }
              fontSize="xl"
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
            >
              Categories
            </Button>
            <Collapse in={isCategoryFilterOpen}>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                lineHeight={10}
                px={3}
              >
                {categoryDataSource.map((category) => (
                  <Checkbox
                    key={category.category_name}
                    isChecked={selectedCategories.includes(
                      category.category_name
                    )}
                    onChange={() =>
                      handleCategoryChange(category.category_name)
                    }
                  >
                    {category.category_name}
                  </Checkbox>
                ))}
              </Box>
            </Collapse>
          </VStack>
        </Box>
        <GridItem colSpan={3}>
          <Flex justifyContent="space-between" mb={5}>
            <ButtonGroup isAttached>
              <IconButton
                icon={<FontAwesomeIcon icon={faGrip} />}
                isActive={layout === "grid"}
                onClick={() => handleLayoutChange("grid")}
                border="none"
              />
              <IconButton
                icon={<FontAwesomeIcon icon={faList} />}
                isActive={layout === "list"}
                onClick={() => handleLayoutChange("list")}
                border="none"
              />
            </ButtonGroup>
            <Text
              fontSize="medium"
              justifyContent="flex-start"
              color="gray.500"
              mt={2}
            >
              Showing {page * itemsPerPage + 1} -{" "}
              {Math.min((page + 1) * itemsPerPage, totalResults)} of{" "}
              {totalResults} results
            </Text>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              width="200px"
            >
              <option value="Alphabetically, A-Z">Alphabetically, A-Z</option>
              <option value="Alphabetically, Z-A">Alphabetically, Z-A</option>
              <option value="Price, low to high">Price, low to high</option>
              <option value="Price, high to low">Price, high to low</option>
            </Select>
          </Flex>
          <div
            style={{
              transition: "opacity 0.5s",
              opacity: opacity,
            }}
          >
            {layout === "grid" ? (
              <SimpleGrid columns={3} spacing={5}>
                {displayedProducts.map((product) => (
                  <Box
                    key={product.product_id}
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    onClick={() => navigate(`/products/${product.product_id}`)}
                    cursor="pointer"
                  >
                    <Image src={product.image_url} alt={product.name} />
                    <Box p="6">
                      <Box display="flex" alignItems="baseline">
                        <Badge
                          borderRadius="full"
                          px="2"
                          bgColor="#d4af37"
                          color="whitesmoke"
                        >
                          New
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          Summer Collection
                        </Box>
                      </Box>
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h3"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        {product.name}
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">
                          ${product.price}
                        </Text>
                      </Box>
                      {layout === "list" && (
                        <>
                          <Divider />
                          <Box w="100%">
                            <Text color="gray.500" fontSize="sm">
                              {product.description}
                            </Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                {displayedProducts.map((product) => (
                  <Box
                    key={product.product_id}
                    maxW="100%"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    onClick={() => navigate(`/products/${product.product_id}`)}
                    cursor="pointer"
                    display="flex"
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      w="250px"
                      h="250px"
                    />
                    <Box p="6" flex="1">
                      <Box display="flex" alignItems="baseline">
                        <Badge
                          borderRadius="full"
                          px="2"
                          bgColor="#d4af37"
                          color="whitesmoke"
                        >
                          New
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          Summer Collection
                        </Box>
                      </Box>
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h3"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        {product.name}
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">
                          ${product.price}
                        </Text>
                      </Box>
                      <Divider my={2} />
                      <Box>
                        <Text color="gray.500" fontSize="sm">
                          {product.description}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            )}
          </div>
          <Flex justifyContent="center" mt={5}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default ProductList;
