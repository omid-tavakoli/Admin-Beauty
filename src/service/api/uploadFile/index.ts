import { global } from "../../../@types";
import { postFetcher } from "../../config/fetcher";

export interface UploadFileParams {
  FileBase64: string;
  Type: number;
}
interface UploadFileResponse {
  filePath: string;
}
export const uploadFile = (
  params: UploadFileParams
): global.GlobalResponse<UploadFileResponse> => {
  return postFetcher(`api/file`, params);
};
