import Login from "containers/Login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function LoginPage() {
  const cookieStore = cookies();

  if (cookieStore.get("token")) {
    redirect("/dashboard");
  }
  
  return (
    <>
      <Login />
    </>
  );
}
