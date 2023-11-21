"use client";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";
import { ARROW_URL } from "config/dashboard_config";

import styles from "./styles.module.scss";

const Back = () => {
  const { t } = useTranslation("student");

  return (
    <Link href="/dashboard">
      <div className={styles["back"]}>
        <div className={styles["back__arrow"]}>
          <Image src={ARROW_URL} width={24} height={24} alt={t("back")} />
        </div>
        <div className={styles["back__text"]}>{t("back")}</div>
      </div>
    </Link>
  );
};

export default Back;
