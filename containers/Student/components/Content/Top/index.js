"use client";
import useTranslation from "next-translate/useTranslation";
import Button from "components/Button";
import Image from "next/image";

import styles from "./styles.module.scss";

const Top = (props) => {
  const { t } = useTranslation("student");
  const { student } = props;

  return (
    <div className={styles["top"]}>
      <div className={styles["top__image"]}>
        <Image src={student?.image} width={168} height={168} />
      </div>

      <div className={styles["top-right"]}>
        <div className={styles["top-right__button"]}>
          <Button disabled variant="secondary" width="max">
            {t("replaceButton")}
          </Button>
        </div>

        <div className={styles["top-right__requirements"]}>
          {t("imageRequirements")}
        </div>
      </div>
    </div>
  );
};

export default Top;
