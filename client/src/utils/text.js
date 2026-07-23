export const splitOverview = (text) => {
  if (!text) return [];

  return text
    .split(/\r?\n+/) // hỗ trợ cả Windows (\r\n) và Unix (\n)
    .map((item) => item.trim())
    .filter(Boolean);
};
