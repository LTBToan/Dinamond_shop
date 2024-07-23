import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ContactPage from "./pages/Contact/ContactPage";
import Profile from "./pages/TestProfile/ProfilePage";
import CheckoutPage from "./pages/Checkout/Checkout";
import PayStatus from "./pages/Payment/PaymentSuccess";
import NotAuthorized from "./pages/NotFoundPage/NotAuthorization";
import { ChakraProvider } from "@chakra-ui/react";
import ProtectedRoutes from "./pages/NotFoundPage/ProtectedRoute";
import NotFound from "./pages/NotFoundPage/NotFound404";

import CustomPDF from "./components/CustomPDF";

function App() {
  const user = sessionStorage.getItem("loginUserId");

  return (
    <ChakraProvider>
      <Routes>
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/signup/email" element={<EmailSignup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:id" element={<Reset />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/category/:name" element={<CategorizedProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-status" element={<PayStatus />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        <Route path="/admin" element={<ProtectedRoutes roleRequired="AD" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="/test" element={<CustomPDF />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
