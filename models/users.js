const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    prenom: String,
    email: String,
    password: String
}, {
    timestamps: true
});


UserSchema.index({
  nom: 'text',
  prenom: 'text',
}, {
  weights: {
    name: 5,
    prenom: 1,
  },
});

module.exports = mongoose.model('Users', UserSchema);
