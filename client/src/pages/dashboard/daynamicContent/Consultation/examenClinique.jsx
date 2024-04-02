import { MdGroups, FaLaptop } from "assets/icon";
import { motion } from "framer-motion";

function ExamenClinique({ data }) {
  console.log("data", data);
  return (
    <div className=" mt-[-20px] p-4 flex gap-4 flex-wrap">
      <div className=" flex-1 bg-lightDark  rounded-md h-[490px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <MdGroups />
            </span>
            <span>General</span>
          </span>
        </div>

        {(data && (
          <ul className="py-2 px-2 h-[440px] overflow-y-auto overflow-x-hidden">
            <li className="flex items-center justify-between bg-p bg-ph p-2 rounded-sm select-none text-white">
              <span className="flex-1 text-center ">Etat</span>
              <span className="flex-1 text-center ">Taille</span>
              <span className="flex-1 text-center ">Poids</span>
              <span className="flex-1 text-center ">date</span>
            </li>
            {data.map((item, index) => (
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
                <span className="flex-1 text-center ">{item.date}</span>
              </motion.li>
            ))}
          </ul>
        )) || (
          <div className="flex justify-center items-center h-[50px] text-lg">
            Aucun donner trouvé!
          </div>
        )}
      </div>
      <div className=" flex-1 bg-lightDark  rounded-md h-[490px]">
        <div className="flex items-center  text-2xl bg-p rounded-md p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <FaLaptop />
            </span>
            <span>Par appareil</span>
          </span>
        </div>

        {/* <ul className="py-4 px-8 h-[470px] overflow-y-auto">
          <li className="flex items-center justify-between">
            <span>Etat</span>
            <span>Taille</span>
            <span>Poids</span>
            <span>Pression</span>
            <span>date</span>
          </li>
          <li className="flex items-center justify-between text-center">
            <span>etat 1</span>
            <span>1.85</span>
            <span>75</span>
            <span>08-14</span>
            <span>16-12-2021</span>
          </li>
          <li className="flex items-center justify-between text-center">
            <span>etat 1</span>
            <span>1.85</span>
            <span>75</span>
            <span>08-14</span>
            <span>16-12-2021</span>
          </li>
          <li className="flex items-center justify-between text-center">
            <span>etat 1</span>
            <span>1.85</span>
            <span>75</span>
            <span>08-14</span>
            <span>16-12-2021</span>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

export default ExamenClinique;
