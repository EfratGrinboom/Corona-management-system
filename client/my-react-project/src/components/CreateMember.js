import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/CreateMember.css';


function CreateMember() {
  const navigate = useNavigate();
  const [newMember, setNewMember] = useState({
    First_name: "",
    Last_name: "",
    Id: "",
    Mobile_phon: "",
    Telephone: "",
    Address: {
      city: "",
      street: "",
      number: "",
    },
    covid_info: {
      covidPositiveDate: "",
      covidRecoveryDate: "",
      vaccinations: [],
    },
  });
  const [validation, setValidation] = "OK";

  //#region create a new member
  async function onSubmitMemberClick() {
    try {
      validationFunc();
      if (validation === "failed")
        return;
      const response = await fetch('http://localhost:3000/createMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });

      // Navigate back to members list after successful update
      navigate('/members');
    } catch (error) {
      console.error('adding member failed:', error);
    }
  }
  //#endregion

  //#region validation function
  function validationFunc() {
    //בדיקה שכל השדות מלאים
    if (!newMember.First_name || !newMember.Last_name || !newMember.Id || !newMember.Mobile_phon || !newMember.Telephone || !newMember.Address.city || !newMember.Address.street || !newMember.Address.number) {
      alert("Please fill in all required fields.");
      setValidation("failed");
      return;
    }

    //בדיקה ששדות מסוג מספר מכילות רק מספרים
    if (
      isNaN(newMember.Id) ||
      isNaN(newMember.Mobile_phon) ||
      isNaN(newMember.Telephone) ||
      isNaN(newMember.Address.number)
    ) {
      alert("Id,Mobile Phone, Telephone, and Address Number should contain only numbers.");
      setValidation("failed");
      return;
    }

    // בדיקה של פורמט התאריך 
    const isValidPositiveDate = /^(?:\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?)?$/.test(newMember.covid_info.covidPositiveDate);
    const isValidRecoveryDate = /^(?:\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?)?$/.test(newMember.covid_info.covidRecoveryDate);
    // בדיקה של תקינות התאריך - אם אחד מהם לא תקין, תוצג הודעת שגיאה והפונקציה תעצור כאן
    if (!newMember.covid_info.covidPositiveDate) {
      if (!newMember.covid_info.covidRecoveryDate) {
        return;
      }
      alert("It is not possible to enter a date of recovery without a date of illness");
      setValidation("failed");
      return;
    }
    if (!newMember.covid_info.covidRecoveryDate) {
      return;
    }
    // בדיקה של תקינות התאריך - אם אחד מהם לא תקין, תוצג הודעת שגיאה והפונקציה תעצור כאן
    if (!isValidPositiveDate || !isValidRecoveryDate) {
      alert("Please enter valid dates in the format YYYY-MM-DD.");
      setValidation("failed");
      return;
    }
    // const updatedMemberWithVaccinations = {
    //     ...updatedMember,
    //     covid_info: {
    //         ...updatedMember.covid_info,
    //         vaccinations,
    //     },
    // };
  }
  //#endregion

  //#region handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentField, childField] = name.split('.');
      setNewMember((prevState) => ({
        ...prevState,
        [parentField]: {
          ...prevState[parentField],
          [childField]: value,
        },
      }));
    } else {
      setNewMember({ ...newMember, [name]: value });
    }
  };
  //#endregion

  //#region handleAddVaccination
  const handleAddVaccination = () => {
    if (newMember.covid_info.vaccinations.length >= 4) {
      alert('You can only add up to 4 vaccinations.');
      return;
    }

    // Create a new vaccination object with default empty values
    const newVaccination = {
      date: '',
      manufacturer: '',
    };

    // Update newMember state with the added vaccination
    setNewMember({
      ...newMember,
      covid_info: {
        ...newMember.covid_info,
        vaccinations: [...newMember.covid_info.vaccinations, newVaccination],
      },
    });
  };
  //#endregion

  //#region return Fields
  return (
    <div className="CreateMember">
      <h2>Create a New Member</h2>

      {/* Personal details fields */}
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="First_name" value={newMember.First_name} onChange={handleInputChange} />
      <br />

      <label htmlFor="Last_name">Last Name:</label>
      <input type="text" id="Last_name" name="Last_name" value={newMember.Last_name} onChange={handleInputChange} />
      <br />

      <label htmlFor="Id">ID Number:</label>
      <input type="text" id="Id" name="Id" value={newMember.Id} onChange={handleInputChange} />
      <br />

      <label htmlFor="Mobile_phon">Mobile Phone:</label>
      <input type="text" id="Mobile_phon" name="Mobile_phon" value={newMember.Mobile_phon} onChange={handleInputChange} />
      <br />

      <label htmlFor="Telephone">Telephone:</label>
      <input type="text" id="Telephone" name="Telephone" value={newMember.Telephone} onChange={handleInputChange} />
      <br />

      <h2>Address:</h2>
      <label htmlFor="city">City:</label>
      <input type="text" id="city" name="Address.city" value={newMember.Address.city} onChange={handleInputChange} />
      <br />

      <label htmlFor="street">Street:</label>
      <input type="text" id="street" name="Address.street" value={newMember.Address.street} onChange={handleInputChange} />
      <br />

      <label htmlFor="number">Number:</label>
      <input type="text" id="number" name="Address.number" value={newMember.Address.number} onChange={handleInputChange} />
      <br />

      <h2>COVID Information: (Optional)</h2>
      <label htmlFor="positiveDate">Positive Date:</label>
      <input type="text" id="positiveDate" name="covid_info.covidPositiveDate" value={newMember.covid_info.covidPositiveDate} onChange={handleInputChange} />
      <br />

      <label htmlFor="recoveryDate">Recovery Date:</label>
      <input type="text" id="recoveryDate" name="covid_info.covidRecoveryDate" value={newMember.covid_info.covidRecoveryDate} onChange={handleInputChange} />
      <br />

      <h3>Vaccinations: (Optional)</h3>
      {newMember.covid_info.vaccinations.map((vaccination, index) => (
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

      <button onClick={handleAddVaccination}>Add Vaccination</button>

      <button onClick={onSubmitMemberClick}>Submit</button>
    </div>
  );
  //#endregion
}

export default CreateMember;
