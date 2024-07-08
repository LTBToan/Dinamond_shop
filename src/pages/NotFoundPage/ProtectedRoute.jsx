import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../assistants/authService";
import { Spinner } from "@chakra-ui/react";

const ProtectedRoutes = (props) => {
  const { auth, role, loading } = useAuth(); // Destructure loading from useAuth

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (props.roleRequired) {
    return auth ? (
      props.roleRequired === role ? (
        <Outlet />
      ) : (
        <Navigate to="/not-authorized" />
      )
    ) : (
      <Navigate to="/" />
    );
  } else {
    return auth ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
