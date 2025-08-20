import { PrismaClient } from "@prisma/client";

// 모킹용 타입 정의 (실제 DB 스키마에 맞게 수정)
type MockAccount = {
  user_id: string;
  type: string;
  provider: string;
  provider_account_id: string;
  access_token?: string;
  refresh_token?: string | null;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  created_at: Date;
  updated_at: Date;
};

type MockSession = {
  session_token: string;
  user_id: string;
  expires: Date;
  created_at: Date;
  updated_at: Date;
};

// 동적으로 업데이트 가능한 Mock 데이터 (user 모델용 - NextAuth)
let mockUser = {
  id: "하고젭 모킹 유저",
  name: "테스트 사용자",
  email: "test@diground.local",
  emailVerified: null,
  image:
    "https://cdnimg.melon.co.kr/cm2/photo/images/000/802/83/025/80283025_20241216144433_org.jpg/melon/quality/80/optimize",
  created_at: new Date(),
  updated_at: new Date(),
};

// mockUser를 동적으로 업데이트하는 함수
export const updateMockUser = (userData: { id?: string; name?: string; email?: string; image?: string }) => {
  mockUser = {
    ...mockUser,
    ...userData,
    updated_at: new Date(),
  };
};

// 현재 mockUser 데이터를 가져오는 함수
export const getMockUser = () => mockUser;

// Account와 Session도 동적으로 업데이트 (DB 스키마에 맞게 수정)
let mockAccount_kakao = {
  user_id: mockUser.id,
  type: "oauth",
  provider: "kakao",
  provider_account_id: "12345",
  access_token: "mock-access-token",
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "Bearer",
  scope: "profile_nickname profile_image account_email",
  created_at: new Date(),
  updated_at: new Date(),
};

let mockSession = {
  session_token: "mock-session-token",
  user_id: mockUser.id,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  created_at: new Date(),
  updated_at: new Date(),
};

export const updateMockAccount = (accountData: MockAccount) => {
  mockAccount_kakao = { ...mockAccount_kakao, ...accountData, updated_at: new Date() };
};

export const updateMockSession = (sessionData: MockSession) => {
  mockSession = { ...mockSession, ...sessionData, updated_at: new Date() };
};

export const getMockAccount = () => mockAccount_kakao;
export const getMockSession = () => mockSession;

// Prisma Mock 클래스
export class PrismaMock {
  // NextAuth 필수 모델들
  user = {
    findUnique: async ({ where }: any) => {
      if (where.id === mockUser.id || where.email === mockUser.email) {
        return mockUser;
      }

      return null;
    },

    findMany: async () => [mockUser],

    create: async ({ data }: any) => ({
      ...mockUser,
      ...data,
      id: "mock-user-" + Date.now(),
      created_at: new Date(),
      updated_at: new Date(),
    }),

    update: async ({ data }: any) => ({
      ...mockUser,
      ...data,
      updated_at: new Date(),
    }),

    delete: async () => mockUser,

    upsert: async ({ create, update }: any) => ({
      ...mockUser,
      ...create,
      ...update,
      updated_at: new Date(),
    }),
  };

  account = {
    findUnique: async ({ where }: any) => {
      if (where.provider_providerAccountId?.provider === "kakao") {
        return mockAccount_kakao;
      }

      return null;
    },

    findMany: async () => [mockAccount_kakao],

    create: async ({ data }: any) => ({
      ...mockAccount_kakao,
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    }),

    update: async ({ data }: any) => ({
      ...mockAccount_kakao,
      ...data,
      updated_at: new Date(),
    }),

    delete: async () => mockAccount_kakao,

    deleteMany: async () => ({ count: 1 }),
  };

  session = {
    findUnique: async ({ where }: any) => {
      if (where.session_token === mockSession.session_token) {
        return mockSession;
      }

      return null;
    },

    findMany: async () => [mockSession],

    create: async ({ data }: any) => ({
      ...mockSession,
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    }),

    update: async ({ data }: any) => ({
      ...mockSession,
      ...data,
      updated_at: new Date(),
    }),

    delete: async () => mockSession,

    deleteMany: async () => ({ count: 1 }),
  };

  verification_token = {
    findUnique: async () => null,

    create: async ({ data }: any) => ({
      identifier: data.identifier,
      token: data.token,
      expires: data.expires,
    }),

    delete: async () => ({
      identifier: "test@example.com",
      token: "mock-token",
    }),
  };

  authenticator = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async ({ data }: any) => ({
      credentialID: "mock-credential-id",
      userId: mockUser.id,
      providerAccountId: "mock-provider-account-id",
      credentialPublicKey: "mock-public-key",
      counter: 0,
      credentialDeviceType: "singleDevice",
      credentialBackedUp: false,
      transports: null,
      ...data,
    }),
    delete: async () => null,
    deleteMany: async () => ({ count: 0 }),
  };

  // 앱 특화 모델들 (필요에 따라 추가)
  users = {
    findUnique: async () => {
      return {
        id: "app-user-1",
        provider: "kakao",
        provider_id: "12345",
        profile_imageurl: mockUser.image,
        nickname: mockUser.name,
        email: mockUser.email,
        created_at: new Date(),
        created_ip: "127.0.0.1",
        updated_at: new Date(),
        updated_ip: "127.0.0.1",
      };
    },
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "new-user", ...data }),
    update: async ({ data }: any) => ({ id: "updated-user", ...data }),
  };

  playlists = {
    findMany: async () => [],
    findUnique: async () => null,
    create: async ({ data }: any) => ({ id: "new-playlist", ...data }),
  };

  comments = {
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "new-comment", ...data }),
  };

  diggings = {
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "new-digging", ...data }),
  };

  likes = {
    findMany: async () => [],
    create: async ({ data }: any) => data,
  };

  playlist_items = {
    findMany: async () => [],
    create: async ({ data }: any) => ({ ...data }),
  };

  playlist_tags = {
    findMany: async () => [],
    create: async ({ data }: any) => ({ ...data }),
  };

  shares = {
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "new-share", ...data }),
  };

  tags = {
    findMany: async () => [],
    findUnique: async () => null,
    create: async ({ data }: any) => ({ id: 1, ...data }),
  };

  inquiries = {
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "new-inquiry", ...data }),
  };

  // 트랜잭션 모킹
  $transaction = async (queries: any[]) => {
    // 각 쿼리를 순차적으로 실행하는 척
    const results = [];

    for (const query of queries) {
      if (typeof query === "function") {
        results.push(await query(this));
      } else {
        results.push(query);
      }
    }

    return results;
  };

  // 기타 Prisma 메서드들
  $connect = async () => {
    // eslint-disable-next-line no-console
    console.log("🔧 Prisma Mock: 연결 시뮬레이션");
  };

  $disconnect = async () => {
    // eslint-disable-next-line no-console
    console.log("🔧 Prisma Mock: 연결 해제 시뮬레이션");
  };

  $executeRaw = async () => ({ count: 0 });
  $queryRaw = async () => [];
}

// 환경에 따라 실제 Prisma 또는 Mock 반환
export function createPrismaClient(): PrismaClient {
  const isMockMode = process.env.NEXT_PUBLIC_MSW_MODE === "true";

  if (isMockMode) {
    // eslint-disable-next-line no-console
    console.log("🔧 Prisma Mock 모드 활성화: DB 연결 없이 동작합니다.");

    return new PrismaMock() as unknown as PrismaClient;
  }

  return new PrismaClient();
}
