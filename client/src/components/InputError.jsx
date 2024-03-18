import { motion } from "framer-motion";

function InputError({ error }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className=" pl-3 text-sm text-red-500 inline-block w-full h-5 overflow-hidden select-none"
    >
      {error ? error.message : null}
    </motion.span>
  );
}

export default InputError;
