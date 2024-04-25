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
    const res = await fetch("http://localhost:3000/medicaments/", {
      method: "GET",
    });
    const data = await res.json();
    if (data.status === "success" && data.data.medicament.length > 0) {
      setMedicaments(data.data.medicament);
    }
  } catch (error) {
    Notify({ type: "error", message: "J’ai pas eu de médicaments." });
  }
};

export { calculateAge, getAllMedicament };
