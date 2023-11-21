"use client";

import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { ADD_URL } from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "components/Button";
import {
  getStudents,
  sortStudentsZa,
  sortStudentsAz,
  sortStudentsAgeYoungest,
  sortStudentsAgeOldest,
  sortStudentsDefault,
} from "redux/reducers/students";
import Modal from "./Modal";
import Header from "./Header";
import Search from "./Search";
import Sort from "./Sort";
import Item from "./Item";

import { storageStudents } from "utils/constants";

import styles from "./styles.module.scss";

const Main = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [choosenSortId, setChoosenSortId] = useState("s5");

  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();

  const avatarUrl = useSelector((state) => state.user.user.avatarUrl);
  const studentsSelector = useSelector((state) => state.students.students);

  useEffect(() => {
    if (storageStudents.students.length === 0) {
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

  const students = studentsSelector.filter(
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
        : company.title.toLowerCase().includes(query.toLowerCase())
        ? company.title
        : company.department.toLowerCase().includes(query.toLowerCase()) &&
          company.department;
    },
  );

  return (
    <>
      <Modal closeModal={closeModal} isModalVisible={isModalVisible} />
      <div className={styles["main"]}>
        <Header avatarUrl={avatarUrl} />
        <div className={styles["main-top"]}>
          <Sort
            handleDropdown={handleDropdown}
            activeDropdown={activeDropdown}
            choosenSortText={choosenSortText}
            choosenSortId={choosenSortId}
            handleSort={handleSort}
          />
          <Search handleSearch={handleSearch} />

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
                  <Item
                    key={id}
                    id={id}
                    image={image}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    age={age}
                    company={company}
                  />
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
