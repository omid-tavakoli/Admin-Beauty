import { global } from "../../../@types";
import {
  getFetcher,
  postFetcher,
  putFetcher,
} from "../../config/fetcher";
import { SalaryPersonnel } from "../Expert";

interface GetPaymentsParams {
  index?: string;
  size?: string;
  value?: string;
  BranchUserId?: string;
  From?: Date | string;
  To?: Date | string;
}

export const getPayments = (params: GetPaymentsParams): global.GlobalResponse<SalaryPersonnel[]> =>
  getFetcher(
    `api/payment/salary${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}${
      params.BranchUserId ? `&BranchUserId=${params.BranchUserId}` : ""
    }${params.From ? `&StartDate=${params.From}` : ""}${
      params.To ? `&EndDate=${params.To}` : ""
    }`
  );

export const createDocument = (params: any) => {
  return postFetcher(`api/transaction/create`, params);
};

export const updateDocument = (params: any) => {
  return putFetcher(`api/transaction/update`, params);
};

export const deletePayment = (id: string) => {
  return putFetcher(`api/transaction/delete?id=${id}`);
};
