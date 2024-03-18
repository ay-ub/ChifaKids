import { useContext } from "react";
import { themeContext } from "context";

function useTheme() {
  return useContext(themeContext);
}

export default useTheme;
