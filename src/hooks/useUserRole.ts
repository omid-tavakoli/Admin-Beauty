import { useContext } from "react";
import { CreateAuthContext, DefaultState } from "../context/AuthContext";
interface UseUserRole {
  role: "Admin" | "Personnel" | "User";
  user: DefaultState;
}
export const useUserRole = (): UseUserRole => {
  const userInfo = useContext(CreateAuthContext);

  return {
    role: userInfo?.roles.includes(1)
      ? "Admin"
      : userInfo?.roles.includes(2)
      ? "Personnel"
      : "User",
    user: userInfo,
  };
};
