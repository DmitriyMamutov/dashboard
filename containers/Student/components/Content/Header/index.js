"use client";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { NOTIFICATION_URL } from "config/dashboard_config";
import { LOGO_VIOLET } from "config/data_config";

import styles from "./styles.module.scss";

const Header = (props) => {
  const { t } = useTranslation("student");
  const { avatarUrl } = props;

  return (
    <div className={styles["header"]}>
      <div className={styles["header__image"]}>
        <Image
          src={LOGO_VIOLET}
          width={160}
          height={160}
          alt={t("headerTitle")}
        />
      </div>
      <div className={styles["header-right"]}>
        <div className={styles["header-right__notification"]}>
          <Image
            src={NOTIFICATION_URL}
            width={64}
            height={64}
            alt={t("headerTitle")}
          />
        </div>

        <div className={styles["header-right__avatar"]}>
          <Image src={avatarUrl} width={64} height={64} alt={t("metaTitle")} />
        </div>
      </div>
    </div>
  );
};

export default Header;
