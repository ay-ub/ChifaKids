const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000 || 5000;
//==============================middleware START==========================
app.use(express.json());
app.use(cors());
//==============================middleware END============================
//==============================db Connect START==========================

const db = require("./config/dbConfig.js");
db.authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//==============================db Connect END ===========================

const loginRoute = require("./routes/login.js");
app.use("/login", loginRoute);

const registerRoute = require("./routes/register.js");
app.use("/regester", registerRoute);

const patientRoute = require("./routes/patient.js");
app.use("/patients", patientRoute);

const medicamentRoute = require("./routes/medicament.js");
app.use("/medicaments", medicamentRoute);

//============================== Routes END   ============================

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   console.log("====================================");
//   console.log(socket.id);
//   // socket.on("disconnect", () => {
//   //   console.log("user disconnected");
//   // });
// });
//============================== Server START ============================

server.listen(port, () => {
  console.log(`listen at port num ${port}`);
});

//============================== Server END   ============================
