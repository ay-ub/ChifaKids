import { Chart } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateAge } from "utils";

function Courbes({ patientData }) {
  const [height, setHeight] = useState([]);
  const [weight, setWeight] = useState([]);
  const { patientId } = useParams();

  const getPatientCurve = async (heightOrWeight) => {
    const getPatientHeightOrWeight = await fetch(
      `http://localhost:3000/consultations/${heightOrWeight}/${patientId}`,
      {
        method: "GET",
      }
    );
    const resData = await getPatientHeightOrWeight.json();

    if (resData.status === "success") {
      let obj = {};
      obj.id = heightOrWeight === "height" ? "Taille" : "Poids";
      obj.data = [];
      console.log("patientdata", patientData);
      resData.data.forEach((cell) => {
        let month = calculateAge(cell.date, patientData.dateOfBirth);
        // console.log(cell.date);
        // let month = calculateAge(new Date(), "2021-09-01");
        console.log("month: ", month);
        obj.data.push({
          x: month,
          y: heightOrWeight === "height" ? cell.height : cell.weight,
        });
      });
      console.log("heightOrWeight: ", heightOrWeight);
      console.log("obj: ", obj);
      if (obj.data.length > 0) {
        return obj;
      }
    }
  };

  useEffect(() => {
    const getCurveData = async () => {
      try {
        const getCurveRes = await fetch(
          "http://localhost:3000/curve/getCurve",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gender: patientData.gender,
            }),
          }
        );
        const data = await getCurveRes.json();
        if (data.status === "success") {
          const patientHeigh = await getPatientCurve("height");
          const patientWeight = await getPatientCurve("weight");
          const curveHeight = data.data?.heightCurves[0].data;
          const curveWeight = data.data?.weightCurves[0].data;
          if (patientHeigh) {
            setHeight([...curveHeight, patientHeigh]);
          } else {
            setHeight([...curveHeight]);
          }
          if (patientWeight) {
            setWeight([...curveWeight, patientWeight]);
          } else {
            setWeight([...curveWeight]);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getCurveData();
  }, []);

  return (
    <>
      <div className="flex gap-4 items-center ">
        <div className="left h-[450px] bg-transparent w-1/2">
          <Chart data={height} xTitle="Mois" yTitle="Taille" />
        </div>
        <div className="right h-[450px] bg-transparent w-1/2">
          <Chart data={weight} xTitle="Mois" yTitle="poids" />
        </div>
      </div>
    </>
  );
}

export default Courbes;
