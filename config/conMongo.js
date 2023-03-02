import mongoose from "mongoose";

mongoose.connect("mongodb+srv://faculdade:123@cluster0.eceo0ni.mongodb.net/Alura-server")
const db = mongoose.connection

export default db