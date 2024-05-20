import { SectionTitle } from "components";
import { Bilans } from "data";
import { Button } from "@/components/ui/button";

function Bilan() {
  return (
    <div className="Bilan">
      <SectionTitle title="Bilan" />
      <div className="flex bilanTitle justify-center mt-5 text-4xl p-2 rounded-md bg-p text-white">
        Bilan à faire
      </div>
      <div className="BilanModel mt-5 px-2 py-[100px] flex justify-center items-start  gap-14 flex-wrap border rounded-md">
        {Bilans.map((bilan, i) => {
          return (
            <div key={i} className="flex flex-col items-start gap-4">
              {bilan.map((item, j) => (
                <div key={j} className=" flex-1 flex items-center space-x-2">
                  <input type="checkbox" id={`${i}${j}`} className="w-5 h-5" />
                  <label
                    htmlFor={`${i}${j}`}
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-nowrap"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-7 impr">
        <Button
          onClick={() => {
            window.print();
          }}
        >
          Imprimer
        </Button>
      </div>
    </div>
  );
}

export default Bilan;
