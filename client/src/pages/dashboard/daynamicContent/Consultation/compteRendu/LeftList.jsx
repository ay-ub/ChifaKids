import { motion } from "framer-motion";
import { CiCalendarDate } from "assets/icon";
function LeftList() {
  return (
    <div className="flex-1 bg-lightDark  rounded-md h-[420px]">
      <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
        <span className="flex flex-1 gap-2 items-center justify-center">
          <span className="icon">
            <CiCalendarDate />
          </span>
          <span>Compte Rendu</span>
        </span>
      </div>
      <ul className="p-2 h-[370px] overflow-y-auto overflow-x-hidden">
        {/* {data.map(
            (item, index) =>
              item.motif && ( */}
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 1
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 2
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 3
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 4
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 5
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 6
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 7
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 8
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 9
          </span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          // key={index}
          className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
        >
          <span className="flex-1">
            {/* {index + 1} - {item.motif} */}
            compte Rendu 10
          </span>
        </motion.li>
        {/* )
          ) */}
        {/* } */}
      </ul>
    </div>
  );
}

export default LeftList;
