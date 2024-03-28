import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../style/EditMember.css';

function EditMember() {
    const location = useLocation();
    const { member } = location.state;
    const [updatedMember, setUpdatedMember] = useState(member);

    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    async function onSubmitMemberClick() {
        // console.log(updatedMember)
        // בדיקה שכל השדות הרלוונטיים נמלאו
        if (!updatedMember.First_name || !updatedMember.Last_name || !updatedMember.Id || !updatedMember.Mobile_phon || !updatedMember.Telephone || !updatedMember.Addres.city || !updatedMember.Addres.street || !updatedMember.Addres.number) {
            alert("Please fill in all required fields.");
            // setErrorMessage("Please fill in all required fields.");
            return;
        }

        const response = await fetch(`http://localhost:3000/member/${updatedMember.Id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedMember),
        });
        console.log('response :', response);

        const json = await response.json();
        console.log('member json:', json);
        // setUpdatedMember(json);
        // console.log("Member updated successfully:", updatedMember);

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember({ ...updatedMember, [name]: value });
        // console.log("updatedMember", updatedMember);
    };


    return (
        <div className="EditMember">
            {/* <form> */}
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
            <input type="text" id="city" name="Addres.city" value={updatedMember.Addres.city} onChange={handleInputChange} />
            <br />

            <label htmlFor="street">Street:</label>
            <input type="text" id="street" name="Addres.street" value={updatedMember.Addres.street} onChange={handleInputChange} />
            <br />

            <label htmlFor="number">Number:</label>
            <input type="text" id="number" name="Addres.number" value={updatedMember.Addres.number} onChange={handleInputChange} />
            <br />

            <h2>COVID Information:</h2>
            <label htmlFor="positiveDate">Positive Date:</label>
            <input type="text" id="positiveDate" name="covid_info.covidPositiveDate" value={updatedMember.covid_info.covidPositiveDate} onChange={handleInputChange} />
            <br />

            <label htmlFor="recoveryDate">Recovery Date:</label>
            <input type="text" id="recoveryDate" name="covid_info.covidRecoveryDate" value={updatedMember.covid_info.covidRecoveryDate} onChange={handleInputChange} />
            <br />

            <h3>Vaccinations:</h3>
            {updatedMember.covid_info.vaccinations.map((vaccination, index) => (
                <div key={index}>
                    <label htmlFor={`vaccinationDate${index}`}>Vaccination Date:</label>
                    <input type="text" id={`vaccinationDate${index}`} name={`covid_info.vaccinations[${index}].date`} value={vaccination.date} onChange={handleInputChange} />
                    <label> </label>
                    <label htmlFor={`vaccinationManufacturer${index}`}>Vaccination Manufacturer:</label>
                    <input type="text" id={`vaccinationManufacturer${index}`} name={`covid_info.vaccinations[${index}].manufacturer`} value={vaccination.manufacturer} onChange={handleInputChange} />
                    <br />
                    <br />

                </div>
            ))}
            <button onClick={() => onSubmitMemberClick()}>Submit</button>
            {/* <button type="submit">Submit</button> */}
            {/* </form> */}
        </div>
    );
}

export default EditMember;
