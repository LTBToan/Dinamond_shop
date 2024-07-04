import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Authentication/Signin";
import Signup from "./pages/Authentication/Signup";
import EmailSignup from "./pages/Authentication/EmailSignup";
import Forgot from "./pages/Authentication/Forgot";
import Reset from "./pages/Authentication/Reset";
import AdminPage from "./pages/Admin/Admin";
import Product from "./pages/Product/Product";
import CategorizedProductList from "./pages/Product/CategorizedProductList";
import Cart from "./pages/Cart/Cart";
import OrderList from "./pages/Order/OrderList";
import OrderStatus from "./pages/Order/OrderStatus";
import ContactPage from "./pages/Contact/ContactPage";
import SearchResult from "./pages/Search/SearchResult";
// import ProductList from "./pages/Product/ProductListPage";
import Profile from "./pages/TestProfile/ProfilePage";
import PayStatus from "./pages/Payment/PaymentSuccess";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />

      <Route
        path="/profile/:id"
        element={
          <ChakraProvider>
            <Profile />
          </ChakraProvider>
        }
      />

      <Route
        path="/category/:name"
        element={
          <ChakraProvider>
            <CategorizedProductList />
          </ChakraProvider>
        }
      />
      <Route
        path="/cart"
        element={
          <ChakraProvider>
            <Cart />
          </ChakraProvider>
        }
      />
      <Route path="/order" element={<OrderList />} />
      <Route path="/orderStatus" element={<OrderStatus />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route
        path="/contact"
        element={
          <ChakraProvider>
            <ContactPage />
          </ChakraProvider>
        }
      />
      <Route path="/search" element={<SearchResult />} />

      {/* <Route
        path="/products"
        element={
          <ChakraProvider>
            <ProductList />
          </ChakraProvider>
        }
      /> */}
      <Route
        path="/products/:id"
        element={
          <ChakraProvider>
            <Product />
          </ChakraProvider>
        }
      />

      <Route
        path="/payment-status"
        element={
          <ChakraProvider>
            <PayStatus />
          </ChakraProvider>
        }
      />
    </Routes>
  );
}
export default App;
