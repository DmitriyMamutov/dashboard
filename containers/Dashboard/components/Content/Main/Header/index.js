"use client";

import useTranslation from "next-translate/useTranslation";
import { NOTIFICATION_URL } from "config/dashboard_config";
import Image from "next/image";
import Title from "components/Title";

import styles from "./styles.module.scss";

const Header = (props) => {
  const { avatarUrl } = props;
  const { t } = useTranslation("dashboard");

  return (
    <div className={styles["header"]}>
      <Title
        className={styles["header__title"]}
        level={1}
        size="h1"
        color="secondary-black"
        font="Nunito"
      >
        {t("headerTitle")}
      </Title>

      <div className={styles["header-left"]}>
        <div className={styles["header-left__notification"]}>
          <Image
            src={NOTIFICATION_URL}
            width={64}
            height={64}
            alt={t("headerTitle")}
          />
        </div>

        <div className={styles["header-left__avatar"]}>
          <Image src={avatarUrl} width={64} height={64} alt={t("metaTitle")} />
        </div>
      </div>
    </div>
  );
};

export default Header;
