import { useReducer, useState } from "react";

import styles from "../css/certificate.module.css";
import Modal from "./Modal";
import Certificate from "./Certificate";

const initialState = {
  name: "Rohit Jangid",
  course: "Data Structure and Algorithm using JavaScript",
  dateOfConductStart: "2020-05-20",
  dateOfConductEnd: "2023-05-20",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TEXT_CHANGE":
      return { ...state, [action.field]: action.payload };

    default:
      break;
  }
};

const CertificateGenerator = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, course, dateOfConductStart, dateOfConductEnd } = formState;

    if (name && course && dateOfConductStart && dateOfConductEnd) {
      setIsOpenModal(true);
    } else {
      alert("Please fill all details");
    }
  };

  const handleTextChange = (e) => {
    dispatch({
      type: "TEXT_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form onSubmit={handleSubmitForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="user-name">Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleTextChange}
                id="user-name"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="course">Course</label>
              <input
                type="text"
                name="course"
                value={formState.course}
                onChange={handleTextChange}
                id="course"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="dateOfConductStart">
                Date of Conduct - Start
              </label>
              <input
                type="date"
                value={formState.dateOfConductStart}
                onChange={handleTextChange}
                name="dateOfConductStart"
                id="dateOfConductStart"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="dateOfConductEnd">Date of Conduct - End</label>
              <input
                type="date"
                value={formState.dateOfConductEnd}
                onChange={handleTextChange}
                name="dateOfConductEnd"
                id="dateOfConductEnd"
              />
            </div>

            <button type="submit">Generate Certificate</button>
          </form>
        </div>
      </div>

      <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
        <Certificate {...formState} />
      </Modal>
    </>
  );
};

export default CertificateGenerator;
