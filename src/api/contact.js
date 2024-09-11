import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import nodemailer from "nodemailer"


dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post("/api/contact", async (req, res) => {

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const secretPassword = process.env.EMAIL_PASSWORD
        const secretEmail = process.env.EMAIL


        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: secretEmail,
                pass: secretPassword
            }
        })

        const mailOptions = {
            from: secretEmail,
            to: secretEmail,
            subject: "Project inquiry",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent:", info.response)

        res.status(200).json({ message: "Email sent successfully" })

    } catch (error) {
        console.error("Error sending email:", error)
        res.status(500).json({ error: "Internal Server error" })
    }
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})