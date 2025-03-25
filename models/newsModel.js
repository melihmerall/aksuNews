const {model, Schema} = require('mongoose')

const newsSchema = new Schema({
    writerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'authors'
    },
    writerName: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
    video: {
        type: String,  // **Video URL için yeni alan**
        default: null
    },
    category: {
        type: String,
        required: true
    },
    bigCategory: {
        type: String,
        required: false
    },
    description: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    count: {
        type: Number,
        default: 0
    },
},{ timestamps: true });



module.exports = model('aksuNews',newsSchema)