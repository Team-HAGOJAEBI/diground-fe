// 인기있는 플레이리스트
export const getPopularPlaylists = async () => {
  const response = await fetch("/api/getPopularPlaylists");
  const data = await response.json();

  return data;
};
// 내가 디깅한 플레이리스트
export const getMyPlaylists = async () => {
  const response = await fetch("/api/getMyPlaylists");
  const data = await response.json();

  return data;
};
