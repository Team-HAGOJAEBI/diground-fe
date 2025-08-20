"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import Footer from "@/app/_common/Footer";
import Layout from "@/app/_common/Layout";

export default function SettingPage() {
  const { data } = useSession();

  return (
    <Layout className="relative flex h-screen flex-col overflow-hidden pb-[89px]">
      <div className="flex min-h-screen items-center justify-center">
        <Image
          src={data?.user?.image || ""}
          alt="profile"
          width={400}
          height={400}
          className="rounded-[16px]"
        />
        <button
          className="bg-gray-60 rounded px-6 py-3"
          onClick={() => signOut()}
        >
          {data?.user?.name} Sign out
        </button>
      </div>
      <Footer selectedIndex={0} />
    </Layout>
  );
}
