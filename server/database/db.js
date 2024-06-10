import mongoose from "mongoose";

const Connection = async (MongoDB_URL) => {
  try {
    await mongoose.connect(MongoDB_URL); //,{ useNewUrlParser: true }
    console.log("database connected successfully");
  } catch (error) {
    console.log("error while connecting the DB", error);
  }
};

export default Connection;
