import { headerOption, gatewayUrl, headers } from "./variables";
import axios, { AxiosHeaders } from "axios";

export const getFetcher = async (path: string, url?: string) => {
  return await axios.get(`${url ?? gatewayUrl}${path}`, {
    headers: headerOption,
  });
};

export const postFetcher = async (
  path: string,
  params = {},
  config?: AxiosHeaders,
  url?: string
) =>
  await axios.post(`${gatewayUrl ?? url}${path}`, params, {
    headers,
    ...config,
  });

export const deleteFetcher = async (
  path: string,
  params = {},
  config?: AxiosHeaders,
  url?: string
) => await axios.delete(`${gatewayUrl ?? url}${path}`, params);

export const putFetcher = async (
  path: string,
  params = {},
  config?: AxiosHeaders,
  url?: string
) =>
  await axios.put(`${gatewayUrl ?? url}${path}`, params, {
    headers,
    ...config,
  });
