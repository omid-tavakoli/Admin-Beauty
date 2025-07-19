import { getFetcher } from "../../config/fetcher";
import { frontUrl } from "../../config/variables";

export const removeCatching = (path: string) =>
  getFetcher(`/api/catching?path=${path}`, frontUrl);
