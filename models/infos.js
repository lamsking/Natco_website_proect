const mongoose = require('mongoose');

const InfoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: String,
    content: String,
    file: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Infos', InfoSchema);
