export const loginWithKakao = async (code: string) => {
  const response = await fetch(`/api/login/kakao/${code}`, {
    method: "POST",
  });

  return response.json() as Promise<{
    status: number;
    data: {
      accessToken: string;
      refreshToken: string;
      user: { id: number; name: string; profileImageUrl: string };
    };
  }>;
};
