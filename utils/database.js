import mongoose from "mongoose";

let isConnected = false;

export const ConnectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is Already Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("MongoDB Connected.")
    } catch (error) {
        console.log("Failed to connect MongoDB", error)   
    }
}