import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Login from "containers/Login";

export default function Home() {
  const { t } = useTranslation("login");

  return (
    <>
      <Head>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Login />
    </>
  );
}