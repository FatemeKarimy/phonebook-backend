const Contacts = require('../models/contacts.model.js');

// Create and Save a new Contact
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstname || !req.body.lastname || !req.body.phonenumber) {
        return res.status(400).send({
            message: "Firstname, Lastname, Phonenumber can not be empty"
        });
    }

    // Create a Contact
    const contact = new Contacts({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        email: req.body.email
    });

    // Save Contact in the database
    contact.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Contact."
        });
    });
};

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    Contacts.find()
        .then(contacts => {
            res.send(contacts);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Contacts."
        });
    });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
    Contacts.findById(req.params.contactId)
        .then(contact => {
            if(!contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            res.send(contact);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.contactId
            });
        }
        return res.status(500).send({
            message: "Error retrieving contact with id " + req.params.contactId
        });
    });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstname || !req.body.lastname || !req.body.phonenumber) {
        return res.status(400).send({
            message: "Firstname, Lastname, Phonenumber can not be empty"
        });
    }

    // Find contact and update it with the request body
    Contacts.findByIdAndUpdate(req.params.contactId, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        email: req.body.email
    }, {new: true})
        .then(contact => {
            if(!contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            res.send(contact);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.contactId
            });
        }
        return res.status(500).send({
            message: "Error updating Contact with id " + req.params.contactId
        });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    Contacts.findByIdAndRemove(req.params.contactId)
        .then(contact => {
            if(!contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            res.send({message: "Contact deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.contactId
            });
        }
        return res.status(500).send({
            message: "Could not delete contact with id " + req.params.contactId
        });
    });
};
