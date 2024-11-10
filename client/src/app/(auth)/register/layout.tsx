export default function LayoutRegister({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <h1>Header Layout Register</h1>
      {children}
    </main>
  );
}
