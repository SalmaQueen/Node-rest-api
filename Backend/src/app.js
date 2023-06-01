import express from 'express'
import routes from '../routers/list'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express();

async function run(){
    try{
        await mongoose.connect("mongodb+srv://salma12:Queenheart%4012@cluster0.sflltnj.mongodb.net/?retryWrites=true&w=majority");
        console.log("successfuly connected");

      
    }
    catch(err){
        console.log(err)
    }
}
run();
app.use(express.json());
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