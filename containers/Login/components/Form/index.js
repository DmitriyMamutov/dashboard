"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "universal-cookie";
import Title from "components/Title";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { FORM_LIST } from "config/login_config";
import { LOGO_VIOLET, LOADER } from "config/data_config";
import axios from "axios";
import { loginAccount } from "redux/reducers/user";
import { useDispatch } from "react-redux";
import Label from "components/Label";

import styles from "./styles.module.scss";

const Form = () => {
  const [checkboxActive, setCheckboxActive] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [responseStatus, setResponseStatus] = useState(null);

  const dispatch = useDispatch();

  const cookies = new Cookies();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const { t } = useTranslation("login");

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(t("form.items.name.required")),
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onCheckboxChange = () => {
    setCheckboxActive(!checkboxActive);
  };

  const onSubmit = async (value) => {
    try {
      await axios
        .post("https://dummyjson.com/auth/login", {
          username: value.name,
          password: value.password,
        })
        .then((response) => {
          dispatch(loginAccount(response.data));
          cookies.set("token", response.data.token, {
            expires: expirationDate,
            secure: true,
          });
          setResponseStatus(null);
          location.assign("/dashboard");
          reset();
        });
    } catch ({ response }) {
      setResponseStatus(response.status);
    }
  };

  useEffect(() => {
    if (checkboxActive) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }, [checkboxActive]);

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

          <Title
            color="black"
            font="Lexend"
            level={1}
            size="h2"
            className={styles["form__title"]}
          >
            {t("form.title")}
          </Title>

          <form
            className={styles["form-content"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {FORM_LIST.map(({ id, type }) => {
              return (
                <Label
                  key={id}
                  register={register}
                  id={id}
                  type={type !== "text" ? inputType : type}
                  errors={errors[`${id}`]?.message}
                  placeholder={t(`form.items.${id}.placeholder`)}
                />
              );
            })}
            <div className={styles["form-content__checkbox"]}>
              <Checkbox
                labelText={t("form.checkbox")}
                onChange={() => onCheckboxChange()}
              />
            </div>

            <Button
              className={styles["form-content__button"]}
              variant="primary"
              width="max"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <img src={LOADER} /> : t("form.buttonText")}
            </Button>

            {responseStatus && responseStatus !== 200 && (
              <div className={styles["form-content__error"]}>
                {t(`form.responseError`)}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
