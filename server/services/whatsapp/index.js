const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

const sendMessage = async () => {
  try {
    const res = await fetch("http://localhost:3000/appointment");
    if (res.ok) {
      const { data: appointments } = await res.json();
      console.log(appointments);
      appointments.forEach((appointment) => {
        const phone = `${appointment.patient.numberPhone}`.slice(1);
        // const p = "hna akteb nmr ta3ek";
        // const phone = `${p}`.slice(1);
        console.log(phone);
        client.sendMessage(
          `213${phone}@c.us`,
          `Hello ${appointment.patient.firstName} ${appointment.patient.lastName}, you have an appointment on ${appointment.date} at ${appointment.time}.`
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
});

client.on("ready", () => {
  console.log("Client is ready!");
  // Every minute
  cron.schedule("* * * * *", sendMessage);
});

client.initialize();
