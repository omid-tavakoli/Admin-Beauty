import { global } from "../../../@types";
import { getFetcher, postFetcher, deleteFetcher } from "../../config/fetcher";

export interface GetCategoriesResponse {
  id?: string;
  title: string | null;
  englishTitle: string | null;
  icon: string | null;
  isActive: boolean;
}

export const getCategories = (
  params: global.PaginationParams
): global.GlobalResponse<GetCategoriesResponse[]> =>
  getFetcher(
    `api/category/GetAll${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}`
  );
export const addNewLine = (params: GetCategoriesResponse) => {
  return postFetcher(`api/category`, params);
};

export const deleteLine = (id: string) => {
  return deleteFetcher(`api/category/delete?id=${id}`);
};
