import { global } from "../../../@types";
import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from "../../config/fetcher";
import { GetCategoriesResponse } from "../Category";

interface GetDataServicesParams extends global.PaginationParams {
  serviceCategoryId?: string;
  isActive?: string | null;
  type?: string;
  serviceId?: string | null;
  line?: any;
  status?: any;
  personnelService?: boolean;
}
export interface GetDataServicesResponse {
  categoryTitle?: string;
  icon: string;
  id?: string;
  isActive: boolean;
  prepay: number;
  title: string;
  discount: number;
  BranchIds: string[];
  ServiceCategoryId: string;
  duration: string;
  description?: string;
  type?: number;
  name?: string;
  discountDescription: string;
}

export interface GetDataTipsResponse {
  id?: string;
  name?: string;
  isActive: boolean;
}
export interface GetDataFaqsResponse {
  id?: string;
  name?: string;
  displayName?: string;
  isActive?: boolean;
  type?: number;
  value?: string;
  answer?: string;
}
interface GetDataExpertsResponse {
  id?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  phoneNumber?: string;
}
interface GetDataServiceParamsResponse {
  si?: string | undefined;
  serviceId?: string | null;
}
interface GetDataServiceDetails {
  categoryTitle: string;
  icon: string;
  id?: string;
  isActive: boolean;
  prepay: number;
  title: string;
  discount: string;
  branchIds: [string];
  categoryId: string;
  duration: string;
  description: string;
  type?: number;
  name?: string;
  discountDescription: string;
  deposit: number | string;
}
interface BranchesResponse {
  address: string;
  description: string | null;
  distance: string | null;
  id: string;
  isOrigin: boolean;
  latitude: number;
  longitude: number;
  picture: string;
  status: number;
  tel: string;
  title: string;
}
interface PersonnelServiceSampleParams {
  ServiceId: string;
  Pictures: string[];
}
interface GetPersonnelByIdResponse {
  duration: string;
  percentOfCommission: number;
  serviceSample: string[];
}

export const getDataServices = (
  params: GetDataServicesParams
): global.GlobalResponse<GetDataServicesResponse[]> => {
  return getFetcher(
    `api/Service/GetAll?index=${params.index}&size=${params.size}${
      params.value ? `&value=${params.value}` : ""
    }${params.isActive ? `&isActive=${params.isActive}` : ""}${
      params.serviceCategoryId
        ? `&serviceCategoryId=${params.serviceCategoryId}`
        : ""
    }${
      params.personnelService
        ? `&personnelService=${params.personnelService}`
        : ""
    }`
  );
};
export const getDataCategories = (
  params: global.PaginationParams
): global.GlobalResponse<GetCategoriesResponse[]> =>
  getFetcher(
    `api/category/GetAll${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );

export const createService = (params: GetDataServicesResponse) => {
  return postFetcher("api/service", params);
};
export const getPersonnelById = (
  id: string
): global.GlobalResponse<GetPersonnelByIdResponse> => {
  return getFetcher("api/service/user/getbyid" + `?id=${id}`);
};
export const updateService = (params: GetDataServicesResponse) => {
  return postFetcher("api/service", params);
};
export const getDataBranches = (): global.GlobalResponse<
  BranchesResponse[]
> => {
  return getFetcher("api/branches");
};

export const deleteService = (id: string) => {
  return deleteFetcher(`api/Service/Delete?id=${id}`);
};

export const createTip = (params: any) => {
  return postFetcher(`api/Service/Details`, params);
};

export const updateTip = (params: any) => {
  return postFetcher(`api/Service/Details`, params);
};

export const personnelServiceSample = (
  params: PersonnelServiceSampleParams
) => {
  return putFetcher(`api/personnel/service/sample`, params);
};
export const createFaq = (params: any) => {
  return postFetcher(`api/Service/Details`, params);
};
export const updateFaq = (params: any) => {
  return postFetcher(`api/Service/Details`, params);
};

export const getDataTips = (
  params: GetDataServicesParams
): global.GlobalResponse<GetDataTipsResponse[]> => {
  return getFetcher(
    `api/Service/Details?index=${params.index}&size=${params.size}${
      params.type ? `&type=${params.type}` : ""
    }${params.serviceId ? `&serviceId=${params.serviceId}` : ""}${
      params.isActive ? `&.isActive=${params.isActive}` : ""
    }`
  );
};

export const getDataFaqs = (
  params: GetDataServicesParams
): global.GlobalResponse<GetDataFaqsResponse[]> => {
  return getFetcher(
    `api/Service/Details?index=${params.index}&size=${params.size}${
      params.type ? `&type=${params.type}` : ""
    }${params.serviceId ? `&serviceId=${params.serviceId}` : ""}${
      params.isActive ? `&.isActive=${params.isActive}` : ""
    }`
  );
};

export const deleteTips = (id: string | undefined) => {
  return deleteFetcher(`api/Service/Details?id=${id}`);
};

export const deleteFaqs = (id: string | undefined) => {
  return deleteFetcher(`api/Service/Details?id=${id}`);
};

export const getDataExperts = (
  params: GetDataServicesParams
): global.GlobalResponse<GetDataExpertsResponse[]> => {
  return getFetcher(
    `api/services/users${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.serviceId ? `&serviceId=${params.serviceId}` : ""}`
  );
};

export const getServiceDetails = (
  params: GetDataServiceParamsResponse
): global.GlobalResponse<GetDataServiceDetails> => {
  return getFetcher(`api/services?id=${params.serviceId}`);
};
