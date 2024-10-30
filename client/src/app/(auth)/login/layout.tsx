import type { Metadata } from "next";

export default function LayoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <h1>Header Layout Login</h1>
      {children}
    </main>
  );
}
