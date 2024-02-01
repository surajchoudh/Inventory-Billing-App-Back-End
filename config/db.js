const mongoose = require('mongoose');
const config = require('./dbConfig');
const env = 'production'//'development';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config[env], {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDB };
