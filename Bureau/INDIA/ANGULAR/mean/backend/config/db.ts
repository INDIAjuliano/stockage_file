import mongoose from 'mongoose';
import config from './config';

const db = async () => {
    await mongoose.connect(config.mongoUrl as string).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
    );

};

export default db;
