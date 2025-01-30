import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],  // Add localhost URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// app.use(
//   cors({
//     origin: '*', 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Feedback Route
app.post("/submitFeedback", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    // Send the feedback email to the owner's email
    await sendEmail({
      email: process.env.SMTP_MAIL, // Owner's email from environment variables
      subject: "New Feedback Received From Job Quest Website",
      message: `
        Name: ${name}\n
        Email: ${email}\n
        Feedback: ${feedback}
      `,
    });

    res.status(200).json({ message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({ message: "Failed to send feedback. Please try again later." });
  }
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

newsLetterCron()
connection();
app.use(errorMiddleware);

export default app;
  