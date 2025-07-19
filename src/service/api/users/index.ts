import { global } from "../../../@types";
import { getFetcher, postFetcher } from "../../config/fetcher";
import { frontUrl } from "../../config/variables";

interface GetUserInfo {
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
interface UpdateProfileParams {
  FirstName: string;
  LastName: string;
  NationalCode: string;
  BirthDate: string | undefined;
  Email: string;
  PictureBase64: string;
}
export const getUserInfo = (): global.GlobalResponse<GetUserInfo> => {
  return getFetcher(`api/user/userchecktoken`);
};
export const updateProfile = (
  params: UpdateProfileParams
): global.GlobalResponse<GetUserInfo> => {
  return postFetcher(`api/user/profile`, params);
};

export interface GetUserAccountResponse {
  id?: string;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  phoneNumber: string | null;
  picture: string | null;
  signUpDate: string | null;
  isActive: boolean;
  address?: string;
  userName?: string;
}

export const getUserAccountAllQuery = (
  params: global.PaginationParams
): global.GlobalResponse<GetUserAccountResponse[]> =>
  getFetcher(
    `api/user/admin${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );
export const logoutUser = () => getFetcher(`/api/auth/logout`, frontUrl);
