import app from "./app.js";
import mongoose from "mongoose";
import socketHandler from "./utils/socketHandler.js";
const PORT = process.env.PORT || 8000;
console.log(PORT);
import { Server } from "socket.io";

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_NODE_URL);

    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("MongoDB connection error : " + error.message);
  }
};

connectToDatabase();

const server = app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
//socket io
const io = new Server(server, {
  // options
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});

io.on("connection", (socket) => {
  console.log("socket io connected successfully");

  socketHandler(socket, io);
});
