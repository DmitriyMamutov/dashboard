"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStudent } from "redux/reducers/students";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import * as yup from "yup";
import cn from "classnames";
import { FORM_LIST } from "config/dashboard_config";
import { LOADER } from "config/data_config";
import Header from "./Header";
import Back from "./Back";
import Top from "./Top";
import Label from "components/Label";
import ResponseStatus from "./ResponseStatus";
import Select from "./Select";

import styles from "./styles.module.scss";

const Content = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation("student");

  const [responseStatus, setResponseStatus] = useState(null);

  const avatarUrl = useSelector((state) => state.user.user.avatarUrl);
  const students = useSelector((state) => state.students.students);

  const student = useSelector((state) =>
    state.students.students.find(
      ({ id }) => id.toString() === params.id.toString(),
    ),
  );

  const schema = yup
    .object()
    .shape({
      email: yup.string().email(t("formItems.email.valid")),
      age: yup
        .number()
        .typeError(t("formItems.age.valid"))
        .nullable()
        .transform((_, val) => (val !== "" ? Number(val) : student.age)),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (value) => {
    dispatch(
      updateCurrentStudent({
        id: student.id,
        firstName:
          value.firstName.length === 0 ? student.firstName : value.firstName,
        lastName:
          value.lastName.length === 0 ? student.lastName : value.lastName,
        age: value.age.length === 0 ? student.age : value.age,
        email: value.email.length === 0 ? student.email : value.email,
        company: {
          title:
            value.course.length === 0 ? student.company.title : value.course,
          department:
            value.group.length === 0 ? student.company.department : value.group,
        },
      }),
    );
    setResponseStatus(200);
  };

  return (
    <section className={styles["content"]}>
      <Header avatarUrl={avatarUrl} />

      <div className={styles["content-block"]}>
        <Back />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["content-block-form"]}
        >
          <div className={styles["content-block-form-left"]}>
            <div className={styles["content-block-form__title"]}>
              {t("leftTitle")}
            </div>

            <div className={styles["content-block-form-left-wrapper"]}>
              <Top student={student} />

              <div className={styles["content-block-form-left-wrapper-main"]}>
                {FORM_LIST.slice(0, 4).map(({ id, type, placeholder }) => {
                  return (
                    <Label
                      key={id}
                      id={id}
                      placeholder={t(`formItems.${id}.placeholder`)}
                      inputText={student[placeholder]}
                      register={register}
                      type={type}
                      errors={errors[`${id}`]?.message}
                    />
                  );
                })}
              </div>

              <div
                className={
                  styles["content-block-form-left-wrapper-main__bottom"]
                }
              >
                <Button
                  className={cn(
                    styles["content-block-form-left-wrapper-main__button"],
                  )}
                  width="max"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <img src={LOADER} /> : t("buttonText")}
                </Button>

                <ResponseStatus responseStatus={responseStatus} />
              </div>
            </div>
          </div>

          <div className={styles["content-block-form-right"]}>
            <div
              className={cn(
                styles["content-block-form__title"],
                styles["content-block-form__title--right"],
              )}
            >
              {t("rightTitle")}
            </div>

            <div className={styles["content-block-form-left-wrapper-main"]}>
              {FORM_LIST.slice(4).map(({ id, placeholder }) => {
                return (
                  <Select
                    key={id}
                    id={id}
                    register={register}
                    student={student}
                    placeholder={placeholder}
                    students={students}
                  />
                );
              })}
            </div>

            <div className={styles["content-block-form-right__bottom"]}>
              <Button
                className={cn(
                  styles["content-block-form-left-wrapper-main__button"],
                )}
                width="max"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <img src={LOADER} /> : t("buttonText")}
              </Button>

              <ResponseStatus responseStatus={responseStatus} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Content;
