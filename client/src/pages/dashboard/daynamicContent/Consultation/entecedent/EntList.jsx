import { motion } from "framer-motion";
import { Alert } from "components";
import { AiOutlineDelete } from "assets/icon";

function EntList({
  entecedentData,
  handleKeyDown,
  deleteEntecedent,
  entecedentType,
  setTemp,
}) {
  return (
    <ul className="p-2 pb-0 h-[480px] overflow-y-auto overflow-x-hidden">
      {entecedentData
        .filter((entecedent) => {
          return entecedent.type === entecedentType;
        })
        .map((entecedent, index) => (
          <motion.li
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={({ duration: 0.3 }, { delay: 0.1 * index })}
            key={entecedent.id}
            className="flex items-start justify-between darkBg p-2 rounded-sm mt-1 select-none hover:text-white cursor-text"
          >
            <span
              className="text-[18px] flex-1"
              onDoubleClick={(event) => {
                setTemp(entecedent.name);
                event.target.contentEditable = true;
                event.target.focus();
              }}
              onKeyDown={(event) => handleKeyDown(event, entecedent)}
            >
              {entecedent.name}
            </span>
            <Alert
              title="Voulez-vous vraiment supprimer ce entecedent ?"
              btnFun={() => {
                deleteEntecedent(entecedent.id);
              }}
              description="Cette action ne peut pas être annulée. "
              confirmBtn="Oui, Supprimer"
            >
              <span className="text-red-400 select-none text-2xl">
                <AiOutlineDelete />
              </span>
            </Alert>
          </motion.li>
        ))}
    </ul>
  );
}

export default EntList;
