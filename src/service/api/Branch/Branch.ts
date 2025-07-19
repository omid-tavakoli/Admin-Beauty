import { global } from "../../../@types";
import { deleteFetcher, getFetcher, postFetcher } from "../../config/fetcher";

interface GetDataBranch {
  id: string;
  title: string;
  status: number;
  isOrigin: boolean;
}

interface PostDataBranch {
  Id?: string | null;
  Tel: string | null;
  Address: string;
  Title: string;
  Longitude: number | undefined;
  Latitude: number | undefined;
  Picture: string;
  IsOrigin: boolean;
  Status: number;
}
export interface PostDataWorkTime {
  WorkingDate: {
    endTime: string;
    startTime: string;
    dayOfWeek: number;
  }[];
  Holidays: { id?: string | null; dayOfWeek: number }[];
  BranchId: string | undefined;
}
export const getDataBranch = (
  params: global.PaginationParams
): global.GlobalResponse<GetDataBranch[]> => {
  return getFetcher(
    `api/branches/${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );
};
export const addNewWorkTime = (params: PostDataWorkTime) => {
  return postFetcher(`api/branches/workTimes`, params);
};

export const addBranch = (params: PostDataBranch) => {
  return postFetcher(`api/branches`, params);
};
export const deleteBranch = (id: string) => {
  return deleteFetcher(`api/branches?id=${id}`);
};
export const getBranchId = (params: string) =>
  getFetcher(`api/branches?id=${params}`);

export const getOneWorkingTime = (params: string) =>
  getFetcher(`api/branches/workingtimes?id=${params}`);

export const getWorkingTime = (params: string) =>
  getFetcher(`api/branches/workingtimes?id=${params}`);
