import cn from "classnames";

import styles from "./styles.module.scss";

const Title = (props) => {
  const { size, children, className, color, level, font } = props;

  const titleClass = cn(
    styles["title"],
    {
      [styles["title--h1"]]: size === "h1",
      [styles["title--h2"]]: size === "h2",
      [styles["title--black"]]: color === "black",
      [styles["title--secondary_black"]]: color === "secondary-black",
      [styles["title--white"]]: color === "white",
      [styles["title--lexend"]]: font === "Lexend",
      [styles["title--nunito"]]: font === "Nunito",
    },
    className,
  );

  const CustomTag = `h${level}`;

  return <CustomTag className={titleClass}>{children}</CustomTag>;
};

export default Title;
