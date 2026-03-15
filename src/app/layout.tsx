import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Mini Shop Builder",
  description: "A mini Shopify-like platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}