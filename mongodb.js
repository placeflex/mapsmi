// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGODB_URI);
//       console.log("db connected");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDB;

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
