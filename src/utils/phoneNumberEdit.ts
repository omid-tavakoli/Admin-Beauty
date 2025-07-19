export const areaCode = "+98-";

export const removeAreaCode = (phone: string | undefined | null) =>
  phone?.replace(areaCode, "0");
export const addAreaCode = (phone: string | undefined | null) =>
  phone?.replace("0", areaCode);
