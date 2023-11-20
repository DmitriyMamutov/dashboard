import { useState } from "react";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { ReactSVG } from "react-svg";
import Title from "components/Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import axios from "axios";
import { addStudent } from "redux/reducers/students";
import { useDispatch, useSelector } from "react-redux";

import { FORM_LIST, CLOSE_URL } from "config/dashboard_config";
import { LOADER } from "config/data_config";

import * as yup from "yup";

import styles from "./styles.module.scss";

const Modal = (props) => {
  const { isModalVisible, closeModal } = props;
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();

  const [responseStatus, setResponseStatus] = useState(null);

  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required(t("modal.formItems.firstName.required")),
      lastName: yup.string().required(t("modal.formItems.lastName.required")),
      email: yup
        .string()
        .required(t("modal.formItems.email.required"))
        .email(t("modal.formItems.email.valid")),
      age: yup
        .number()
        .typeError(t("modal.formItems.age.valid"))
        .required(t("modal.formItems.age.required")),
      course: yup.string().required(t("modal.formItems.course.required")),
      group: yup.string().required(t("modal.formItems.group.required")),
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

  const onSubmit = async (value) => {
    try {
      await axios
        .post("https://dummyjson.com/users/add", {
          id: value.id,
          image: "/static/images/dashboard/header/avatar.png",
          firstName: value.firstName,
          lastName: value.lastName,
          age: value.age,
          email: value.email,
          company: { title: value.course, department: value.group },
        })
        .then((response) => {
          dispatch(addStudent(response.data));

          setResponseStatus(response.status);
          reset();

          setTimeout(() => {
            closeModal();
          }, 700);
        });
    } catch ({ response }) {
      setResponseStatus(response.status);
    }
  };

  return (
    <div
      className={cn(styles["modal"], {
        [styles["modal--visible"]]: isModalVisible,
      })}
    >
      <div className={styles["modal-banner"]}>
        <div className={styles["modal-banner-content"]}>
          <div
            className={styles["modal-banner-content__close"]}
            onClick={closeModal}
          >
            <ReactSVG src={CLOSE_URL} />
          </div>
          <Title
            className={styles["modal-banner-content__title"]}
            size={"h2"}
            level={2}
            font="Lexend"
            color="black"
          >
            {t("modal.title")}
          </Title>

          <form
            className={styles["modal-banner-content-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            {FORM_LIST.map(({ id, type }) => {
              return (
                <label
                  key={id}
                  className={styles["modal-banner-content-form-label"]}
                >
                  <span
                    className={styles["modal-banner-content-form-label__text"]}
                  >
                    {t(`modal.formItems.${id}.placeholder`)}
                  </span>
                  <input
                    className={styles["modal-banner-content-form-label__input"]}
                    {...register(id)}
                    type={type}
                  />
                  <span
                    className={styles["modal-banner-content-form-label__error"]}
                  >
                    {errors[`${id}`]?.message}
                  </span>
                </label>
              );
            })}

            <div className={styles["modal-banner-content-form-bottom"]}>
              <Button
                className={styles["modal-banner-content-form-bottom__button"]}
                variant="primary"
                width="max"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <img src={LOADER} /> : t("modal.buttonText")}
              </Button>
              {responseStatus &&
                (responseStatus === 200 ? (
                  <div
                    className={
                      styles["modal-banner-content-form-bottom__success"]
                    }
                  >
                    {t("modal.success")}
                  </div>
                ) : (
                  <div
                    className={
                      styles["modal-banner-content-form-bottom__error"]
                    }
                  >
                    {t("modal.error")}
                  </div>
                ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
