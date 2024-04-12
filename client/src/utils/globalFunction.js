import { Notify } from "utils";

// const calculateAge = (date) => {
//   const today = new Date();
//   const birthDate = new Date(date);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const month = today.getMonth() - birthDate.getMonth();
//   if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
//     age--;
//   return age;
// };
const calculateAge = (date) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const birthDate = new Date(date);
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
  return ageYear * 12 + ageMonth + " Mois";
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
