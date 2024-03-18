const getPatientData = async (id, setPatientData) => {
  const res = await fetch(`http://localhost:3000/patients/${id}`);
  const patientData = await res.json();
  if (patientData.status === "success") {
    setPatientData(patientData.data.patient);
  }
};

export { getPatientData };
