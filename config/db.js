const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb  ulandi`);
    } catch (error) {
        console.error(`Mongodb ga ulanishda xatolik: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
