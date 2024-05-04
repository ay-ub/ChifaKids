import { useContext } from "react";
import { ConsultationContext } from "context";
function useConsultation() {
  return useContext(ConsultationContext);
}

export default useConsultation;
