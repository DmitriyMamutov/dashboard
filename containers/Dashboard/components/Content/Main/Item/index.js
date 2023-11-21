"use client";

import useTranslation from "next-translate/useTranslation";
import { EDIT_URL } from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";
import { ReactSVG } from "react-svg";
import Link from "next/link";

import styles from "./styles.module.scss";

const Main = (props) => {
  const { id, image, firstName, lastName, email, age, company } = props;
  const { t } = useTranslation("dashboard");

  return (
    <div key={id} className={styles["item"]}>
      <div className={styles["item__avatar"]}>
        <Image src={image} alt={id} width={80} height={80} />
      </div>
      <div className={styles["item__wrapper"]}>
        <div className={cn(styles["item__text"], styles["item__name"])}>
          <span>{t(`dashboardColumns.name`) + `: `}</span>
          {firstName}
        </div>

        <div className={cn(styles["item__text"], styles["item__surname"])}>
          <span>{t(`dashboardColumns.surname`) + `: `}</span>
          {lastName}
        </div>

        <div className={cn(styles["item__text"], styles["item__email"])}>
          <span>{t(`dashboardColumns.email`) + `: `}</span>
          {email}
        </div>

        <div className={cn(styles["item__text"], styles["item__age"])}>
          <span>{t(`dashboardColumns.age`) + `: `}</span>
          {age}
        </div>

        <div className={cn(styles["item__text"], styles["item__course"])}>
          <span>{t(`dashboardColumns.course`) + `: `}</span>
          {company.title}
        </div>

        <div className={cn(styles["item__text"], styles["item__group"])}>
          <span>{t(`dashboardColumns.group`) + `: `}</span>
          {company.department}
        </div>
      </div>
      <Link href={`/dashboard/${id}`}>
        <div className={styles["item__edit"]}>
          <ReactSVG src={EDIT_URL} />
        </div>
      </Link>
    </div>
  );
};

export default Main;
