export const getDetailPlayList = async () => {
  const response = await fetch("/api/getDetailList");
  const data = await response.json();

  return data;
};
