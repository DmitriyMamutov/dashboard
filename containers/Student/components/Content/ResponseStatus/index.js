"use client";
import useTranslation from "next-translate/useTranslation";
import styles from "./styles.module.scss";

const ResponseStatus = (props) => {
  const { t } = useTranslation("student");
  const { responseStatus } = props;

  return (
    <>
      {responseStatus &&
        (responseStatus === 200 ? (
          <div className={styles["success"]}>{t("success")}</div>
        ) : (
          <div className={styles["error"]}>{t("error")}</div>
        ))}
    </>
  );
};

export default ResponseStatus;
