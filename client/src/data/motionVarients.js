const tbodyVarient = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0 },
};
export { tbodyVarient, container, item };
