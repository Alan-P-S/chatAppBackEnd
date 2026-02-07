import mongoose from 'mongoose';


export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGODB_CONNECTED: ${conn.connection.host}`);
    }
    catch(error){
        console.log("MONGO_DB_CONNECTION: ",error);
    }
};