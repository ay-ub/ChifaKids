const patients = [
  {
    firstName: "Ahmed",
    lastName: "Bensalah",
    gender: "MALE",
    dateOfBirth: "2022-11-15",
    numberPhone: "0654891234",
    parent: "Fatima",
  },
  {
    firstName: "Karim",
    lastName: "Meziane",
    gender: "MALE",
    dateOfBirth: "2023-03-22",
    numberPhone: "0754612387",
    parent: "Amina",
  },
  {
    firstName: "Sofiane",
    lastName: "Hadj Youcef",
    gender: "MALE",
    dateOfBirth: "2023-01-10",
    numberPhone: "0554623789",
    parent: "Yasmine",
  },
  {
    firstName: "Yacine",
    lastName: "Benmoussa",
    gender: "MALE",
    dateOfBirth: "2022-08-05",
    numberPhone: "0754938765",
    parent: "Nour",
  },
  {
    firstName: "Rachid",
    lastName: "Kacem",
    gender: "MALE",
    dateOfBirth: "2023-05-18",
    numberPhone: "0654987345",
    parent: "Laila",
  },
  {
    firstName: "Fatima",
    lastName: "Touati",
    gender: "FEMALE",
    dateOfBirth: "2022-09-30",
    numberPhone: "0654623789",
    parent: "Tahar",
  },
  {
    firstName: "Nadia",
    lastName: "Benziane",
    gender: "FEMALE",
    dateOfBirth: "2023-04-14",
    numberPhone: "0754612378",
    parent: "Abdelkader",
  },
  {
    firstName: "Samira",
    lastName: "Hamzaoui",
    gender: "FEMALE",
    dateOfBirth: "2023-06-23",
    numberPhone: "0554876123",
    parent: "Rachid",
  },
  {
    firstName: "Khadija",
    lastName: "Mokhtari",
    gender: "FEMALE",
    dateOfBirth: "2022-10-11",
    numberPhone: "0654723987",
    parent: "Hakim",
  },
  {
    firstName: "Zahra",
    lastName: "Belhadj",
    gender: "FEMALE",
    dateOfBirth: "2023-02-19",
    numberPhone: "0554962378",
    parent: "Mohamed",
  },
  {
    firstName: "Mohamed",
    lastName: "Djebbour",
    gender: "MALE",
    dateOfBirth: "2022-12-20",
    numberPhone: "0654237890",
    parent: "Khadija",
  },
  {
    firstName: "Farid",
    lastName: "Saadi",
    gender: "MALE",
    dateOfBirth: "2023-01-29",
    numberPhone: "0754789234",
    parent: "Samira",
  },
  {
    firstName: "Abdelkader",
    lastName: "Zemirli",
    gender: "MALE",
    dateOfBirth: "2022-11-07",
    numberPhone: "0654897123",
    parent: "Zahra",
  },
  {
    firstName: "Hakim",
    lastName: "Khelladi",
    gender: "MALE",
    dateOfBirth: "2023-04-03",
    numberPhone: "0554234876",
    parent: "Fatima",
  },
  {
    firstName: "Amina",
    lastName: "Belkacem",
    gender: "FEMALE",
    dateOfBirth: "2022-07-26",
    numberPhone: "0754123897",
    parent: "Ahmed",
  },
  {
    firstName: "Nour",
    lastName: "Lazreg",
    gender: "FEMALE",
    dateOfBirth: "2023-05-07",
    numberPhone: "0654971238",
    parent: "Yacine",
  },
  {
    firstName: "Yasmine",
    lastName: "Medjahed",
    gender: "FEMALE",
    dateOfBirth: "2022-12-05",
    numberPhone: "0754389127",
    parent: "Karim",
  },
  {
    firstName: "Tahar",
    lastName: "Chabane",
    gender: "MALE",
    dateOfBirth: "2023-02-28",
    numberPhone: "0554879123",
    parent: "Nadia",
  },
  {
    firstName: "Laila",
    lastName: "Messaoudi",
    gender: "FEMALE",
    dateOfBirth: "2023-06-12",
    numberPhone: "0654327891",
    parent: "Rachid",
  },
  {
    firstName: "Siham",
    lastName: "Ait Ahmed",
    gender: "FEMALE",
    dateOfBirth: "2022-08-30",
    numberPhone: "0554712389",
    parent: "Farid",
  },
];

