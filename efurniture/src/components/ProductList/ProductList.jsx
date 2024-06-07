import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Pagination,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./ProductList.css";

const { SubMenu } = Menu;

const ProductList = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Alphabetically, A-Z");
  const [categoryDataSource, setCategoryDataSource] = useState([]);
  const [productDataSource, setProductDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      await axios
        .get(`http://localhost:3344/products`)
        .then((res) => {
          setProductDataSource(res.data);
        })
        .catch((err) =>
          console.log("Fail to fetch product data: ", err.message)
        );
    };

    const fetchCategoryData = async () => {
      await axios
        .get("http://localhost:3344/categories")
        .then((res) => {
          setCategoryDataSource(res.data);
        })
        .catch((err) =>
          console.log("Fail to fetch category data: ", err.message)
        );
    };

    fetchCategoryData();
    fetchProductData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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

  const handleSubMenuClick = (e) => {
    const { key } = e;
    handleCategoryChange(key);
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
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container style={{ marginTop: "50px", maxWidth: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="sidebar">
            <TextField
              variant="outlined"
              placeholder="Search Your Diamond..."
              fullWidth
              style={{ marginBottom: "20px" }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Menu
              mode="inline"
              onClick={handleSubMenuClick}
              defaultOpenKeys={["categories", "colors", "sizes"]}
              style={{ width: "100%", fontSize: "18px" }}
              theme="light"
            >
              <SubMenu key="categories" title="Categories">
                {categoryDataSource.map((category) => (
                  <Menu.Item key={category.category_name}>
                    <Checkbox
                      checked={selectedCategories.includes(
                        category.category_name
                      )}
                    >
                      {category.category_name}
                    </Checkbox>
                  </Menu.Item>
                ))}
              </SubMenu>
              <SubMenu key="sizes" title="Sizes">
                {categoryDataSource.map((category) => (
                  <Menu.Item key={category.category_name}>
                    <Checkbox
                      checked={selectedCategories.includes(
                        category.category_name
                      )}
                    >
                      {category.category_name}
                    </Checkbox>
                  </Menu.Item>
                ))}
              </SubMenu>
              <SubMenu key="colors" title="Colors">
                {categoryDataSource.map((category) => (
                  <Menu.Item key={category.category_name}>
                    <Checkbox
                      checked={selectedCategories.includes(
                        category.category_name
                      )}
                    >
                      {category.category_name}
                    </Checkbox>
                  </Menu.Item>
                ))}
              </SubMenu>
            </Menu>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="toolbar">
            <div className="layout-toggle">
              <ToggleButtonGroup
                value={layout}
                exclusive
                onChange={(event, newLayout) => {
                  if (newLayout !== null) {
                    setLayout(newLayout);
                  }
                }}
                aria-label="layout"
              >
                <ToggleButton value="grid" aria-label="grid layout">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list layout">
                  <ViewListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography
                variant="body1"
                style={{
                  margin: "12px 0 0 20px",
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                Showing {(page - 1) * itemsPerPage + 1} -{" "}
                {Math.min(page * itemsPerPage, totalResults)} of {totalResults}{" "}
                results
              </Typography>
            </div>
            <FormControl variant="outlined" className="sortControl">
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                label="Sort by"
              >
                <MenuItem value="Alphabetically, A-Z">
                  Alphabetically, A-Z
                </MenuItem>
                <MenuItem value="Alphabetically, Z-A">
                  Alphabetically, Z-A
                </MenuItem>
                <MenuItem value="Price, low to high">
                  Price, low to high
                </MenuItem>
                <MenuItem value="Price, high to low">
                  Price, high to low
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Grid container spacing={2} className={`product-list ${layout}`}>
            {displayedProducts.map((product) => (
              <Grid
                item
                key={product.product_id}
                xs={layout === "grid" ? 3 : 12} // Adjusted to 3 for 4 columns
              >
                <Card
                  className="product-item"
                  onClick={() => navigate(`/products/${product.product_id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <CardContent>
                    {layout === "grid" ? (
                      <>
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="product-image"
                        />
                        <Typography
                          variant="h6"
                          component="div"
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            margin: "10px 0",
                            textAlign: "center",
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          style={{ fontSize: "14px", textAlign: "center" }}
                        >
                          ${product.price}
                        </Typography>
                      </>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="product-image"
                          style={{ marginRight: "20px", width: "20%" }}
                        />
                        <div>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            style={{ fontSize: "14px" }}
                          >
                            ${product.price}
                          </Typography>
                          <hr />
                          <Typography
                            variant="body2"
                            color="text.primary"
                            style={{ fontSize: "14px" }}
                          >
                            {product.description}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
