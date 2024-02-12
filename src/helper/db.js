import mongoose from 'mongoose';

export const connectDb = async () => {
    try{
        const { connection } = await mongoose.connect("mongodb+srv://pargatdev:6TS532QiPLoZ1gSo@cluster0.ilsc6gk.mongodb.net/?retryWrites=true&w=majority", {
            dbName: "work_manager"
        });
        console.log("db connected...");
    }
    catch(error){
        console.log("failed to connect");
        console.log(error);
    }
};