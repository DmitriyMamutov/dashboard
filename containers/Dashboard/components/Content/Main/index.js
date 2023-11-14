"use client";

import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import {
  NOTIFICATION_URL,
  EDIT_URL,
  SEARCH_URL,
  ADD_URL,
} from "config/dashboard_config";
import Image from "next/image";
import cn from "classnames";
import Title from "components/Title";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "components/Button";
import Modal from "./Modal";

import styles from "./styles.module.scss";

const Main = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { t } = useTranslation("dashboard");

  const avatarUrl = useSelector((state) => state.user.user.avatarUrl);

  useEffect(() => {
    axios.get("https://dummyjson.com/users").then((response) => {
      console.log("response", response.data.users);

      setUsers(response.data.users);
    });
  }, []);

  const handleSearch = (e) => {
    axios
      .get(`https://dummyjson.com/users/search?q=${e.target.value}`)
      .then((response) => {
        setUsers(response.data.users);
      });
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  
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
          <div className={styles["main-top-search"]}>
            <div className={styles["main-top-search__icon"]}>
              <Image src={SEARCH_URL} width={32} height={32} />
            </div>
            <input
              id="input"
              placeholder={t("search")}
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={openModal}
            className={styles["main-top-button"]}
            variant="primary"
            width="max"
          >
            <div className={styles["main-top-button__icon"]}>
              <Image src={ADD_URL} width={38} height={38} />
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
            {users.map(
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

                    <div className={styles["main-content-students-item__edit"]}>
                      <ReactSVG src={EDIT_URL} />
                    </div>
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
