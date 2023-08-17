import mongoose from 'mongoose';
const schema = mongoose.Schema({
  topic: String,
  username: String,
  title: String,
  time: String,
  image: String,
  handle: String,
  tuit: String,
  likes: Number,
  liked: Boolean,
  replies: Number,
  retuits: Number,
  dislikes: Number

}, {collection: 'tuits'});
export default schema;
