import express from 'express'
import routes from '../routers/list'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

async function run(){
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("successfuly connected");

      
    }
    catch(err){
        console.log(err)
    }
}
run();
app.use(bodyParser.json());
//routes handling
//cors
app.use(cors())
app.use("/api",routes);
//next points to this middleware after routes,catching error
app.use((err, req ,res , next)=>{
    res.send({error: err.message});
})



app.listen(5000, ()=>{
    console.log("server is running");
})