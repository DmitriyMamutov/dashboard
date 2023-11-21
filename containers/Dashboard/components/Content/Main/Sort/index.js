"use client";

import useTranslation from "next-translate/useTranslation";
import { ARROW_URL } from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";

import styles from "./styles.module.scss";

const Sort = (props) => {
  const { t } = useTranslation("dashboard");
  const {
    handleDropdown,
    activeDropdown,
    choosenSortText,
    choosenSortId,
    handleSort,
  } = props;

  return (
    <div className={styles["sort"]}>
      <div className={styles["sort__text"]}>{t("sortBy")}</div>

      <div className={styles["sort-dashboard"]}>
        <div
          onClick={handleDropdown}
          className={cn(styles["sort-dashboard-item"], {
            [styles["sort-dashboard-item--active"]]: activeDropdown,
          })}
        >
          {choosenSortText}

          <div
            className={cn(styles["sort-dashboard-item__icon"], {
              [styles["sort-dashboard-item__icon--active"]]: activeDropdown,
            })}
          >
            <Image src={ARROW_URL} width={24} height={24} alt={t("sortBy")} />
          </div>
        </div>

        <div
          className={cn(styles["sort-dashboard-list"], {
            [styles["sort-dashboard-list--active"]]: activeDropdown,
          })}
        >
          {t("sortList", {}, { returnObjects: true }).map(({ id, text }) => {
            return (
              <div
                onClick={() => handleSort(id)}
                key={id}
                className={cn(styles["sort-dashboard-list__text"], {
                  [styles["sort-dashboard-list__text--active"]]:
                    choosenSortId === id,
                })}
              >
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sort;
