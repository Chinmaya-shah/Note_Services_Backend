const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.Mongo_URI);
        console.log('Database Connected')
    } catch (error) {
        console.log('Error while connecting database',error.message)
        process.exit(1);

    }
};

module.exports = connectDB;