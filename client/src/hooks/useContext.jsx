import { useContext } from "react";
import { globalContext } from "context";
const useContxt = () => {
  return useContext(globalContext);
};

export default useContxt;
