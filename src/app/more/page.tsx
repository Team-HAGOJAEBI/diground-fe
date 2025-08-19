"use client";

import { signOut } from "next-auth/react";

import Footer from "@/app/_common/Footer";
import Layout from "@/app/_common/Layout";

export default function SettingPage() {
  return (
    <Layout className="relative flex h-screen flex-col overflow-hidden pb-[89px]">
      <div className="flex min-h-screen items-center justify-center">
        <button
          className="bg-gray-60 rounded px-6 py-3"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      <Footer selectedIndex={0} />
    </Layout>
  );
}
