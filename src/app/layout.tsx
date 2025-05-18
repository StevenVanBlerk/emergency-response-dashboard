import type { Metadata } from "next";
import Layout from "./_layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Panic request feed",
  description: "A live feed of all incoming panic requests.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};
export default RootLayout;
