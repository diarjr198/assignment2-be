const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const dbPathUrl = 'mongodb://localhost:27017/';
        const dbName = 'ClashOfVillages';
        await mongoose.connect(`${dbPathUrl}${dbName}`);
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;