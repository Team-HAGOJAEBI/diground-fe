export const getPlayList = async () => {
  const response = await fetch("/api/getPlayList");
  const data = await response.json();

  return data;
};

export const getDetailPlayList = async () => {
  const response = await fetch("/api/getDetailList");
  const data = await response.json();

  return data;
};

export const getCommentList = async () => {
  const response = await fetch("/api/getCommentList");
  const data = await response.json();

  return data;
};
