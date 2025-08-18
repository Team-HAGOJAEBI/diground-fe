import Footer from "@/app/_common/Footer";
import Layout from "@/app/_common/Layout";
export default function PlaylistsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className={`relative flex h-screen flex-col overflow-hidden pb-[89px]`}>
      {children}
      <Footer selectedIndex={0} />
    </Layout>
  );
}
