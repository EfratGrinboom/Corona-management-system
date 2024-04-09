import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../style/EditMember.css';


function EditMember() {
    const navigate = useNavigate();
    const location = useLocation();
    const { member } = location.state;
    const [updatedMember, setUpdatedMember] = useState(member);
    const [vaccinations, setVaccinations] = useState(member.covid_info.vaccinations);
    const [validation, setValidation] = "OK";

    //#region validation function
    function validationFunc() {
        //בדיקה שכל השדות מלאים
        if (!updatedMember.First_name || !updatedMember.Last_name || !updatedMember.Id || !updatedMember.Mobile_phon || !updatedMember.Telephone || !updatedMember.Address.city || !updatedMember.Address.street || !updatedMember.Address.number) {
            alert("Please fill in all required fields.");
            setValidation("failed");
            return;
        }

        //בדיקה ששדות מסוג מספר מכילות רק מספרים
        if (
            isNaN(updatedMember.Mobile_phon) ||
            isNaN(updatedMember.Telephone) ||
            isNaN(updatedMember.Address.number)
        ) {
            alert("Mobile Phone, Telephone, and Address Number should contain only numbers.");
            setValidation("failed");
            return;
        }

        // בדיקה של פורמט התאריך 
        const isValidPositiveDate = /^(?:\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?)?$/.test(updatedMember.covid_info.covidPositiveDate);
        const isValidRecoveryDate = /^(?:\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?)?$/.test(updatedMember.covid_info.covidRecoveryDate);

        // בדיקה של תקינות התאריך - אם אחד מהם לא תקין, תוצג הודעת שגיאה והפונקציה תעצור כאן
        if (!updatedMember.covid_info.covidPositiveDate) {
            if (!updatedMember.covid_info.covidRecoveryDate) {
                return;
            }
            alert("It is not possible to enter a date of recovery without a date of illness");
            setValidation("failed");
            return;
        }
        if (!updatedMember.covid_info.covidRecoveryDate) {
            return;
        }
        if (!isValidPositiveDate || !isValidRecoveryDate) {
            alert("Please enter valid dates in the format YYYY-MM-DD.");
            setValidation("failed");
            return;
        }
    }
    //#endregion

    //#region sending request
    async function onSubmitMemberClick() {
        try {
            validationFunc();
            if (validation === "failed")
                return;
            const response = await fetch(`http://localhost:3000/member/${updatedMember.Id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedMember),
            });

            if (!response.ok) {
                throw new Error('Update failed');

            }

            const json = await response.json();
            console.log('member json:', json);

            // Navigate back to members list after successful update
            navigate('/members');

        } catch (error) {
            console.error('Update error:', error);
        }
    }
    //#endregion 

    //#region handleInputChange function
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // טיפול בשדות "covid_info"
        if (name === "covid_info.covidPositiveDate" || name === "covid_info.covidRecoveryDate") {
            const [parentField, childField] = name.split(".");
            setUpdatedMember(prevState => ({
                ...prevState,
                [parentField]: {
                    ...prevState[parentField],
                    [childField]: value
                }
            }));
        } else if (name.includes("covid_info.vaccinations")) {
            // אם השדה הוא שדה ברשימת החיסונים
            const index = parseInt(name.match(/\[(.*?)\]/)[1]);
            const fieldName = name.split(".").pop();
            const updatedVaccinations = [...vaccinations];
            updatedVaccinations[index] = {
                ...updatedVaccinations[index],
                [fieldName]: value
            };
            setVaccinations(updatedVaccinations);
            return;
        }

        // טיפול בשדות Addres
        else if (name.includes("Address")) {
            // אם השדה הוא שדה בפרטי הכתובת
            const [parentField, childField] = name.split(".");
            setUpdatedMember(prevState => ({
                ...prevState,
                Address: {
                    ...prevState.Address,
                    [childField]: value
                }
            }));
        }

        // שדות רגילים
        setUpdatedMember((prevState) => ({
            ...prevState,
            [name]: value
        }));

    };
    //#endregion 

    //#region formatDate function
    function formatDate(dateString) {
        // Initialize a date object
        const date = new Date(dateString);

        // Get the year, month, and day
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // מוסיפה 1 כי חודשים ממוספרים מ-0 עד 11.
        const day = ("0" + date.getDate()).slice(-2); // Pad with leading zero if necessary

        // Return the formatted date
        return `${year}-${month}-${day}`;
    }
    //#endregion

    //#region return member details
    return (
        <div className="EditMember">
            <h2 id="PersonalDetails">Personal details</h2>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="First_name" value={updatedMember.First_name} onChange={handleInputChange} />
            <br />

            <label htmlFor="Last_name">Last Name:</label>
            <input type="text" id="Last_name" name="Last_name" value={updatedMember.Last_name} onChange={handleInputChange} />
            <br />

            <label htmlFor="Id">ID Number:</label>
            <input type="text" id="idNumber" name="idNumber" value={updatedMember.Id} onChange={handleInputChange} />
            <br />

            <label htmlFor="Mobile_phon">Mobile Phone:</label>
            <input type="text" id="Mobile_phon" name="Mobile_phon" value={updatedMember.Mobile_phon} onChange={handleInputChange} />
            <br />

            <label htmlFor="Telephone">Telephone:</label>
            <input type="text" id="Telephone" name="Telephone" value={updatedMember.Telephone} onChange={handleInputChange} />
            <br />

            <h2>Address:</h2>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="Address.city" value={updatedMember.Address.city} onChange={handleInputChange} />
            <br />

            <label htmlFor="street">Street:</label>
            <input type="text" id="street" name="Address.street" value={updatedMember.Address.street} onChange={handleInputChange} />
            <br />

            <label htmlFor="number">Number:</label>
            <input type="text" id="number" name="Address.number" value={updatedMember.Address.number} onChange={handleInputChange} />
            <br />

            <h2>COVID Information:</h2>
            <label htmlFor="positiveDate">Positive Date:</label>
            <input type="text" id="positiveDate" name="covid_info.covidPositiveDate" value={updatedMember.covid_info.covidPositiveDate === null ? "" : formatDate(updatedMember.covid_info.covidPositiveDate)} onChange={handleInputChange} />
            <br />

            <label htmlFor="recoveryDate">Recovery Date:</label>
            <input type="text" id="recoveryDate" name="covid_info.covidRecoveryDate" value={updatedMember.covid_info.covidPositiveDate === null ? "" : formatDate(updatedMember.covid_info.covidRecoveryDate)} onChange={handleInputChange} />
            <br />

            <h3>Vaccinations:</h3>
            {vaccinations.map((vaccination, index) => (
                <div key={index}>
                    <label htmlFor={`vaccinationDate${index}`}>Vaccination Date:</label>
                    <input
                        type="text"
                        id={`vaccinationDate${index}`}
                        name={`covid_info.vaccinations[${index}].date`}
                        value={vaccination.date || ""} // Ensure default value for date
                        onChange={handleInputChange}
                    />
                    <label> </label>
                    <label htmlFor={`vaccinationManufacturer${index}`}>Vaccination Manufacturer:</label>
                    <input
                        type="text"
                        id={`vaccinationManufacturer${index}`}
                        name={`covid_info.vaccinations[${index}].manufacturer`}
                        value={vaccination.manufacturer || ""} // Ensure default value for manufacturer
                        onChange={handleInputChange}
                    />
                    <br />
                    <br />
                </div>
            ))}
            <button onClick={() => onSubmitMemberClick()}>Submit</button>
        </div>
    );
    //#endregion
}

export default EditMember;
