import handleTheme from "./handleTheme";
import handleSideBar from "./handleSideBar";
import Notify from "./Notify";
import { readFile, writeFile } from "./excelFileHandle";
import { getPatients, handleWaitingRom } from "./waitingRom";
import calculateAge from "./globalFunction";

export {
  handleTheme,
  handleSideBar,
  Notify,
  readFile,
  writeFile,
  handleWaitingRom,
  getPatients,
  calculateAge,
};
