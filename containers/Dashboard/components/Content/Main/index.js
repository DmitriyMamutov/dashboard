import useTranslation from "next-translate/useTranslation";
import {
  HEADERT_AVATAR_URL,
  NOTIFICATION_URL,
  STUDENTS_LIST,
  EDIT_URL,
} from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";
import Title from "components/Title";
import ReactSVG from "react-svg";

import styles from "./styles.module.scss";

const Main = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className={styles["main"]}>
      <div className={styles["main-header"]}>
        <Title
          className={styles["main-header__title"]}
          level={1}
          size="h1"
          color="secondary-black"
          font="Nunito"
        >
          {t("headerTitle")}
        </Title>

        <div className={styles["main-header-left"]}>
          <div className={styles["main-header-left__notification"]}>
            <Image
              src={NOTIFICATION_URL}
              width={64}
              height={64}
              alt={t("headerTitle")}
            />
          </div>

          <div className={styles["main-header-left__avatar"]}>
            <Image
              src={HEADERT_AVATAR_URL}
              width={64}
              height={64}
              alt={t("metaTitle")}
            />
          </div>
        </div>
      </div>
      <div className={styles["main-content"]}>
        <div className={styles["main-content-columns"]}>
          <div className={styles["main-content-columns__avatar"]} />
          <div
            className={cn(
              styles["main-content-columns__text"],
              styles["main-content-columns__name"],
            )}
          >
            {t(`dashboardColumns.name`)}
          </div>

          <div
            className={cn(
              styles["main-content-columns__text"],
              styles["main-content-columns__surname"],
            )}
          >
            {t(`dashboardColumns.surname`)}
          </div>

          <div
            className={cn(
              styles["main-content-columns__text"],
              styles["main-content-columns__email"],
            )}
          >
            {t(`dashboardColumns.email`)}
          </div>

          <div
            className={cn(
              styles["main-content-columns__text"],
              styles["main-content-columns__age"],
            )}
          >
            {t(`dashboardColumns.age`)}
          </div>

          <div
            className={cn(
              styles["main-content-columns__text"],
              styles["main-content-columns__course"],
            )}
          >
            {t(`dashboardColumns.course`)}
          </div>

          <div
            className={cn(
              styles["main-content-columns__text"],
              styles["main-content-columns__group"],
            )}
          >
            {t(`dashboardColumns.group`)}
          </div>
          <div className={styles["main-content-columns__edit"]} />
        </div>
        <div className={styles["main-content-students"]}>
          {STUDENTS_LIST.map(({ id, age, avatarUrl, isAvatar, isEdit }) => {
            return (
              <div key={id} className={styles["main-content-students-item"]}>
                <div className={styles["main-content-students-item__avatar"]}>
                  {isAvatar && (
                    <Image src={avatarUrl} alt={id} width={80} height={80} />
                  )}
                </div>
                <div              className={
                    styles["main-content-students-item__wrapper"]}>

<div
                  className={cn(
                    styles["main-content-students-item__text"],
                    styles["main-content-students-item__name"],
                  )}
                >
                  <span>{t(`dashboardColumns.name`) + `: `}</span>
                  {t(`dashboardItems.${id}.name`)}
                </div>

                <div
                  className={cn(
                    styles["main-content-students-item__text"],
                    styles["main-content-students-item__surname"],
                  )}
                >
                  <span>{t(`dashboardColumns.surname`) + `: `}</span>
                  {t(`dashboardItems.${id}.surname`)}
                </div>

                <div
                  className={cn(
                    styles["main-content-students-item__text"],
                    styles["main-content-students-item__email"],
                  )}
                >
                  <span>{t(`dashboardColumns.email`) + `: `}</span>
                  {t(`dashboardItems.${id}.email`)}
                </div>

                <div
                  className={cn(
                    styles["main-content-students-item__text"],
                    styles["main-content-students-item__age"],
                  )}
                >
                  <span>{t(`dashboardColumns.age`) + `: `}</span>
                  {id === "i0" ? t(`dashboardItems.${id}.age`) : age}
                </div>

                <div
                  className={cn(
                    styles["main-content-students-item__text"],
                    styles["main-content-students-item__course"],
                  )}
                >
                  <span>{t(`dashboardColumns.course`) + `: `}</span>
                  {t(`dashboardItems.${id}.course`)}
                </div>

                <div
                  className={cn(
                    styles["main-content-students-item__text"],
                    styles["main-content-students-item__group"],
                  )}
                >
                  <span>{t(`dashboardColumns.group`) + `: `}</span>
                  {t(`dashboardItems.${id}.group`)}
                </div>
                </div>
                
                <div className={styles["main-content-students-item__edit"]}>
                  {isEdit && <ReactSVG src={EDIT_URL} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
