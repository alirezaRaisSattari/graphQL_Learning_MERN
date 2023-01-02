const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const connectDB = async()=> {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('mongo connected:'+ conn.connection);
}
module.exports =  connectDB