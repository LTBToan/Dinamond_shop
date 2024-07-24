import React, { useRef } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "../css/certificate.module.css";
import warrant from "../assets/img/warranty.png";

const Certificate = ({
  warrantyId,
  name,
  course,
  dateOfConductStart,
  dateOfConductEnd,
}) => {
  const certificateRef = useRef();

  const downloadPDF = () => {
    const input = certificateRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className={styles.certificateWrapper}>
      <div className={styles.certificateContainer} ref={certificateRef}>
        <h1>CERTIFICATE WARRANTY</h1>
        <p className={styles.primaryItalicText}>{name}</p>
        <h3>Model No: {course}</h3>
        <h3>Serial No: {warrantyId}</h3>
        <span className={styles.smallText}>
          We hereby guarantee and warrant all products owned. For the period
          time the product is in possession of the owner, Diamond Shop will
          repair and replace defective components at no additional charge to the
          product owner.
        </span>
        <span className={styles.smallText}>{`conducted from ${
          dateOfConductStart
            ? moment(dateOfConductStart).format("MMMM YYYY")
            : "-"
        } to ${
          dateOfConductEnd ? moment(dateOfConductEnd).format("MMMM YYYY") : "-"
        }`}</span>
        <div className={styles.signatureBlock}>
          <img
            className={styles.signatureImage}
            src="https://t4.ftcdn.net/jpg/00/00/42/95/360_F_429547_YJTlwk2Ld5kYDAbtCUwFgzmatgUHEg.jpg"
            alt="Signature"
          />
          <img className={styles.signatureImage} src={warrant} alt="Warranty" />
        </div>
        <span style={{ marginRight: "400px" }}>Diamond Shop, Le Toan</span>
      </div>
      <button style={{ marginTop: "3rem" }} onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;
