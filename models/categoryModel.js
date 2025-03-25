const {model, Schema} = require('mongoose')

const newsSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Kategori adı
    slug: { type: String, required: true, unique: true } // SEO dostu slug
});

module.exports = model('Category',newsSchema)