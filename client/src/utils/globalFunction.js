import { Notify } from "utils";

const calculateAge = (firstDate, lastDate) => {
  const currentDate = new Date(firstDate);
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const birthDate = new Date(lastDate);
  const birthMonth = birthDate.getMonth() + 1;
  const birthYear = birthDate.getFullYear();
  const birthDay = birthDate.getDate();

  let ageMonth = currentMonth - birthMonth;
  let ageYear = currentYear - birthYear;

  if (currentDay < birthDay) {
    ageMonth--;
  }
  if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
  }
  return ageYear * 12 + ageMonth;
};

const getAllMedicament = async (setMedicaments) => {
  try {
    const res = await fetch("/api/medicaments/", {
      method: "GET",
    });
    const data = await res.json();
    if (data.status === "success" && data.data.medicament.length > 0) {
      setMedicaments(data.data.medicament);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
const addCurveDataToDb = async (data, gender, type) => {
  try {
    const addCurveToDb = await fetch("/api/curve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, gender, type }),
    });

    const resData = await addCurveToDb.json();
    if (resData.status === "success") {
      Notify({ type: "success", message: "Data added successfully" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
const convertExcelToJson = async (excelData, gender, type) => {
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
    console.log(data);
    addCurveDataToDb(data, gender, type);
    // addCurveDataToDb(excelData);
    // if (patientHeight.data.length !== 0) {
    //   data.push(patientHeight);
    // }
    // setData(data);
  }
};
export { calculateAge, getAllMedicament, convertExcelToJson };
