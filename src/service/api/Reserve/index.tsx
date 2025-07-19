import { global } from "../../../@types";
import { getFetcher, postFetcher, putFetcher } from "../../config/fetcher";

export enum ReservationStatus {
  PreReserve = 0,
  RequestToOrder = 1,
  Paid = 2,
  Canceled = 3,
  CanceledWithCashBack = 4,
  CanceledByAdmin = 5,
  Accepted = 6,
  Rejected = 7,
  finish = 8,
}

interface FreeTime {
  details: [];
  from: string;
  to: string;
}

export interface GetCategoriesResponse {
  firstName?: string;
  lastName?: string;
  personnelName?: string;
  personnelLastName?: string;
  phoneNumber?: string;
  prePay?: number;
  serviceName?: string;
  branchName?: string;
  transactionTrackingCode?: string;
  date?: string;
}

interface ReservationTimesParams {
  Services: { branchUserId: string; userServiceId: string }[];
  BranchId: string;
  From: Date;
  To: Date;
  ToleranceToRelaxTimePerMinute: number;
}
interface ReservationTimesResponse {
  branchUserFirstName: string;
  branchUserLastName: string;
  serviceTitle: string;
  prepay: number;
  freeTimes: {
    [key: string]: FreeTime[];
  };
  serviceName?: string;
}
export interface CancelReserveParams {
  ReservationId?: string;
}
export interface CheckoutReserveParams {
  Id?: string;
  Fields?: any;
}
export const getReserves = (
  params: global.PaginationParams
): global.GlobalResponse<GetCategoriesResponse[]> => {
  return getFetcher(
    // `api/category/GetAll?index=${params.index}&size=${params.size}${
    //   params.value ? `&value=${params.value}` : ""
    // }`
    `api/reservation/admin${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}${
      params.To ? `&To=${params.To}` : ""
    }${params.From ? `&From=${params.From}` : ""}${
      params.BranchUserId ? `&BranchUserId=${params.BranchUserId}` : ""
    }${params.ServiceIds ? `&ServiceIds=${params.ServiceIds}` : ""}${
      params.Step ? `&Step=${params.Step}` : ""
    }${params.BrancheIds ? `&BrancheIds=${params.BrancheIds}` : ""}`
  );
};

export const cancelReserve = (
  params: global.CancelReserveParams
): global.GlobalResponse<GetCategoriesResponse[]> => {
  return postFetcher("api/reservation/cancel", params);
};

export const checkoutReserve = (
  params: global.CheckoutReserveParams
): global.GlobalResponse<GetCategoriesResponse[]> => {
  return postFetcher("api/reservation/complete", params);
};

export const reservationTimes = (
  params: ReservationTimesParams
): global.GlobalResponse<ReservationTimesResponse> => {
  return postFetcher("api/reservation/filtertimes", params);
};

export const updateReservation = (
  params: global.CheckoutReserveParams
): global.GlobalResponse<GetCategoriesResponse[]> => {
  return putFetcher("api/reservation/update", params);
};
