const mongoose=require('mongoose')

const connectDB=(URL)=>{
    return mongoose.connect("mongodb+srv://aryanjaiswal0602:VcAJ25Xn0bLHivLX@cluster0.cpkjkbk.mongodb.net/")
}

module.exports=connectDB