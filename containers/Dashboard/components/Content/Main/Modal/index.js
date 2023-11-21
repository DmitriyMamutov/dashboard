import { useState } from "react";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { ReactSVG } from "react-svg";
import Title from "components/Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import { addStudent } from "redux/reducers/students";
import { useDispatch, useSelector } from "react-redux";
import Label from "components/Label";
import { FORM_LIST, CLOSE_URL } from "config/dashboard_config";
import { LOADER } from "config/data_config";

import * as yup from "yup";

import styles from "./styles.module.scss";

const Modal = (props) => {
  const { isModalVisible, closeModal } = props;
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();

  const [responseStatus, setResponseStatus] = useState(null);

  const students = useSelector((state) => state.students.students);

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

  const onSubmit = (value) => {
    dispatch(
      addStudent({
        id: students.length + 1,
        firstName: value.firstName,
        lastName: value.lastName,
        age: value.age,
        email: value.email,
        company: {
          title: value.course,
          department: value.group,
        },
      }),
    );

    setResponseStatus(200);

    setTimeout(() => {
      setResponseStatus(null);
    }, 800);

    setTimeout(() => {
      closeModal();
    }, 700);

    reset();
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
                <Label
                  key={id}
                  register={register}
                  id={id}
                  type={type}
                  errors={errors[`${id}`]?.message}
                  placeholder={t(`modal.formItems.${id}.placeholder`)}
                />
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
