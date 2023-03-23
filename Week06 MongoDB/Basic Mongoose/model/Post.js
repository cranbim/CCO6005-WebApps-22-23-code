const mongoose=require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
});

const Post = model('BlogPost', postSchema);
module.exports = Post;