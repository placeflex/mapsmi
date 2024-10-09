import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // Например, 'Gmail'
  auth: {
    user: "adelente1@gmail.com",
    pass: "evyj aqew dqzj itnu",
  },
});
