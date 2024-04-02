import { Chart } from "components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { readFile } from "utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Courbes() {
  const [excelData, setExcelData] = useState();
  const [data, setData] = useState([]);
  const { patientId } = useParams();

  const [patientHeight, setpatientHeight] = useState(null);

  useEffect(() => {
    const getPatientHeight = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/consultations/height/${patientId}`,
          {
            method: "GET",
          }
        );
        const resData = await res.json();

        if (resData.status === "success") {
          let obj = {};
          obj.id = "Height";
          obj.data = [];
          resData.data.forEach((cell) => {
            obj.data.push({
              x: cell.month,
              y: cell.height,
            });
          });
          setpatientHeight(obj);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getPatientHeight();
  }, [patientId]);
  useEffect(() => {
    if (excelData) {
      const headers = [
        { title: "SD3neg" },
        { title: "SD2neg" },
        { title: "SD0" },
        { title: "SD2" },
        { title: "SD3" },
      ];
      let data = [];
      excelData[0].forEach((cell, indexRow) => {
        if (headers.find((header) => header.title === cell)) {
          let obj = {};
          obj.id = cell;
          obj.data = [];
          for (let i = 0; i < excelData.length - 1; i++) {
            obj.data.push({
              x: i,
              y: excelData[i + 1][indexRow],
            });
          }
          data.push(obj);
        }
      });
      if (patientHeight.data.length !== 0) {
        data.push(patientHeight);
      }
      setData(data);
    }
  }, [excelData, patientHeight]);
  return (
    <>
      <div className="flex gap-4 items-center ">
        <div className="left h-[450px] bg-transparent w-1/2">
          <Chart data={data} xTitle="MOIS" yTitle="TAILLE" />
        </div>
        <div className="right h-[450px] bg-transparent w-1/2">
          {/* <Chart data={data} xTitle="month" yTitle="weight" /> */}
        </div>
      </div>
      <div className="flex items-center w-full max-w-sm gap-1.5">
        <Label htmlFor="picture" className="text-nowrap">
          Select File :
        </Label>
        <Input
          id="picture"
          type="file"
          onChange={(e) => {
            readFile(e, setExcelData);
          }}
        />
      </div>
    </>
  );
}

export default Courbes;
