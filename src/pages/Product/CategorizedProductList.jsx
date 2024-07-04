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
  ButtonGroup,
  Button,
  Image,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../../api/productAPI";
import { getAllDiamond, getAllMaterial, getAllShell } from "../../api/shellAPI";
import "../../components/ProductList/ProductList.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";

const categoryMap = {
  ring: "001",
  necklace: "002",
  earrings: "003",
  bracelet: "004",
};

const ProductList = () => {
  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    colors: [],
  });
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Alphabetically, A-Z");
  const [productDataSource, setProductDataSource] = useState([]);
  const [shellData, setShellData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [opacity, setOpacity] = useState(1);
  const [layoutChange, setLayoutChange] = useState(false);
  const { name } = useParams();
  const categoryId = categoryMap[name];
  const bannerImage = () => {
    switch (categoryId) {
      case "001":
        return "https://cdn.shopify.com/s/files/1/0014/5686/5316/files/Manfredi_category_banners_2.png?v=1667486214";
      case "002":
        return "https://cdn.shopify.com/s/files/1/0014/5686/5316/files/Manfredi_category_banners_1.png?v=1667485293";
      case "003":
        return "https://cdn.shopify.com/s/files/1/0014/5686/5316/files/Manfredi_category_banners_4.png?v=1667486547";
      case "004":
        return "https://cdn.shopify.com/s/files/1/0014/5686/5316/files/Manfredi_category_banners_3.png?v=1667486404";
    }
  };

  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);
  const [isMaterialFilterOpen, setIsMaterialFilterOpen] = useState(true);
  const [isColorFilterOpen, setIsColorFilterOpen] = useState(true);

  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductByCategory(categoryId);
        setProductDataSource(productData);

        const shellData = await getAllShell();
        setShellData(shellData);

        const materialData = await getAllMaterial();
        setMaterialData(materialData);

        const colorData = await getAllDiamond();
        setColorData(colorData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You can handle the error here (e.g., show an error message)
      }
    };

    fetchData();
  }, [categoryId]);

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

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const index = newFilters[type].indexOf(value);

      if (index > -1) {
        newFilters[type].splice(index, 1);
      } else {
        newFilters[type].push(value);
      }

      return newFilters;
    });
  };

  const filteredProducts = productDataSource.filter((product) => {
    // Filter by categories (shell)
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(product.shellId)) {
        return false;
      }
    }

    // Filter by materials
    if (filters.materials.length > 0) {
      const hasMaterial = shellData.some(
        (shellItem) =>
          filters.materials.includes(shellItem.materialID) &&
          shellItem.shellId === product.shellId
      );
      if (!hasMaterial) {
        return false;
      }
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      if (!filters.colors.includes(product.color)) {
        return false;
      }
    }

    // Filter by search term
    if (searchTerm) {
      if (
        !product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
    }

    return true;
  });

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
    <>
      <Navbar />
      <img src={bannerImage()} style={{ maxWidth: "100%" }} />

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
                Shell
              </Button>
              <Collapse in={isCategoryFilterOpen}>
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  lineHeight={10}
                  px={3}
                >
                  {shellData.map((category) => (
                    <Checkbox
                      key={category.shellId}
                      isChecked={filters.categories.includes(category.shellId)}
                      onChange={() =>
                        handleFilterChange("categories", category.shellId)
                      }
                    >
                      {category.name}
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
                  isMaterialFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
                }
                fontSize="xl"
                onClick={() => setIsMaterialFilterOpen(!isMaterialFilterOpen)}
              >
                Material
              </Button>
              <Collapse in={isMaterialFilterOpen}>
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  lineHeight={10}
                  px={3}
                >
                  {materialData.map((category) => (
                    <Checkbox
                      key={category.materialId}
                      isChecked={filters.materials.includes(
                        category.materialId
                      )}
                      onChange={() =>
                        handleFilterChange("materials", category.materialId)
                      }
                    >
                      {category.materialName}
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
                  isColorFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
                }
                fontSize="xl"
                onClick={() => setIsColorFilterOpen(!isColorFilterOpen)}
              >
                Color Grade
              </Button>
              <Collapse in={isColorFilterOpen}>
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  lineHeight={10}
                  px={3}
                >
                  {colorData.map((category) => (
                    <Checkbox
                      key={category.diamondId}
                      isChecked={filters.colors.includes(category.color)}
                      onChange={() =>
                        handleFilterChange("colors", category.color)
                      }
                    >
                      {category.color}
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
                <SimpleGrid columns={4} spacing={5}>
                  {displayedProducts.map((product) => (
                    <Box
                      key={product.productId}
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      onClick={() => navigate(`/products/${product.productId}`)}
                      cursor="pointer"
                    >
                      <Image src={product.imageLink} alt={product.name} />
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
                          fontSize="18px"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {product.productName}
                        </Box>
                        <Box>
                          <Text color="gray.500" fontSize="sm">
                            ${product.productPrice}
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
                      key={product.productId}
                      maxW="100%"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      onClick={() => navigate(`/products/${product.productId}`)}
                      cursor="pointer"
                      display="flex"
                    >
                      <Image
                        src={product.imageLink}
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
                          {product.productName}
                        </Box>
                        <Box>
                          <Text color="gray.500" fontSize="sm">
                            ${product.productPrice}
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
      <Footer />
    </>
  );
};

export default ProductList;
