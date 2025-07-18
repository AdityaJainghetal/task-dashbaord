const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://adityajainghetal:VDD9rCndbhVBuKBo@cluster0.obitxib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`Database connected: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
