import useTranslation from "next-translate/useTranslation";
import Burger from './Burger';
import Main from './Main';

import styles from "./styles.module.scss";

const Content = () => {
  const { t } = useTranslation("dashboard");

  return (
    <section className={styles["content"]}>
      <Burger />
      <Main />
    </section>
  );
};

export default Content;
