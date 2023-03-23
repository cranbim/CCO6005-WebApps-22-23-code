const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://CCO6005-00:black.D0g@cluster0.lpfnqqx.mongodb.net/DJWApp?retryWrites=true&w=majority")

const Post =require( './model/Post');


// Create a new blog post object
const article = new Post({
  title: 'My Awesome Post!',
  slug: 'awesome-post-no10',
  published: true,
  content: 'Really great',
  tags: ['fabulous', 'tuesday'],
});

// Insert the article in our MongoDB database
// await article.save();

Post.create(article);

const filter = { title: 'My Awesome Post!' };
const update = { content: 'Not so great' };
const update2 = { $addToSet: { tags: ['monday','tuesday','newtag'] } }

Post.findOneAndUpdate(filter, update2).exec()
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log('Error:'+err)
    });

