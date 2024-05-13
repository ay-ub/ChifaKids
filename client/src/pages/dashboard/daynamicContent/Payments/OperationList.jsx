import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

function OperationList({ totalPrice, setTotalPrice }) {
  const [acts, setActs] = useState([]);
  useEffect(() => {
    const getActs = async () => {
      try {
        const response = await fetch("http://localhost:3000/service/");
        const data = await response.json();
        console.log(data);
        if (data.status === "success" && data?.data.length > 0) {
          setActs(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getActs();
  }, []);
  return (
    <>
      <ul className="pb-0 ">
        <ScrollArea className="h-[460px]  rounded-md border p-2 pb-0">
          {acts.map((operation, index) => (
            <motion.li
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              key={index}
              className="flex items-start justify-between darkBg p-2 rounded-sm mt-1 select-none cursor-text"
            >
              <span className="flex-1 flex items-center  text-left text-ellipsis text-nowrap">
                <Checkbox
                  id={index}
                  className="w-5 h-5"
                  onCheckedChange={(event) => {
                    if (event) {
                      setTotalPrice((prev) => prev + operation.price);
                    } else {
                      setTotalPrice((prev) => prev - operation.price);
                    }
                  }}
                />
                <label htmlFor={index} className="px-3 flex-1">
                  {operation.name}
                </label>
              </span>
              <span className="flex-1 text-center text-ellipsis text-nowrap">
                {operation.price} DA
              </span>
            </motion.li>
          ))}
        </ScrollArea>
        <motion.li
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex text-white items-centers justify-between bg-p p-2 rounded-sm mt-1 select-none cursor-text"
        >
          <span className="flex-1  text-left text-ellipsis text-nowrap px-11">
            Total :
          </span>
          <span className="flex-1  text-center text-ellipsis text-nowrap">
            {totalPrice} DA
          </span>
        </motion.li>
      </ul>
    </>
  );
}

export default OperationList;
