export const phoneSplitter = (phone) => {
  const withOut = phone?.split("-")[1];
  return withOut;
};
