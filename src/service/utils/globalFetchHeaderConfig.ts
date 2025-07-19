import axios from "axios";

export const allDefaultHeader = (name: string, value: string) => {
  axios.defaults.headers.common[name] = value;
};
