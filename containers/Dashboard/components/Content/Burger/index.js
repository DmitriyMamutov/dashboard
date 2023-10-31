import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { LOGO_URL, MENU_LIST, LOGOUT_URL } from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";
import useMediaQuery from "hooks/UseMediaQuery";

import styles from "./styles.module.scss";

const Burger = () => {
  const { t } = useTranslation("dashboard");
  const isBreakpoint = useMediaQuery(1024);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className={cn(styles["burger"], {
        [styles["burger--active"]]: open,
      })}
    >
      <div className={styles["burger-header"]}>
        <div className={styles["burger-header__logo"]}>
          <Image src={LOGO_URL} width={84} height={84} alt={t("metaTitle")} />
        </div>
        <div
          onClick={handleClick}
          className={cn(styles["burger-header__icon"], {
            [styles["burger-header__icon--active"]]: open,
          })}
        />
      </div>
      <div className={styles["burger-list"]}>
        {MENU_LIST.map(({ id, iconUrl, isActive, isFirst }) => {
          return (
            <div
              key={id}
              className={cn(styles["burger-list-item"], {
                [styles["burger-list-item--active"]]:
                  (isActive && open && isBreakpoint) ||
                  (isActive && !isBreakpoint),

                [styles["burger-list-item--border"]]:
                  (open && isBreakpoint) || !isBreakpoint,
              })}
            >
              <div className={styles["burger-list-item__icon"]}>
                <Image
                  src={iconUrl}
                  width={36}
                  height={36}
                  alt={t(`menuItems.${id}.text`)}
                />
              </div>
              <div className={styles["burger-list-item__text"]}>
                {t(`menuItems.${id}.text`)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles["burger-logout"]}>
        <div className={styles["burger-logout__icon"]}>
          <Image src={LOGOUT_URL} width={36} height={36} alt={t("logout")} />
        </div>
        <div className={styles["burger-logout__text"]}>{t("logout")}</div>
      </div>
    </div>
  );
};

export default Burger;
