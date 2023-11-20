import Burger from "./Burger";
import Main from "./Main";

import styles from "./styles.module.scss";

const Content = () => {
  return (
    <section className={styles["content"]}>
      <Burger />
      <Main />
    </section>
  );
};

export default Content;
