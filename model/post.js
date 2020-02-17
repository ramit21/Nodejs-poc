const mongoose = require('mongoose');
const validator = require('validator');

const Post = mongoose.model('Post', {
	title: {
        type: String,
        validate(value) {
            if(value == '') {
                throw new Error('Empty title not allowed');
            }
        }
	},
	content: {
        type : String,
        required: true
	}
});

module.exports = Post