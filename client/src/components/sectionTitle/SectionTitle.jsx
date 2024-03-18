import "./sectionTitle.css";
import { motion } from "framer-motion";
// eslint-disable-next-line react/prop-types
function SectionTitle({ title }) {
  return (
    <motion.h2
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="pageTitle"
    >
      {title}
    </motion.h2>
  );
}

export default SectionTitle;
