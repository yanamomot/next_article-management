export const testURL = (url) => {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{2,256}\.[a-z]{2,6}(\:[0-9]{1,5})?(\/.*)?$/;
  return urlPattern.test(url);
};

export const testEmail = (data) => {
  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  return emailPattern.test(data);
};
