import AdminHeader from "../_components/AdminHeader";

export default function TransactionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[80vw] min-h-screen h-auto">
      <AdminHeader>Transaction Management</AdminHeader>
      <div>{children}</div>
    </div>
  );
}
