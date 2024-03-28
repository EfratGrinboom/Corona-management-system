const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/HMO_DB'


const memberSchema = new mongoose.Schema({
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Id: { type: String, required: true, unique: true }, // תעודת זהות
    Address: { // כתובת
        city: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: Number, required: true },
    },
    Telephone: { type: String, required: true }, // טלפון
    Mobile_phon: { type: String, required: true }, // טלפון נייד

    covid_info: {
        vaccinations: [ // חיסונים
            {
                date: { type: Date, required: true }, // תאריך
                manufacturer: { type: String, required: true }, // יצרן
            },
            {
                date: { type: Date, required: true },
                manufacturer: { type: String, required: true },
            },
            {
                date: { type: Date, required: true },
                manufacturer: { type: String, required: true },
            },
            {
                date: { type: Date, required: true },
                manufacturer: { type: String, required: true },
            },
        ],
        covidPositiveDate: { type: Date }, // תאריך תוצאה חיובית
        covidRecoveryDate: { type: Date }, // תאריך החלמה
    },
});


const Member = mongoose.model('Member', memberSchema);

// התחברות למאגר נתונים
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


module.exports = {
    Member, // Make the Member model available to other services
};