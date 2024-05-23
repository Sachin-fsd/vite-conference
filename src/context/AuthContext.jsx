import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api/api";

// import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  UserID: "",
  UserName: "",
  UserHandle: "",
  UserEmail: "",
  UserDp: "",
  UserBio: "",
  UserSchool: "",
  UserSection: "",
  UserCourse: "",
  UserRollno: "",
};

const INITIAL_STATE = {
  UserDetails: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUserDetails: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false,
};


const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [UserDetails, setUserDetails] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      console.log("currentAccount", currentAccount)

      if (currentAccount!==false) {
        setUserDetails(currentAccount);
        setIsAuthenticated(true);
        return true;
      } else {
        navigate("/sign-in");
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("loggedIn");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    UserDetails,
    setUserDetails,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
