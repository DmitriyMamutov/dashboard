import styles from "./styles.module.scss";

const Label = (props) => {
  const { id, errors, register, type, placeholder, inputText } = props;

  return (
    <label key={id} className={styles["label"]}>
      <span className={styles["label__text"]}>{placeholder}</span>
      <input
        placeholder={inputText && inputText}
        className={styles["label__input"]}
        {...register(id)}
        type={type}
      />
      <span className={styles["label__error"]}>{errors}</span>
    </label>
  );
};

export default Label;
