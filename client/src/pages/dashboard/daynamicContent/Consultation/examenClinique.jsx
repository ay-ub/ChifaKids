import { MdGroups, FaLaptop } from "assets/icon";
import { motion } from "framer-motion";

function ExamenClinique({ data }) {
  console.log("data", data);
  return (
    <div className=" mt-[-20px] p-4 flex gap-4 flex-wrap">
      <div className=" flex-1 bg-lightDark  rounded-md h-[440px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <MdGroups />
            </span>
            <span>General</span>
          </span>
        </div>

        {(data && (
          <ul className="py-2 px-2 h-[390px] overflow-y-auto overflow-x-hidden ">
            <li className="flex items-center justify-between bg-p bg-ph p-2 rounded-sm select-none text-white">
              <span className="flex-1 text-center ">Etat</span>
              <span className="flex-1 text-center ">Taille</span>
              <span className="flex-1 text-center ">Poids</span>
            </li>
            {data.map(
              (item, index) =>
                (item.generalCondition || item.height || item.weight) && (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                    key={index}
                    className=" flex items-center justify-between text-center  darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                  >
                    <span className="flex-1 text-center ">
                      {item.generalCondition}
                    </span>
                    <span className="flex-1 text-center ">{item.height}</span>
                    <span className="flex-1 text-center ">{item.weight}</span>
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
              <FaLaptop />
            </span>
            <span>Par appareil</span>
          </span>
        </div>

        {(data && (
          <ul className="py-2 px-2 h-[390px] overflow-y-auto overflow-x-hidden">
            <li className="flex items-center justify-between bg-p bg-ph p-2 rounded-sm select-none text-white">
              <span className="flex-1 text-center ">urogénital</span>
              <span className="flex-1 text-center ">Génital</span>
              <span className="flex-1 text-center ">Abdominal</span>
            </li>
            {data.map(
              (item, index) =>
                (item.urogenital || item.genital || item.abdominal) && (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                    key={index}
                    className=" flex items-center justify-between text-center  darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                  >
                    <span className="flex-1 text-center ">
                      {item.urogenital}
                    </span>
                    <span className="flex-1 text-center ">{item.genital}</span>
                    <span className="flex-1 text-center ">
                      {item.abdominal}
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
    </div>
  );
}

export default ExamenClinique;
