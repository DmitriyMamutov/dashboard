import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const { t } = useTranslation("index");
  const cookieStore = cookies();

  if (cookieStore.get("token")) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return <main>{t("metaTitle")}</main>;
}
