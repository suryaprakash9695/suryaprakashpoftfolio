const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "surya9794844645@gmail.com", // Your email
        pass: " ", // Replace with your Gmail app password
    },
});

// Endpoint to send emails
app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "surya9794844645@gmail.com",
        subject: `Message from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Email could not be sent.");
        }
        console.log("Email sent:", info.response);
        res.status(200).send("Email sent successfully!");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
