import { FaDna, FaXRay } from "assets/icon";
import { motion } from "framer-motion";
function ExmnParaClinique({ data }) {
  return (
    <div className=" mt-[-20px] p-4 flex gap-4 flex-wrap">
      <div className=" flex-1 bg-lightDark  rounded-md h-[440px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <FaDna />
            </span>
            <span>Biologie</span>
          </span>
        </div>

        {(data && (
          <ul className="py-2 px-2 h-[390px] overflow-y-auto overflow-x-hidden ">
            <li className="flex items-center justify-between bg-p bg-ph p-2 rounded-sm select-none text-white">
              <span className="flex-1 text-center ">Glycemie</span>
              <span className="flex-1 text-center ">Urée</span>
              <span className="flex-1 text-center ">Créa</span>
              <span className="flex-1 text-center ">CRP</span>
              <span className="flex-1 text-center ">FNS</span>
              <span className="flex-1 text-center ">Autres</span>
            </li>
            {data.map(
              (item, index) =>
                (item.glycemie ||
                  item.urea ||
                  item.creatine ||
                  item.crp ||
                  item.fns ||
                  item.biologyOther) && (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                    key={index}
                    className=" flex items-center justify-between text-center  darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                  >
                    <span className="flex-1 text-center ">{item.glycemie}</span>
                    <span className="flex-1 text-center ">{item.urea}</span>
                    <span className="flex-1 text-center ">{item.creatine}</span>
                    <span className="flex-1 text-center ">{item.crp}</span>
                    <span className="flex-1 text-center ">{item.fns}</span>
                    <span className="flex-1 text-center ">
                      {item.biologyOther}
                    </span>
                  </motion.li>
                )
            )}
          </ul>
        )) || (
          <div className="flex justify-center items-center h-[50px] text-lg">
            Aucun donner trouvé!
          </div>
        )}
      </div>
      <div className=" flex-1 bg-lightDark  rounded-md h-[440px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <FaXRay />
            </span>
            <span>Radiologie</span>
          </span>
        </div>

        {(data && (
          <ul className="py-2 px-2 h-[390px] overflow-y-auto overflow-x-hidden">
            <li className="flex items-center justify-between bg-p bg-ph p-2 rounded-sm select-none text-white">
              <span className="flex-1 text-center ">Echographie</span>
              <span className="flex-1 text-center ">TDM</span>
              <span className="flex-1 text-center ">IRM</span>
            </li>
            {data.map(
              (item, index) =>
                (item.echographie || item.tdm || item.irm) && (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                    key={index}
                    className=" flex items-center justify-between text-center  darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                  >
                    <span className="flex-1 text-center ">
                      {item.ultrasound}
                    </span>
                    <span className="flex-1 text-center ">{item.tdm}</span>
                    <span className="flex-1 text-center ">{item.irm}</span>
                  </motion.li>
                )
            )}
          </ul>
        )) || (
          <div className="flex justify-center items-center h-[50px] text-lg">
            Aucun donner trouvé!
          </div>
        )}
      </div>
    </div>
  );
}

export default ExmnParaClinique;
