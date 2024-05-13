const getConsultationData = async (setConsultationData, patientId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/consultations/${patientId}`,
      {
        method: "GET",
      }
    );
    const resData = await res.json();
    if (resData.status === "success") {
      setConsultationData(resData.data);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getPatientData = async (setPatientData, patientId) => {
  try {
    const res = await fetch(`http://localhost:3000/patients/${patientId}`, {
      method: "GET",
    });
    const resData = await res.json();
    if (resData.data.patient) {
      setPatientData(resData.data.patient);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const addCurveDataToDb = async (data) => {
  try {
    const res = await fetch(`http://localhost:3000/curve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.status === "success") {
      console.log("Data added successfully");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const convertExcelToJson = (excelData, setData, patientHeight) => {
  if (excelData) {
    const headers = [
      { title: "SD3neg" },
      { title: "SD2neg" },
      { title: "SD0" },
      { title: "SD2" },
      { title: "SD3" },
    ];
    let data = [];
    excelData[0].forEach((cell, indexRow) => {
      if (headers.find((header) => header.title === cell)) {
        let obj = {};
        obj.id = cell;
        obj.data = [];
        for (let i = 0; i < excelData.length - 1; i++) {
          obj.data.push({
            x: i,
            y: excelData[i + 1][indexRow],
          });
        }
        data.push(obj);
      }
    });

    setData(data);
  }
};

const getOrdonnanceByPatientId = async (patientId, setData, selectedDate) => {
  try {
    const response = await fetch(
      `http://localhost:3000/ordonnance/patient/${patientId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDate),
      }
    );
    const newResponse = await response.json();
    if (newResponse.status === "success") {
      console.log(newResponse.data);
      setData(newResponse.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export {
  getConsultationData,
  getPatientData,
  addCurveDataToDb,
  convertExcelToJson,
  getOrdonnanceByPatientId,
};
