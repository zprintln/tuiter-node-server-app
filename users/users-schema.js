import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    firstName: String,
    lastName: String,
    }, {collection: 'users'});
export default userSchema;

