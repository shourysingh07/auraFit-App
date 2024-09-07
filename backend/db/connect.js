const mongoose=require('mongoose')

const connectDB=(URL)=>{
    return mongoose.connect(process.env.MONGO_URI);
}

module.exports=connectDB