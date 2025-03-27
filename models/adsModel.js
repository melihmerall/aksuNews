const {model, Schema} = require('mongoose')

const authSchema = new Schema({
    headerAdsImageUrl: {
        type: String,
        required: false,
    },
    bannerAdsImageUrl: {
        type: String,
        required: false,
    },

},{ timestamps: true })

module.exports = model('ads',authSchema)