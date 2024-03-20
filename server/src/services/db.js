const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/HMO_DB'


const memberSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    id: { type: String, required: true, unique: true }, // תעודת זהות
    birthDate: { type: Date, required: true }, // תאריך לידה
    address: { // כתובת
        city: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: Number, required: true },
    },
    phone: { type: String, required: true }, // טלפון
    mobilePhone: { type: String, required: true }, // טלפון נייד

    covidInfo: {
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
    //   useNewUrlParser: true,
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