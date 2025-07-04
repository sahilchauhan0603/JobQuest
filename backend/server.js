import app from "./app.js";
import cloudinary from "cloudinary";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

config({ path: "./config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // Listening for messages from clients
  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    // Broadcasting the message to all connected clients
    io.emit("receive_message", data);

  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});

/*
Explanation:
- Loads environment variables using dotenv for configuration.
- Configures Cloudinary with credentials from environment variables for image/file uploads.
- Creates an HTTP server from the Express app.
- Sets up a Socket.IO server for real-time communication, allowing CORS from the frontend URL.
- Listens for new socket connections:
  - Logs when a user connects or disconnects.
  - Listens for 'send_message' events from clients, logs the message, and broadcasts it to all connected clients using 'receive_message'.
- Starts the server on the specified port and logs the status.
- This setup enables real-time features (like chat) and cloud-based file management in the application.

What is Cloudinary?
- Cloudinary is a cloud-based service for managing images and other media files.
- It provides APIs to upload, store, transform, and deliver images and videos efficiently.
- In this project, Cloudinary is used to upload and store user resumes and other files, offloading file storage from your server and making file management scalable and reliable.
*/
