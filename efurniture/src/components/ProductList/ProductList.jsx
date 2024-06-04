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
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Alphabetically, A-Z");
  const [categoryDataSource, setCategoryDataSource] = useState([]);
  const [productDataSource, setProductDataSource] = useState([]);
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

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    const selectedIndex = selectedCategories.indexOf(value);
    const newSelectedCategories = [...selectedCategories];

    if (selectedIndex === -1) {
      newSelectedCategories.push(value);
    } else {
      newSelectedCategories.splice(selectedIndex, 1);
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

  return (
    <Container style={{ marginTop: "50px" }}>
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

            <Typography
              variant="h6"
              component="div"
              className="category-header"
            >
              Categories
            </Typography>
            <List>
              {categoryDataSource.map((category) => (
                <ListItem key={category.category_name}>
                  <ListItemIcon>
                    <Checkbox
                      checked={selectedCategories.includes(
                        category.category_name
                      )}
                      onChange={handleCategoryChange}
                      value={category.category_name}
                    />
                  </ListItemIcon>
                  <ListItemText primary={category.category_name} />
                </ListItem>
              ))}
            </List>
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
                Showing 1 - {totalResults} of {totalResults} results
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
            {filteredProducts.map((product) => (
              <Grid
                item
                key={product.product_id}
                xs={layout === "grid" ? 4 : 12}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
