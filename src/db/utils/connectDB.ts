import {connect, Mongoose} from 'mongoose'

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
  }

async function connectDB(): Promise<Mongoose | Error> {
    const mongoUrl = 'mongodb://localhost:27017/?authSource=admin';
    try {
        const dbConnection: Mongoose = await connect(mongoUrl, mongoOptions)
        console.log('>> Database connected successfully <<')
        return dbConnection
    } catch (error) {
        return error as Error
    }
}

export default connectDB