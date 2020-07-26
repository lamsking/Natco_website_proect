const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    client: String,
    file: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Works', WorkSchema);
