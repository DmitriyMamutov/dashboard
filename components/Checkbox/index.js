import styles from "./styles.module.scss";

const Checkbox = (props) => {
  const { id, labelText, onChange, name } = props;

  return (
    <label className={styles["checkbox"]} htmlFor={id}>
      {labelText}
      <input
        type="checkbox"
        className={styles["checkbox__input"]}
        id={id}
        onChange={onChange}
        data-hj-allow
        name={name}
      />
      <span className={styles["checkbox__mark"]} />
    </label>
  );
};

export default Checkbox;
