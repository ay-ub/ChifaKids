const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {
  authRoute,
  userRoute,
  patientRoute,
  medicamentRoute,
  consultationRoute,
  antecedentRoute,
  ordonnanceRoute,
  curveRoute,
  compteRenduRoute,
  appointmentRoute,
  statistiqueRoute,
  serviceRoute,
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
app.use(cookieParser());

const db = require("./config/dbConfig.js");
db.authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/patients", patientRoute);
app.use("/medicaments", medicamentRoute);
app.use("/consultations", consultationRoute);
app.use("/antecedent", antecedentRoute);
app.use("/ordonnance", ordonnanceRoute);
app.use("/curve", curveRoute);
app.use("/compteRendu", compteRenduRoute);
app.use("/appointment", appointmentRoute);
app.use("/statistics", statistiqueRoute);
app.use("/service", serviceRoute);

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

// const accountSid = "AC5f5aecab8a138273630dd12c7fc62009";
// const authToken = "889a544b409a2f6d766c93218c8258df";
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Your appointment is coming up on July 21 at 3PM",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+213540185642",
//   })
//   .then((message) => console.log(message.sid));

// const accountSid = "AC5f5aecab8a138273630dd12c7fc62009";
// const authToken = "[AuthToken]";
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+213540185642",
//   })
//   .then((message) => console.log(message.sid))
//   .done();

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   // Use `true` for port 465, `false` for all other ports
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "aa2681179@gmail.com",
//     pass: "0540185642",
//   },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <aa2681179@gmail.com>', // sender address
//     to: "ayoubhadjyoucef1@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { appointment } = require("./Models");

// const transporter = nodemailer.createTransport({
//   //   host: "smtp-mail.outlook.com",
//   //   secureConnection: false,
//   //   port: 587,
//   service: "hotmail",
//   auth: {
//     user: process.env.EMAIL_ADDRESS,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// const send = async () => {
//   try {
//     await transporter.sendMail({
//       from: "hadjyoucefayyoub@outlook.com", // sender address
//       to: "aa8272100@gmail.com", // list of receivers
//       subject: "hi ayoub ", // Subject line
//       html: "<b>hi ayoub</b>", // html body
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// cron.schedule("*/5 * * * * *", async () => {
//   const today = new Date();
//   const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

//   try {
//     const appointments = await appointment.findAll({
//       where: {
//         date: twoDaysLater,
//       },
//       include: "patient",
//     });

//     console.log("appointments:", appointments);
//     console.log("Notification sent");
//   } catch (error) {
//     console.error("Error sending notifications:", error);
//   }
// });
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listen at port num ${port}`);
});
