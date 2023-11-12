import Dashboard from "containers/Dashboard";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function DashboardPage() {
  const cookieStore = cookies();

  if (!cookieStore.get("token")) {
    redirect("/login");
  }

  return (
    <>
      <Dashboard />
    </>
  );
}
