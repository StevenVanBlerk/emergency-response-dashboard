import type { Metadata } from "next";
import Layout from "./_layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Guuber Travel",
  description: "Easy ride-hailing at a moment's notice.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};
export default RootLayout;
