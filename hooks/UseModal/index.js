import { useState, useEffect } from "react";

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      return () => {
        document.body.style.overflow = "visible";
      };
    }
  }, [isModalVisible]);

  return { isModalVisible, showModal, closeModal };
};

export default useModal;
