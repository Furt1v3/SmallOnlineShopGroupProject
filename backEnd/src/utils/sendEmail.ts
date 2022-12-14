import nodemailer from "nodemailer";

const sendEmail = async (email: any, subject: any, text: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.ADMIN,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export default sendEmail;