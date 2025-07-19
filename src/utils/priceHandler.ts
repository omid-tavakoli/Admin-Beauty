export const addCommas = (price: string) => {
  return price?.replace(/\B(?=(\d{3})+(?!\d))/g, "،");
};
export const removeCommas = (price: string) => {
  return price.replace(/،/g, "");
};
type PersianToEnglish = (input: string) => string;

export const p2e: PersianToEnglish = (s) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());