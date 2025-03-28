import {
  MdGroups,
  FaSackDollar,
  FaChartLine,
  FaBriefcaseMedical,
  FaUserClock,
  IoMdSettings,
  FaMicroscope,
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
    name: "Bilan",
    path: "/dashboard/bilan",
    icon: FaMicroscope,
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
    name: "paramètres",
    path: "/dashboard/Settings",
    icon: IoMdSettings,
    permission: ["ADMIN"],
  },
];
export default SideLinkData;
