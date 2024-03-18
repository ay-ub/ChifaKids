import * as XLSX from "xlsx";

const readFile = (e, setExcelData) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const binaryString = event.target.result;
    const workbook = XLSX.read(binaryString, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    setExcelData(data);
  };

  reader.readAsBinaryString(file);
};

const writeFile = (data, fileName) => {
  if (data.length === 0) {
    return;
  }
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export { readFile, writeFile };
