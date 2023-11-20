"use client";

import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import {
  NOTIFICATION_URL,
  EDIT_URL,
  SEARCH_URL,
  ADD_URL,
  ARROW_URL,
} from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";
import Title from "components/Title";
import { ReactSVG } from "react-svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "components/Button";
import Modal from "./Modal";
import {
  getStudents,
  sortStudentsZa,
  sortStudentsAz,
  sortStudentsAgeYoungest,
  sortStudentsAgeOldest,
  sortStudentsDefault,
} from "redux/reducers/students";
import Link from "next/link";

import styles from "./styles.module.scss";

const Main = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  const [query, setQuery] = useState("");
  const [choosenSortId, setChoosenSortId] = useState("s5");

  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();

  const avatarUrl = useSelector((state) => state.user.user.avatarUrl);
  const studentsArray = useSelector((state) => state.students.students);

  const logStudents = JSON.parse(localStorage.getItem("persist:root"));
  const newLog = JSON.parse(logStudents.students);

  useEffect(() => {
    if (newLog.students.length === 0) {
      axios.get("https://dummyjson.com/users").then((response) => {
        dispatch(getStudents(response.data.users));
      });
    }

    return () => dispatch(sortStudentsDefault());
  }, []);

  const handleSort = (id) => {
    setChoosenSortId(id);
    if (id === "s1") {
      dispatch(sortStudentsAz());
    }
    if (id === "s2") {
      dispatch(sortStudentsZa());
    }
    if (id === "s3") {
      dispatch(sortStudentsAgeYoungest());
    }
    if (id === "s4") {
      dispatch(sortStudentsAgeOldest());
    }
    if (id === "s5") {
      dispatch(sortStudentsDefault());
    }
  };

  const handleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const choosenSortText = t("sortList", {}, { returnObjects: true })
    .filter(({ id }) => id === choosenSortId)
    .map(({ text }) => {
      return text;
    });

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const students = studentsArray.filter(
    ({ firstName, lastName, email, company, age }) => {
      return query === ""
        ? firstName
        : firstName.toLowerCase().includes(query.toLowerCase())
        ? firstName
        : lastName.toLowerCase().includes(query.toLowerCase())
        ? lastName
        : email.toLowerCase().includes(query.toLowerCase())
        ? email
        : age.toString().toLowerCase().includes(query.toLowerCase())
        ? age.toString()
        : company.title.toString().toLowerCase().includes(query.toLowerCase())
        ? company.title.toString()
        : company.department
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase()) && company.department.toString();
    },
  );

  return (
    <>
      <Modal closeModal={closeModal} isModalVisible={isModalVisible} />
      <div className={styles["main"]}>
        <div className={styles["main-header"]}>
          <Title
            className={styles["main-header__title"]}
            level={1}
            size="h1"
            color="secondary-black"
            font="Nunito"
          >
            {t("headerTitle")}
          </Title>

          <div className={styles["main-header-left"]}>
            <div className={styles["main-header-left__notification"]}>
              <Image
                src={NOTIFICATION_URL}
                width={64}
                height={64}
                alt={t("headerTitle")}
              />
            </div>

            <div className={styles["main-header-left__avatar"]}>
              <Image
                src={avatarUrl}
                width={64}
                height={64}
                alt={t("metaTitle")}
              />
            </div>
          </div>
        </div>

        <div className={styles["main-top"]}>
          <div className={styles["main-top-sort"]}>
            <div className={styles["main-top-sort__text"]}>{t("sortBy")}</div>

            <div className={styles["main-top-sort-dashboard"]}>
              <div
                onClick={handleDropdown}
                className={cn(styles["main-top-sort-dashboard-item"], {
                  [styles["main-top-sort-dashboard-item--active"]]:
                    activeDropdown,
                })}
              >
                {choosenSortText}

                <div
                  className={cn(styles["main-top-sort-dashboard-item__icon"], {
                    [styles["main-top-sort-dashboard-item__icon--active"]]:
                      activeDropdown,
                  })}
                >
                  <Image
                    src={ARROW_URL}
                    width={24}
                    height={24}
                    alt={t("sortBy")}
                  />
                </div>
              </div>

              <div
                className={cn(styles["main-top-sort-dashboard-list"], {
                  [styles["main-top-sort-dashboard-list--active"]]:
                    activeDropdown,
                })}
              >
                {t("sortList", {}, { returnObjects: true }).map(
                  ({ id, text }) => {
                    return (
                      <div
                        onClick={() => handleSort(id)}
                        key={id}
                        className={cn(
                          styles["main-top-sort-dashboard-list__text"],
                          {
                            [styles[
                              "main-top-sort-dashboard-list__text--active"
                            ]]: choosenSortId === id,
                          },
                        )}
                      >
                        {text}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          <div className={styles["main-top-search"]}>
            <div className={styles["main-top-search__icon"]}>
              <Image
                src={SEARCH_URL}
                width={32}
                height={32}
                alt={t("search")}
              />
            </div>
            <input
              id="input"
              placeholder={t("search")}
              onChange={handleSearch}
            />
          </div>
          <Button
            className={styles["main-top-button"]}
            onClick={openModal}
            variant="primary"
          >
            <div className={styles["main-top-button__icon"]}>
              <Image src={ADD_URL} width={38} height={38} alt={t("addNew")} />
            </div>
            <div className={styles["main-top-button__text"]}>{t("addNew")}</div>
          </Button>
        </div>

        <div className={styles["main-content"]}>
          <div className={styles["main-content-columns"]}>
            <div className={styles["main-content-columns__avatar"]} />
            <div
              className={cn(
                styles["main-content-columns__text"],
                styles["main-content-columns__name"],
              )}
            >
              {t(`dashboardColumns.name`)}
            </div>

            <div
              className={cn(
                styles["main-content-columns__text"],
                styles["main-content-columns__surname"],
              )}
            >
              {t(`dashboardColumns.surname`)}
            </div>

            <div
              className={cn(
                styles["main-content-columns__text"],
                styles["main-content-columns__email"],
              )}
            >
              {t(`dashboardColumns.email`)}
            </div>

            <div
              className={cn(
                styles["main-content-columns__text"],
                styles["main-content-columns__age"],
              )}
            >
              {t(`dashboardColumns.age`)}
            </div>

            <div
              className={cn(
                styles["main-content-columns__text"],
                styles["main-content-columns__course"],
              )}
            >
              {t(`dashboardColumns.course`)}
            </div>

            <div
              className={cn(
                styles["main-content-columns__text"],
                styles["main-content-columns__group"],
              )}
            >
              {t(`dashboardColumns.group`)}
            </div>
            <div className={styles["main-content-columns__edit"]} />
          </div>
          <div className={styles["main-content-students"]}>
            {students?.map(
              ({ id, image, firstName, lastName, email, company, age }) => {
                return (
                  <div
                    key={id}
                    className={styles["main-content-students-item"]}
                  >
                    <div
                      className={styles["main-content-students-item__avatar"]}
                    >
                      <Image src={image} alt={id} width={80} height={80} />
                    </div>
                    <div
                      className={styles["main-content-students-item__wrapper"]}
                    >
                      <div
                        className={cn(
                          styles["main-content-students-item__text"],
                          styles["main-content-students-item__name"],
                        )}
                      >
                        <span>{t(`dashboardColumns.name`) + `: `}</span>
                        {firstName}
                      </div>

                      <div
                        className={cn(
                          styles["main-content-students-item__text"],
                          styles["main-content-students-item__surname"],
                        )}
                      >
                        <span>{t(`dashboardColumns.surname`) + `: `}</span>
                        {lastName}
                      </div>

                      <div
                        className={cn(
                          styles["main-content-students-item__text"],
                          styles["main-content-students-item__email"],
                        )}
                      >
                        <span>{t(`dashboardColumns.email`) + `: `}</span>
                        {email}
                      </div>

                      <div
                        className={cn(
                          styles["main-content-students-item__text"],
                          styles["main-content-students-item__age"],
                        )}
                      >
                        <span>{t(`dashboardColumns.age`) + `: `}</span>
                        {age}
                      </div>

                      <div
                        className={cn(
                          styles["main-content-students-item__text"],
                          styles["main-content-students-item__course"],
                        )}
                      >
                        <span>{t(`dashboardColumns.course`) + `: `}</span>
                        {company.title}
                      </div>

                      <div
                        className={cn(
                          styles["main-content-students-item__text"],
                          styles["main-content-students-item__group"],
                        )}
                      >
                        <span>{t(`dashboardColumns.group`) + `: `}</span>
                        {company.department}
                      </div>
                    </div>
                    <Link href={`/dashboard/${id}`}>
                      <div
                        className={styles["main-content-students-item__edit"]}
                      >
                        <ReactSVG src={EDIT_URL} />
                      </div>
                    </Link>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;