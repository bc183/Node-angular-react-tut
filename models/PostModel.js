const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    user: {},
    createdAt: {
        type: String
    }

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;