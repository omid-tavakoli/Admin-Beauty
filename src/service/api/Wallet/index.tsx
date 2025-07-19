import { getFetcher } from "../../config/fetcher";
interface GetTransActionsParams {
  index?: string;
  size?: string;
  value?: string;
  type?: number;
}

export const getTransActions = (params: GetTransActionsParams): any =>
  getFetcher(
    `api/wallet/transactions${params.index ? `?index=${params.index}` : ""}${
      params.size ? `&size=${params.size}` : ""
    }${params.value ? `&value=${params.value}` : ""}${
      params.type === 1 ? `&type=0` : params.type === 2 ? `&type=1` : ""
    }`
  );
