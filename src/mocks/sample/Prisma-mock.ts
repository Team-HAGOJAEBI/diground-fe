import { PrismaClient } from "@prisma/client";

// NextAuth용 기본 모킹 데이터
const mockUser = {
  id: "하고젭 모킹 유저",
  name: "테스트 사용자",
  email: "test@diground.local",
  emailVerified: null,
  image:
    "https://cdnimg.melon.co.khttps://cdnimg.melon.co.kr/cm2/photo/images/000/802/83/025/80283025_20241216144433_org.jpg/",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAccount_kakao = {
  userId: mockUser.id,
  type: "oauth",
  provider: "kakao",
  providerAccountId: "12345",
  refresh_token: "mock-refresh-token",
  access_token: "mock-access-token",
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "Bearer",
  scope: "profile_nickname profile_image account_email",
  id_token: "mock-id-token",
  session_state: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockSession = {
  sessionToken: "mock-session-token",
  userId: mockUser.id,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간 후
  createdAt: new Date(),
  updatedAt: new Date(),
};

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
      createdAt: new Date(),
      updatedAt: new Date(),
    }),

    update: async ({ data }: any) => ({
      ...mockUser,
      ...data,
      updatedAt: new Date(),
    }),

    delete: async () => mockUser,

    upsert: async ({ create, update }: any) => ({
      ...mockUser,
      ...create,
      ...update,
      updatedAt: new Date(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
    }),

    update: async ({ data }: any) => ({
      ...mockAccount_kakao,
      ...data,
      updatedAt: new Date(),
    }),

    delete: async () => mockAccount_kakao,

    deleteMany: async () => ({ count: 1 }),
  };

  session = {
    findUnique: async ({ where }: any) => {
      if (where.sessionToken === mockSession.sessionToken) {
        return mockSession;
      }

      return null;
    },

    findMany: async () => [mockSession],

    create: async ({ data }: any) => ({
      ...mockSession,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),

    update: async ({ data }: any) => ({
      ...mockSession,
      ...data,
      updatedAt: new Date(),
    }),

    delete: async () => mockSession,

    deleteMany: async () => ({ count: 1 }),
  };

  verificationToken = {
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

    return new PrismaMock() as any;
  }

  return new PrismaClient();
}
