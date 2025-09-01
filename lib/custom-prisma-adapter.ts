import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import type { Adapter, AdapterAccount } from "next-auth/adapters";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  const baseAdapter = PrismaAdapter(prisma);

  return {
    ...baseAdapter,
    async linkAccount(account: AdapterAccount) {
      const createdAccount = await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refreshToken as string | null,
          accessToken: account.accessToken as string | null,
          expiresAt: account.expiresAt as number | null,
          tokenType: account.tokenType as string | null,
          scope: account.scope as string | null,
          idToken: account.idToken as string | null,
          sessionState: account.sessionState as string | null,
        },
      });

      return {
        userId: createdAccount.userId,
        type: createdAccount.type,
        provider: createdAccount.provider,
        providerAccountId: createdAccount.providerAccountId,
        refreshToken: createdAccount.refreshToken,
        accessToken: createdAccount.accessToken,
        expiresAt: createdAccount.expiresAt,
        tokenType: createdAccount.tokenType,
        scope: createdAccount.scope,
        idToken: createdAccount.idToken,
        sessionState: createdAccount.sessionState,
      } as AdapterAccount;
    },
  };
}
