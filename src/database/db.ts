import mongoose from "mongoose";
mongoose.set('strictQuery',true);
const connectToDatabase=async()=>{
    try {
        const options:any={
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
        await mongoose.connect(process.env.DATABASE_URL,options);
        console.log("Connected to Database")
    } catch (error) {
        console.log("error connecting to database",error)
    }
}
export default connectToDatabase;