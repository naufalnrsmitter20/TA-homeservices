import AdminHeader from "../_components/AdminHeader";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[80vw] min-h-screen h-auto">
      <AdminHeader>User Management</AdminHeader>
      <div>{children}</div>
    </div>
  );
}
