const getMedicament = async (id, setMedicament) => {
  try {
    const response = await fetch(`http://localhost:3000/medicaments/${id}`);
    const data = await response.json();

    if (data.status === "success") {
      const { medicament } = data.data;
      setMedicament(medicament);
    }
  } catch (error) {
    console.log(error);
  }
};

export { getMedicament };
