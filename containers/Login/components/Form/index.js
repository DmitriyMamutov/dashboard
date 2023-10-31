import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import Title from "components/Title";
import { FORM_LIST } from "config/login_config";
import { LOGO_VIOLET } from "config/data_config";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles.module.scss";

const Form = () => {
  const [checkboxActive, setCheckboxActive] = useState(false);
  const [inputType, setInputType] = useState("password");

  const { t } = useTranslation("login");

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required(t("form.items.email.required"))
        .email(t("form.items.email.valid")),
      password: yup
        .string()
        .required(t("form.items.password.required"))
        .min(4, t("form.items.password.short"))
        .max(32, t("form.items.password.long")),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onCheckboxChange = () => {
    setCheckboxActive(!checkboxActive);
  };

  useEffect(() => {
    if (checkboxActive) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }, [checkboxActive]);

  const onSubmit = (data) => {
    const result = {
      email: data.email,
      password: data.password,
    };
    console.log(result, "result");
  };

  return (
    <section className={styles["form"]}>
      <div className={styles["form__wrapper"]}>
        <div className="container">
          <div className={styles["form__image"]}>
            <Image
              src={LOGO_VIOLET}
              width={160}
              height={160}
              alt={t("form.title")}
            />
          </div>

          <Title level={1} size="h2" className={styles["form__title"]}>
            {t("form.title")}
          </Title>

          <form
            className={styles["form-content"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {FORM_LIST.map(({ id, type }) => {
              return (
                <label key={id} className={styles["form-content-label"]}>
                  <span className={styles["form-content-label__text"]}>
                    {t(`form.items.${id}.placeholder`)}
                  </span>
                  <input
                    className={styles["form-content-label__input"]}
                    {...register(id)}
                    type={type !== "text" ? inputType : type}
                  />
                  <span className={styles["form-content-label__error"]}>
                    {errors[`${id}`]?.message}
                  </span>
                </label>
              );
            })}
            <div className={styles["form-content__checkbox"]}>
              <Checkbox
                labelText={t("form.checkbox")}
                onChange={() => onCheckboxChange()}
              />
            </div>

            <Button type="submit">{t("form.buttonText")}</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
