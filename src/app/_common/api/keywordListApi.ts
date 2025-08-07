export const getKeywordList = async () => {
  const response = await fetch("/api/getKeywordList");
  const data = await response.json();

  return data;
};
