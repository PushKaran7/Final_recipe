const mongoose=require("mongoose");

const connectionDB= async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
       console.log(`Database connected to:
        Host:${connect.connection.host}
        Database name in Mongodb: ${connect.connection.name}`

       );
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectionDB;