import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// import { MongoClient } from "mongodb";

// async function connectToMongoDB() {
//   const uri = process.env.MONGODB_URI;
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// export const mongoClient = await connectToMongoDB();
