import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import GIA from "../assets/img/gia.jpg";

const CustomGIAReport = () => {
  const [formData, setFormData] = useState({
    reportNumber: "",
    caratWeight: "",
    colorGrade: "",
    clarityGrade: "",
    cutGrade: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("customized_gia_report.pdf");
    });
  };

  return (
    <div>
      <h2>Enter New GIA Report Information</h2>
      <form>
        <div>
          <label>GIA Report Number:</label>
          <input
            type="text"
            name="reportNumber"
            value={formData.reportNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Carat Weight:</label>
          <input
            type="text"
            name="caratWeight"
            value={formData.caratWeight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color Grade:</label>
          <input
            type="text"
            name="colorGrade"
            value={formData.colorGrade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Clarity Grade:</label>
          <input
            type="text"
            name="clarityGrade"
            value={formData.clarityGrade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cut Grade:</label>
          <input
            type="text"
            name="cutGrade"
            value={formData.cutGrade}
            onChange={handleChange}
          />
        </div>
      </form>
      <div
        id="pdf-content"
        style={{ marginTop: 20, position: "relative", width: "800px" }}
      >
        <img src={GIA} alt="GIA Report" style={{ width: "100%" }} />
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "450px",
            color: "black",
          }}
        >
          {formData.reportNumber}
        </div>
        <div
          style={{
            position: "absolute",
            top: "195px",
            left: "210px",
            color: "black",
            fontSize: "10px",
          }}
        >
          {formData.caratWeight}
        </div>
        <div
          style={{
            position: "absolute",
            top: "210px",
            left: "240px",
            color: "black",
            fontSize: "10px",
          }}
        >
          {formData.colorGrade}
        </div>
        <div
          style={{
            position: "absolute",
            top: "225px",
            left: "230px",
            color: "black",
            fontSize: "10px",
          }}
        >
          {formData.clarityGrade}
        </div>
        {/* <div
          style={{
            position: "absolute",
            top: "250px",
            left: "200px",
            color: "black",
            fontSize: "10px"
          }}
        >
          {formData.cutGrade}
        </div> */}
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default CustomGIAReport;
