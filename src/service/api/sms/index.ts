import { global } from "../../../@types";
import { getFetcher, postFetcher } from "../../config/fetcher";

export interface GetAllSmsResponse {
  date: string
  firstName:string
  isSent: boolean
  lastName: string
  message: string
  phoneNumber: string
}
interface CreateSmsParams {
  message: string;
  phoneNumbers?: string[];
}

export const getAllSms = (
  params: global.PaginationParams
): global.GlobalResponse<GetAllSmsResponse[]> =>
  getFetcher(
    `api/sms${params.index ? `?index=${params.index}` : ""}${params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );

export const createSms = (params: CreateSmsParams) => {
  return postFetcher(`api/sms`, params);
};

interface getAllUser {
  id: string,
  firstName: string,
  lastName: string,
  picture: string,
  phoneNumber: string,
  password: string,
  signUpDate: string
}
export const getAllUser = (
  params: global.PaginationParams
): global.GlobalResponse<getAllUser[]> =>
  getFetcher(
    `api/user/admin${params.index ? `?index=${params.index}` : ""}${params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );
