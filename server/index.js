const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const {
  loginRoute,
  registerRoute,
  patientRoute,
  medicamentRoute,
  consultationRoute,
  doctorRoute,
} = require("./routes/index.js");

app.use(express.json());
app.use(cors());

const db = require("./config/dbConfig.js");
db.authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//==============================db Connect END ===========================

app.use("/login", loginRoute);
app.use("/regester", registerRoute);
app.use("/patients", patientRoute);
app.use("/medicaments", medicamentRoute);
app.use("/consultations", consultationRoute);
app.use("/doctor", doctorRoute);

//============================== Routes END   ============================

//============================== Server START ============================

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listen at port num ${port}`);
});

//============================== Server END   ============================
