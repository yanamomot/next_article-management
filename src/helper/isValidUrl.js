export const testURL = (url) => {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-\.]+)(:[0-9]{1,5})?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/;
  return urlPattern.test(url);
};
