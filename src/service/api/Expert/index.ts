import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from "../../config/fetcher";
import { global } from "../../../@types";

interface GetAbsence {
  id: string;
  message: string | null;
  endTime: string | null;
  startTime: string | null;
  createDate: string | null;
  status: number | null;
}
interface entityGetAbsence {
  absences: GetAbsence[];
}
interface AbsenceParams extends global.PaginationParams {
  branchUserId: string;
}
export const getAbsence = (
  params: AbsenceParams
): global.GlobalResponse<entityGetAbsence> =>
  getFetcher(
    `api/absence/GetAll?index=${params.index}&size=${params.size}${params.value ? `&value=${params.value}` : ""
    } &status=0&branchuserid=${params.branchUserId}`
  );

interface GetBranch {
  id: string | null;
  title: string | null;
  description: null;
  longitude: null;
  latitude: null;
  distance: null;
  address: null;
  picture: string | null;
}
export const getBranch = (): global.GlobalResponse<GetBranch[]> =>
  getFetcher(`api/branches`);

interface PutAbsence {
  absenceId: string | null;
  status: number | null;
}
export const putAbsence = (
  body: PutAbsence
): global.GlobalResponse<PutAbsence[]> =>
  putFetcher(`api/absence/changeStatus`, body);

interface GetFilterByBranchId {
  id: string;
  title: string;
  iconAddress: string;
  prepay: number;
  status: boolean;
  discount: number;
}
type GetFilterByBranchIdResponse = { [key: string]: GetFilterByBranchId[] };

export const getFilterByBranchId =
  (): global.GlobalResponse<GetFilterByBranchIdResponse> =>
    getFetcher(`api/category/filterbybranchId`);

interface GetExpert {
  id?: string;
  firstName: string;
  lastName: string;
  Position?: string;
  Description?: string;
  isActive?: boolean;
  salonId: string;
  picture?: string;
  nationalCode: string;
  phoneNumber: string;
  salary: string;
  address: string;
  startDate: string;
  Picture?: string;
  BranchIds: string[] | undefined;
  role: number
}

interface GetOneExpert {
  id?: string;
  firstName: string;
  lastName: string;
  Position?: string;
  Description?: string;
  isActive?: boolean;
  salonid: string;
  picture?: string;
  nationalCode: string;
  phoneNumber: string;
  salary: string;
  address: string;
  startDate: string;
  Picture?: string;
  branchIds: string[] | undefined;
  role: number[]
}
export const addNewExpert = (params: GetExpert) => {
  console.log('params - ', params)
  return postFetcher(`api/Personnel`, params);
};

interface personnel {
  firstName: string;
  lastName: string;
  picture: string;
  isActive: boolean;
  id: string;
}

export const getPersonnel = (
  params: global.PaginationParams
): global.GlobalResponse<personnel[]> => {
  return getFetcher(
    `api/personnel/${params.index ? `?index=${params.index}` : ""}${params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );
};

export const getOneExpert = (
  id: string
): global.GlobalResponse<GetOneExpert[]> =>
  getFetcher(`api/personnel?id=${id}`);

export const deletePersonnel = (id: string) => {
  return deleteFetcher(`api/personnel?id=${id}`);
};

interface PutService {
  SalonUserId: string;
  ServiceId: string;
  PercentOfCommission: number;
}
export const putService = (
  body: PutService
): global.GlobalResponse<PutService[]> =>
  putFetcher(`api/personnel/services`, body);

interface getServicePersonnelResponse {
  id: string,
  percentOfCommission: string
  title: string,
  categoryTitle: string,
  icon: string,
  prepay: string,
  discount: string,
  isActive: boolean,
  serviceId: string,
  branchId: string
}
interface getServicePersonnelParams extends global.PaginationParams {
  branchuserid: string | null;
}
export const getServicePersonnel = (
  params: getServicePersonnelParams
): global.GlobalResponse<getServicePersonnelResponse[]> => {
  return getFetcher(
    `api/service/personnelServices?branchUserId=${params.branchuserid}${params.index ? `&index=${params.index}` : ""}${params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );
};

export interface SalaryPersonnel {
  id : string
  name: string,
  lastName: string,
  description: string,
  amount: number,
  remaining: number,
  type: number
}
interface SalaryPersonnelParams extends global.PaginationParams {
  branchUserId: string | null;
}
export const getSalaryPersonnel = (
  params: SalaryPersonnelParams
): global.GlobalResponse<SalaryPersonnel[]> => {
  return getFetcher(
    `api/payment/salary${params.index ? `?index=${params.index}` : ""}${params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}&branchuserid=${params.branchUserId}`
  );
};