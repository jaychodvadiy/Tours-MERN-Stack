const mongoose = require("mongoose");

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("⚡ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
