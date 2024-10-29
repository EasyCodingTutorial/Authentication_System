import mongoose from 'mongoose'

const ConnectToDb = async () => {
    try {

        // Checking If The Connection Is Already Open
        if (mongoose.connection.readyState === 1) {
            console.log("Already Connected")
            return
        }

        // 
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("Connected To DB")
            return
        } else {
            throw new Error("No MongoDB URI Found")
        }


    } catch (error) {
        console.log(error)
    }

}
export default ConnectToDb
