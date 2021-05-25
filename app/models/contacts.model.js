const mongoose = require('mongoose');

const ContactsSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    phonenumber: String,
    address: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Contacts', ContactsSchema);