const medicaments = [
  {
    name: "Amoxicillin",
    type: "Liquid",
    dosage: "250mg",
  },
  {
    name: "Ibuprofen",
    type: "Tablet",
    dosage: "100mg",
  },
  {
    name: "Paracetamol",
    type: "Liquid",
    dosage: "120mg",
  },
  {
    name: "Cetirizine",
    type: "Tablet",
    dosage: "5mg",
  },
  {
    name: "Dextromethorphan",
    type: "Liquid",
    dosage: "15mg",
  },
  {
    name: "Hydrocortisone",
    type: "Cream",
    dosage: "1g",
  },
  {
    name: "Azithromycin",
    type: "Tablet",
    dosage: "250mg",
  },
  {
    name: "Acetaminophen",
    type: "Liquid",
    dosage: "160mg",
  },
  {
    name: "Mupirocin",
    type: "Cream",
    dosage: "2g",
  },
  {
    name: "Prednisolone",
    type: "Liquid",
    dosage: "15mg",
  },
  {
    name: "Clarithromycin",
    type: "Tablet",
    dosage: "250mg",
  },
  {
    name: "Montelukast",
    type: "Tablet",
    dosage: "4mg",
  },
  {
    name: "Erythromycin",
    type: "Tablet",
    dosage: "250mg",
  },
  {
    name: "Clindamycin",
    type: "Liquid",
    dosage: "75mg",
  },
  {
    name: "Salbutamol",
    type: "Liquid",
    dosage: "2mg",
  },
  {
    name: "Desloratadine",
    type: "Tablet",
    dosage: "2.5mg",
  },
  {
    name: "Metronidazole",
    type: "Liquid",
    dosage: "200mg",
  },
  {
    name: "Fusidic Acid",
    type: "Cream",
    dosage: "20mg",
  },
  {
    name: "Ondansetron",
    type: "Tablet",
    dosage: "4mg",
  },
  {
    name: "Cefalexin",
    type: "Liquid",
    dosage: "125mg",
  },
  {
    name: "Doxylamine",
    type: "Tablet",
    dosage: "12.5mg",
  },
  {
    name: "Ketoconazole",
    type: "Cream",
    dosage: "20mg",
  },
  {
    name: "Loratadine",
    type: "Tablet",
    dosage: "10mg",
  },
];

const antecedents = [
  {
    id: 1,
    name: "Diabète",
    type: "Familiaux",
  },
  {
    id: 2,
    name: "Hypertension",
    type: "Familiaux",
  },
  {
    id: 3,
    name: "Asthme",
    type: "Medicaux",
  },
  {
    id: 4,
    name: "Allergies",
    type: "Medicaux",
  },
  {
    id: 5,
    name: "Appendicectomie",
    type: "Chururgicaux",
  },
  {
    id: 6,
    name: "Amygdalectomie",
    type: "Chururgicaux",
  },
  {
    id: 7,
    name: "Maladie cardiaque",
    type: "Familiaux",
  },
  {
    id: 8,
    name: "Cancer",
    type: "Familiaux",
  },
  {
    id: 9,
    name: "Épilepsie",
    type: "Medicaux",
  },
  {
    id: 10,
    name: "Cholécystectomie",
    type: "Chururgicaux",
  },
  {
    id: 11,
    name: "Maladie de la thyroïde",
    type: "Familiaux",
  },
  {
    id: 12,
    name: "Migraine",
    type: "Medicaux",
  },
  {
    id: 13,
    name: "Chirurgie de la cataracte",
    type: "Chururgicaux",
  },
  {
    id: 14,
    name: "Accident vasculaire cérébral",
    type: "Familiaux",
  },
  {
    id: 15,
    name: "Anémie",
    type: "Medicaux",
  },
  {
    id: 16,
    name: "Réparation de hernie",
    type: "Chururgicaux",
  },
];

const acts = [
  { name: "Consultation", price: 1800 },
  { name: "Suivi", price: 1500 },
  { name: "Vaccination", price: 1000 },
  { name: "Bilan", price: 2500 },
  { name: "Dépistage", price: 1200 },
  { name: "Tension", price: 500 },
  { name: "Croissance", price: 2000 },
  { name: "Test", price: 1500 },
  { name: "Maladie", price: 2000 },
  { name: "Sutures", price: 1800 },
  { name: "Injections", price: 800 },
  { name: "Prise", price: 1000 },
  { name: "Allergies", price: 2000 },
  { name: "Nutrition", price: 1500 },
  { name: "Éducation", price: 1500 },
  { name: "Certificat", price: 500 },
  { name: "Ordonnance", price: 300 },
  { name: "Lettre", price: 400 },
  { name: "Conseil", price: 1800 },
];

