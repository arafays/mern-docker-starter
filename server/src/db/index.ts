import { connect } from 'mongoose';
import env from '../env';

const connectDB = async () => {
  try {
    await connect(env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;