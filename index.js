import { createTransport } from "nodemailer";
import DotEnv from "dotenv";
import { createInterface } from "readline";
import fs from "fs";
import select, { Separator } from "@inquirer/select";
import { input } from "@inquirer/prompts";

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

const sendMail = async (html) => {
  await transport.sendMail({
    from: "from@mail.com",
    to: "to@mail.com",
    subject: "Test email",
    html: html,
  });
  console.log("Email sent.");
};

const answer = await select({
  message: "Select a package manager",
  choices: [
    {
      name: "Use sample-mail.html file",
      value: "htmlFile",
      description: "Sends sample-mail.html file as email body",
    },
    {
      name: "Custom html string",
      value: "htmlString",
      description: "Send provided custom html string as email body",
    },
  ],
});

if (answer === "htmlFile") {
  console.log("Sending email...");
  const text = fs.readFileSync("sample-mail.html", "utf8");
  await sendMail(text);
}

if (answer === "htmlString") {
  console.log("Sending email...");
  const inputRes = await input({ message: "Enter your html string" });
  await sendMail(inputRes);
}
