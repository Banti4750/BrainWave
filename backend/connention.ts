import mongoose from "mongoose";
require('dotenv').config();
const connection =()=>{


       mongoose.connect(process.env.DB_URI as string)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log('MongoDB connection error:', err));
}


export default connection;