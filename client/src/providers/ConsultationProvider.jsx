import { useState } from "react";
import { ConsultationContext } from "context";

const ConsultationProvider = ({ children }) => {
  const [patientData, setPatientData] = useState();
  const [consultationData, setConsultationData] = useState([]);
  const [consultationId, setConsultationId] = useState();
  const [selectedDate, setSelectedDate] = useState({ from: "", to: "" });
  return (
    <ConsultationContext.Provider
      value={{
        patientData,
        setPatientData,
        consultationData,
        setConsultationData,
        consultationId,
        setConsultationId,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export default ConsultationProvider;
