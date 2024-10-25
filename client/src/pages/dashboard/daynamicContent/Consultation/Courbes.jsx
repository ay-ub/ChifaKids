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
      `/api/consultations/${heightOrWeight}/${patientId}`,
      {
        method: "GET",
      }
    );
    const resData = await getPatientHeightOrWeight.json();
    if (resData.status === "success") {
      let obj = {};
      obj.id = heightOrWeight === "height" ? "Taille" : "Poids";
      obj.data = [];
      resData?.data.forEach((cell) => {
        let month = calculateAge(cell?.date, patientData.dateOfBirth);
        obj.data.push({
          x: month,
          y: heightOrWeight === "height" ? cell?.height : cell?.weight,
        });
      });
      if (obj.data.length > 0) {
        return obj;
      }
    }
  };

  useEffect(() => {
    const getCurveData = async () => {
      try {
        const getCurveRes = await fetch("/api/curve/getCurve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender: patientData.gender,
          }),
        });
        const data = await getCurveRes.json();
        if (data.status === "success") {
          if (data.data?.heightCurves.length > 0) {
            const patientHeight = await getPatientCurve("height");
            const height = data.data?.heightCurves[0].data;
            if (patientHeight?.data.length > 0) {
              setHeight([...height, patientHeight]);
            } else {
              setHeight([...height]);
            }
          } else {
            setHeight([]);
          }
          if (data.data?.weightCurves.length > 0) {
            const patientWeight = await getPatientCurve("weight");
            const weight = data.data?.weightCurves[0].data;
            if (patientWeight?.data.length > 0) {
              setWeight([...weight, patientWeight]);
            } else {
              setWeight([...weight]);
            }
          } else {
            setWeight([]);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (height.length === 0 && weight.length === 0) {
      getCurveData();
    }
  }, []);

  return (
    <>
      <div
        className='flex gap-5 items-center flex-col h-[calc(100vh-235px)] w-full overflow-y-auto 
      '
      >
        <div className='left h-[450px] bg-transparent w-full '>
          <Chart data={height} xTitle='Mois' yTitle='Taille' />
        </div>
        <div className='right h-[450px] bg-transparent w-full'>
          <Chart data={weight} xTitle='Semaine' yTitle='Poids' />
        </div>
      </div>
    </>
  );
}

export default Courbes;
