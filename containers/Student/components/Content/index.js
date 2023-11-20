"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStudent } from "redux/reducers/students";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import Link from "next/link";
import Image from "next/image";
import * as yup from "yup";
import cn from "classnames";

import {
  FORM_LIST,
  NOTIFICATION_URL,
  ARROW_URL,
} from "config/dashboard_config";
import { LOADER, LOGO_VIOLET } from "config/data_config";

import styles from "./styles.module.scss";

const Content = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation("student");

  const [responseStatus, setResponseStatus] = useState(null);

  const avatarUrl = useSelector((state) => state.user.user.avatarUrl);

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

  const onSubmit = async (value) => {
    try {
      await axios
        .put(`https://dummyjson.com/users/${params.id}`, {
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
              value.course.length === 0
                ? student.company.department
                : value.group,
          },
        })
        .then((response) => {
          console.log("response", response);
          dispatch(
            updateCurrentStudent({
              id: response.data.id,
              image: response.data.image,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              age: response.data.age,
              email: response.data.email,
              company: {
                title: response.data.company.title,
                department: response.data.company.department,
              },
            }),
          );
          setResponseStatus(response.status);
        });
    } catch {
      setResponseStatus(400);
    }
  };

  return (
    <section className={styles["content"]}>
      <div className={styles["content-header"]}>
        <div className={styles["content-header__image"]}>
          <Image
            src={LOGO_VIOLET}
            width={160}
            height={160}
            alt={t("headerTitle")}
          />
        </div>
        <div className={styles["content-header-right"]}>
          <div className={styles["content-header-right__notification"]}>
            <Image
              src={NOTIFICATION_URL}
              width={64}
              height={64}
              alt={t("headerTitle")}
            />
          </div>

          <div className={styles["content-header-right__avatar"]}>
            <Image
              src={avatarUrl}
              width={64}
              height={64}
              alt={t("metaTitle")}
            />
          </div>
        </div>
      </div>
      <div className={styles["content-block"]}>
        <Link href="/dashboard">
          <div className={styles["content-block-back"]}>
            <div className={styles["content-block-back__arrow"]}>
              <Image src={ARROW_URL} width={24} height={24} alt={t("back")} />
            </div>
            <div className={styles["content-block-back__text"]}>
              {t("back")}
            </div>
          </div>
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["content-block-form"]}
        >
          <div className={styles["content-block-form-left"]}>
            <div className={styles["content-block-form__title"]}>
              {t("leftTitle")}
            </div>

            <div className={styles["content-block-form-left-wrapper"]}>
              <div className={styles["content-block-form-left-wrapper-top"]}>
                <div
                  className={
                    styles["content-block-form-left-wrapper-top__image"]
                  }
                >
                  <Image src={student?.image} width={168} height={168} />
                </div>

                <div
                  className={
                    styles["content-block-form-left-wrapper-top-right"]
                  }
                >
                  <div
                    className={
                      styles[
                        "content-block-form-left-wrapper-top-right__button"
                      ]
                    }
                  >
                    <Button disabled variant="secondary" width="max">
                      {t("replaceButton")}
                    </Button>
                  </div>

                  <div
                    className={
                      styles[
                        "content-block-form-left-wrapper-top-right__requirements"
                      ]
                    }
                  >
                    {t("imageRequirements")}
                  </div>
                </div>
              </div>

              <div className={styles["content-block-form-left-wrapper-main"]}>
                {FORM_LIST.slice(0, 4).map(({ id, type, placeholder }) => {
                  return (
                    <label
                      key={id}
                      className={
                        styles["content-block-form-left-wrapper-main-label"]
                      }
                    >
                      <span
                        className={
                          styles[
                            "content-block-form-left-wrapper-main-label__text"
                          ]
                        }
                      >
                        {t(`formItems.${id}.placeholder`)}
                      </span>
                      <input
                        className={
                          styles[
                            "content-block-form-left-wrapper-main-label__input"
                          ]
                        }
                        {...register(id)}
                        placeholder={student[placeholder]}
                        type={type}
                      />
                      <span
                        className={
                          styles[
                            "content-block-form-left-wrapper-main-label__error"
                          ]
                        }
                      >
                        {errors[`${id}`]?.message}
                      </span>
                    </label>
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

                {responseStatus &&
                  (responseStatus === 200 ? (
                    <div
                      className={
                        styles["content-block-form-left-wrapper-main__success"]
                      }
                    >
                      {t("success")}
                    </div>
                  ) : (
                    <div
                      className={
                        styles["content-block-form-left-wrapper-main__error"]
                      }
                    >
                      {t("error")}
                    </div>
                  ))}
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
              {FORM_LIST.slice(4).map(({ id, type, placeholder }) => {
                return (
                  <label
                    key={id}
                    className={
                      styles["content-block-form-left-wrapper-main-label"]
                    }
                  >
                    <span
                      className={
                        styles[
                          "content-block-form-left-wrapper-main-label__text"
                        ]
                      }
                    >
                      {t(`formItems.${id}.placeholder`)}
                    </span>
                    <input
                      className={
                        styles[
                          "content-block-form-left-wrapper-main-label__input"
                        ]
                      }
                      {...register(id)}
                      placeholder={student.company[placeholder]}
                      type={type}
                    />
                    <span
                      className={
                        styles[
                          "content-block-form-left-wrapper-main-label__error"
                        ]
                      }
                    >
                      {errors[`${id}`]?.message}
                    </span>
                  </label>
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

              {responseStatus &&
                (responseStatus === 200 ? (
                  <div
                    className={
                      styles["content-block-form-left-wrapper-main__success"]
                    }
                  >
                    {t("success")}
                  </div>
                ) : (
                  <div
                    className={
                      styles["content-block-form-left-wrapper-main__error"]
                    }
                  >
                    {t("error")}
                  </div>
                ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Content;
