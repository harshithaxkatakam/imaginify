import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// we have to connect to MongoDB for every request unlike in ExpressJS
// because NextJS runs in a serverless environment -  stateless requests - each request is handled individually - scalable flexible - need to check for optimization - cache connections

let cached: MongooseConnection = (global as any).mongoose
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn;
    if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'imaginify',
        bufferCommands: false
    })
    cached.conn = await cached.promise;
    return cached.conn;
}