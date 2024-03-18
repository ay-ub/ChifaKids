import {
  MdGroups,
  FaSackDollar,
  FaChartLine,
  FaStethoscope,
  FaBriefcaseMedical,
  FaUserClock,
  IoMdSettings,
} from "assets/icon/index";

const SideLinkData = [
  {
    name: "Patient",
    path: "/dashboard/patietns",
    icon: MdGroups,
    permission: ["ADMIN", "DOCTOR", "NURSE"],
  },
  {
    name: "Salle D'attente",
    path: "/dashboard/waiting",
    icon: FaUserClock,
    permission: ["ADMIN", "DOCTOR", "NURSE"],
  },
  {
    name: "consultation",
    path: "/dashboard/consultation",
    icon: FaStethoscope,
    permission: ["ADMIN", "DOCTOR"],
  },
  {
    name: "Règlement",
    path: "/dashboard/payments",
    icon: FaSackDollar,
    permission: ["ADMIN", "DOCTOR", "NURSE"],
  },
  {
    name: "médicament",
    path: "/dashboard/medicament",
    icon: FaBriefcaseMedical,
    permission: ["ADMIN", "DOCTOR"],
  },
  {
    name: "Statistiques",
    path: "/dashboard/statistics",
    icon: FaChartLine,
    permission: ["ADMIN"],
  },
  {
    name: "Settings",
    path: "/dashboard/Settings",
    icon: IoMdSettings,
    permission: ["ADMIN"],
  },
];
export default SideLinkData;
