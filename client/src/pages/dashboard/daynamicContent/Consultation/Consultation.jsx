import { SectionTitle, NavBar, Chart } from "components";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { readFile } from "utils";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function Consultation() {
  const [excelData, setExcelData] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (excelData) {
      const headers = [
        { title: "SD3neg" },
        { title: "SD2neg" },
        { title: "SD0" },
        { title: "SD2" },
        { title: "SD3" },
      ];
      console.log(excelData);
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
          console.log("OBJ: ", obj.color);
          data.push(obj);
        }
      });
      setData(data);
      console.log("REsult: ", data);
    }
  }, [excelData]);

  return (
    <div className="Consultation ">
      <SectionTitle title="Consultation" />
      <Tabs defaultValue="Antécédents" className="w-full  mt-7 ">
        <NavBar />
        <TabsContent value="Antécédents">FROM 1</TabsContent>
        <TabsContent value="Consultation">from 2</TabsContent>
        <TabsContent value="Ordonnance">FROM 3</TabsContent>
        <TabsContent value="Compte">FROM 4</TabsContent>
        <TabsContent value="Certificat">FROM 5</TabsContent>
        <TabsContent value="Courbes">
          <div className="flex gap-4 items-center ">
            <div className="left h-[450px] bg-transparent w-1/2">
              <Chart data={data} />
            </div>
            <div className="right h-[450px] bg-transparent w-1/2">
              <Chart data={data} />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Consultation;
