import { createTransport } from "nodemailer";
import DotEnv from "dotenv";
import { createInterface } from "readline";

DotEnv.config();

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.question("Paste html string:", async (value) => {
  if (value) {
    console.log("Sending email...")
    await transport.sendMail({
      from: "from@mail.com",
      to: "to@mail.com",
      subject: "Test email",
      html: value,
    });
    console.log("Email sent.");
    readLine.close();
  }
});
