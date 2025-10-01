const mongoose = require("mongoose");
const dotenv = require('dotenv'); 
dotenv.config({ 
    path: __dirname+"/../.env"
}); 

async function connectDB() {
  try {
   await mongoose.connect(process.env.MONGO_URI, { dbName: "carbon_data" });
    console.log("✅ MongoDB connected");
  } catch (err) { 
    console.error(err)
    process.exit(1);
  }
}  

connectDB()

module.exports = { connectDB, mongoose };
