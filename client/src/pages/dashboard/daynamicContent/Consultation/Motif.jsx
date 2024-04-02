// import { SubTitle } from "components";
import { MdGroups } from "assets/icon";
import { motion } from "framer-motion";

function Motif({ data }) {
  return (
    <div className="mt-[-20px] p-4 flex gap-4 flex-wrap">
      <div className=" w-1/2 bg-lightDark  rounded-md h-[490px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <MdGroups />
            </span>
            <span>Motif</span>
          </span>
        </div>

        {(data.length && (
          <ul className="p-2 h-[440px] overflow-y-auto overflow-x-hidden">
            <li className="flex items-center justify-between text-left  bg-p bg-ph p-2 rounded-sm text-white">
              <span className="flex-1 pl-5">Motif</span>
              <span className="pr-5">Date</span>
            </li>
            {data.map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                key={index}
                className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
              >
                <span className="flex-1">
                  {index + 1} - {item.motif}
                </span>
                <span>{item.date}</span>
              </motion.li>
            ))}
          </ul>
        )) || (
          <div className="flex justify-center items-center mt-3 text-lg">
            <span>no data</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Motif;
