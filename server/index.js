const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  loginRoute,
  registerRoute,
  patientRoute,
  medicamentRoute,
  consultationRoute,
  antecedentRoute,
  ordonnanceRoute,
  curveRoute,
} = require("./routes/index.js");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("socketio", io);

app.use(express.json());

const db = require("./config/dbConfig.js");
db.authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/login", loginRoute);
app.use("/regester", registerRoute);
app.use("/patients", patientRoute);
app.use("/medicaments", medicamentRoute);
app.use("/consultations", consultationRoute);
app.use("/antecedent", antecedentRoute);
app.use("/ordonnance", ordonnanceRoute);
app.use("/curve", curveRoute);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("sendNotification", (notification) => {
    console.log("Received notification:", notification);
    // socket.emit("notification", notification);
    socket.broadcast.emit("notification", notification);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listen at port num ${port}`);
});