const ConsultationData = [
  {
    motif: "motif 1",
    date: "2022-12-20",
    height: 57,
    weight: 5.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 1",
    glycemie: 5.2,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 1",
    crp: 3.8,
    biologyOther: "biologie 1",
    ultrasound: "echographie 1",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif ",
    date: "2023-01-20",
    height: 57.5,
    weight: 5.6,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 2",
    glycemie: 5.3,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS",
    crp: 3.8,
    biologyOther: "biologie 2",
    ultrasound: "echographie 2",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 3",
    date: "2023-02-20",
    height: 58,
    weight: 6,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 3",
    glycemie: 5.4,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 3",
    crp: 3.8,
    biologyOther: "biologie 3",
    ultrasound: "echographie 3",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 4",
    date: "2023-03-20",
    height: 58.5,
    weight: 6.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 4",
    glycemie: 5.5,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 4",
    crp: 3.8,
    biologyOther: "biologie 4",
    ultrasound: "echographie 4",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 5",
    date: "2023-04-20",
    height: 59,
    weight: 7,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 5",
    glycemie: 5.6,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 5",
    crp: 3.8,
    biologyOther: "biologie 5",
    ultrasound: "echographie 5",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 6",
    date: "2023-05-20",
    height: 59.5,
    weight: 7.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 6",
    glycemie: 5.7,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 6",
    crp: 3.8,
    biologyOther: "biologie 6",
    ultrasound: "echographie 6",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 7",
    date: "2023-06-20",
    height: 60,
    weight: 8,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 7",
    glycemie: 5.8,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 7",
    crp: 3.8,
    biologyOther: "biologie 7",
    ultrasound: "echographie 7",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 8",
    date: "2023-07-20",
    height: 60.5,
    weight: 8.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 8",
    glycemie: 5.9,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 8",
    crp: 3.8,
    biologyOther: "biologie 8",
    ultrasound: "echographie 8",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 9",
    date: "2023-08-20",
    height: 61,
    weight: 9,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 9",
    glycemie: 6,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 9",
    crp: 3.8,
    biologyOther: "biologie 9",
    ultrasound: "echographie 9",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 10",
    date: "2023-09-20",
    height: 61.5,
    weight: 9.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 10",
    glycemie: 6.1,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 10",
    crp: 3.8,
    biologyOther: "biologie 10",
    ultrasound: "echographie 10",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 11",
    date: "2023-10-20",
    height: 62,
    weight: 10,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 11",
    glycemie: 6.2,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 11",
    crp: 3.8,
    biologyOther: "biologie 11",
    ultrasound: "echographie 11",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 12",
    date: "2023-11-20",
    height: 62.5,
    weight: 10.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 12",
    glycemie: 6.3,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 12",
    crp: 3.8,
    biologyOther: "biologie 12",
    ultrasound: "echographie 12",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 13",
    date: "2023-12-20",
    height: 63,
    weight: 11,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 13",
    glycemie: 6.4,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 13",
    crp: 3.8,
    biologyOther: "biologie 13",
    ultrasound: "echographie 13",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 14",
    date: "2024-01-20",
    height: 63.5,
    weight: 11.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 14",
    glycemie: 6.5,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 14",
    crp: 3.8,
    biologyOther: "biologie 14",
    ultrasound: "echographie 14",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 15",
    date: "2024-02-20",
    height: 64,
    weight: 12,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 15",
    glycemie: 6.6,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 15",
    crp: 3.8,
    biologyOther: "biologie 15",
    ultrasound: "echographie 15",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 16",
    date: "2024-03-20",
    height: 64.5,
    weight: 12.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 16",
    glycemie: 6.7,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 16",
    crp: 3.8,
    biologyOther: "biologie 16",
    ultrasound: "echographie 16",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 17",
    date: "2024-04-20",
    height: 65,
    weight: 13,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 17",
    glycemie: 6.8,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 17",
    crp: 3.8,
    biologyOther: "biologie 17",
    ultrasound: "echographie 17",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
  {
    motif: "motif 18",
    date: "2024-05-20",
    height: 65.5,
    weight: 13.5,
    generalCondition: "état général bon",
    urogenital: "urogénital normal",
    genital: "génital normal",
    abdominal: "abdominal 18",
    glycemie: 6.9,
    urea: 25.6,
    creatine: 0.9,
    fns: "FNS 18",
    crp: 3.8,
    biologyOther: "biologie 18",
    ultrasound: "echographie 18",
    tdm: "tdm ",
    irm: "irm",
    patientId: 1,
    doctorId: 1,
  },
];

module.exports = {
  patients,
  medicaments,
  antecedents,
  acts,
  ConsultationData,
};
