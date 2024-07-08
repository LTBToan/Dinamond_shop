import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const userId = sessionStorage.getItem("loginUserId");
  const [user, setUser] = useState(null); // Initialize with null to differentiate between loading and no user
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setLoading(false); // If there's no userId, we're not loading anymore
    }
  }, [userId]);

  if (loading) {
    return { loading }; // Return loading state if still fetching
  }

  if (user) {
    return {
      auth: true,
      role: user.role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};

export default useAuth;
