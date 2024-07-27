export const testURL = (url) => {
  const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{2,256}\.[a-z]{2,6}(\:[0-9]{1,5})?(\/.*)?$/;
  return urlPattern.test(url);
};
