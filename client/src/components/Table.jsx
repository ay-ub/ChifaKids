import { motion } from "framer-motion";
import { tbodyVarient } from "data";

function Table({ data, dataList, headers }) {
  return (
    <div className="dataTable w-[100%] mt-2">
      {(data.length > 0 && (
        <motion.table
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="patient-table"
        >
          <thead>
            <tr>
              {headers.map((header, index) => {
                return (
                  <th className="text-nowrap" key={index}>
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <motion.tbody variants={tbodyVarient} animate="visible">
            {dataList}
          </motion.tbody>
        </motion.table>
      )) || (
        <div className="flex justify-center items-center h-[100px] text-lg">
          Aucun information trouvé!
        </div>
      )}
    </div>
  );
}

export default Table;
