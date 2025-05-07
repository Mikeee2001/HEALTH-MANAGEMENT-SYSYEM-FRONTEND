import { useContext } from "react";
import AuthContext from "./AuthContext";

// ✅ Custom hook for authentication
const useAuth = () => useContext(AuthContext);


export default useAuth;
