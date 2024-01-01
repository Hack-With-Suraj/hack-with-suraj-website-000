const Contact = require('../../../db/contact');

async function validateContactForm(req) {
    const { Firstname, Lastname, email, Streetaddress, City, Postalcode, Massage } = req.body;
    const requiredFields = ['Firstname', 'Lastname', 'email', 'Streetaddress', 'City', 'Postalcode', 'Massage'];

    const missingField = requiredFields.find(field => !req.body[field]);
    if (missingField) {
        throw new Error('All Details Are Required.');
    }
}

async function saveContactToDatabase(contactData) {
    const contactModel = new Contact(contactData);
    await contactModel.save();
}

async function HandleContact(req, res) {
    try {
        // Validation Checks
        await validateContactForm(req);

        // Save the contact to the database
        await saveContactToDatabase({
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            email: req.body.email,
            Streetaddress: req.body.Streetaddress,
            City: req.body.City,
            Postalcode: req.body.Postalcode,
            Massage: req.body.Massage
        });

        return res.status(200).redirect('/');
    } catch (error) {
        return res.status(500).render('contactUs', { error: error.message || 'Internal Server Error' });
    }
}

module.exports = HandleContact;
