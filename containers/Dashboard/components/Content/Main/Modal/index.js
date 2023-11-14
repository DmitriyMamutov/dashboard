import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { CLOSE_URL } from "config/dashboard_config";
import { ReactSVG } from "react-svg";
import Title from "components/Title";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import { FORM_LIST } from "config/login_config";

import styles from "./styles.module.scss";

const Modal = (props) => {
  const { isModalVisible, closeModal } = props;

  const { t } = useTranslation("dashboard");

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
        </div>
      </div>
    </div>
  );
};

export default Modal;
