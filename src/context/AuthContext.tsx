import { type ReactNode, createContext, FC, useState, useEffect } from "react";
import { AUTH_ADMIN_TOKEN } from "../service/config/variables";
import { getCookie } from "../service/utils/cookies";
import { allDefaultHeader } from "../service/utils/globalFetchHeaderConfig";
import { useGet } from "../hooks/useFetch";
import { getUserInfo } from "../service/api/users";

interface AuthContextProps {
  children: ReactNode;
}
export interface DefaultState {
  isLogin: "loading" | "authenticated" | "unAuthenticated";
  firstName: string;
  lastName: string;
  gender: string;
  nationalCode: string;
  birthDate: string;
  email: string;
  pictureAddress: string;
  roles: number[];
  phoneNumber: string;
}
const defaultState: DefaultState = {
  isLogin: "loading",
  firstName: "",
  lastName: "",
  gender: "",
  nationalCode: "",
  birthDate: "",
  email: "",
  pictureAddress: "",
  roles: [],
  phoneNumber: "",
};
export const CreateAuthContext = createContext(defaultState);

const AuthContext: FC<AuthContextProps> = (props) => {
  allDefaultHeader("Authorization", `Bearer ${getCookie(AUTH_ADMIN_TOKEN)}`);
  const authState = useState(defaultState);
  const { data: userInfo, error: userInfoError } = useGet(
    getUserInfo,
    ["getUserInfo"],
    {}
  );
  useEffect(() => {
    if (userInfo?.data?.entity) {
      authState[1]({
        ...userInfo.data.entity,
        isLogin: "authenticated",
      });
    }
  }, [userInfo?.data]);

  useEffect(() => {
    if (!!userInfoError) {
      authState[1]((pre) => ({
        ...pre,
        isLogin: "unAuthenticated",
      }));
    }
  }, [userInfoError]);

  // if (!!userInfoError) {
  //   window.location.replace(beauty_url);
  // }

  return (
    <CreateAuthContext.Provider value={authState[0]}>
      {props.children}
    </CreateAuthContext.Provider>
  );
};

export default AuthContext;
