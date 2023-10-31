import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Dashboard from "containers/Dashboard";

export default function Home() {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Dashboard />
    </>
  );
}