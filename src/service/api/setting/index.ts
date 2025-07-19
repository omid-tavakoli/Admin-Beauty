import { global } from "../../../@types";
import { getFetcher, postFetcher } from "../../config/fetcher";

export interface GetSettingResponse {
  Settings?: [] | null;
  Services?: [] | null;
}

export interface GetDataSettingResponse {
  settings: { Key?: number; value?: string }[];
  services?: any[];
}
export interface PostDataSettingParams {
  Key?: number;
  value?: string;
}
export const getDataSetting = (
  Key: number
): global.GlobalResponse<GetDataSettingResponse> =>
  getFetcher(`api/settings?Key=${Key}`);

export const postDataSetting = (params: PostDataSettingParams) => {
  return postFetcher(`api/settings`, params);
};
