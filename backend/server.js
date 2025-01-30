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
