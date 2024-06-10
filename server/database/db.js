import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.nu3dimf.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL); //,{ useNewUrlParser: true }
    console.log("database connected successfully");
  } catch (error) {
    console.log("error while connecting the DB", error);
  }
};

export default Connection;
