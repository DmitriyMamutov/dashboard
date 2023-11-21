"use client";

import useTranslation from "next-translate/useTranslation";
import { SEARCH_URL } from "config/dashboard_config";
import Image from "next/image";

import styles from "./styles.module.scss";

const Search = (props) => {
  const { t } = useTranslation("dashboard");
  const { handleSearch } = props;

  return (
    <div className={styles["search"]}>
      <div className={styles["search__icon"]}>
        <Image src={SEARCH_URL} width={32} height={32} alt={t("search")} />
      </div>
      <input placeholder={t("search")} onChange={handleSearch} />
    </div>
  );
};

export default Search;
