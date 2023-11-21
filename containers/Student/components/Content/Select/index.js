"use client";
import useTranslation from "next-translate/useTranslation";

import styles from "./styles.module.scss";

const Select = (props) => {
  const { t } = useTranslation("student");
  const { id, register, student, placeholder, students } = props;

  return (
    <div key={id} className={styles["select"]}>
      <span className={styles["select__placeholder"]}>
        {t(`formItems.${id}.placeholder`)}
      </span>
      <div className={styles["select-item"]}>
        <select {...register(id)}>
          <option value={student.company[placeholder]} selected>
            {student.company[placeholder]}
          </option>
          {students
            .slice(0, 10)
            .filter(({ id }) => id.toString() !== student.id.toString())
            .map(({ company }) => {
              return (
                <option value={company[placeholder]}>
                  {company[placeholder]}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default Select;
