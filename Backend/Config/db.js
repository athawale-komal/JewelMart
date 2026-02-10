const mongoose  = require ("mongoose");

const Connect_Database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{family:4});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
 module.exports = Connect_Database;




