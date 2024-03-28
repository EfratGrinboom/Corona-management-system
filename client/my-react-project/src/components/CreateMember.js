import React, { useState } from "react";
import '../style/CreateMember.css';

function CreateMember() {
  const [newMember, setNewMember] = useState({
    First_name: "",
    Last_name: "",
    Id: "",
    Mobile_phon: "",
    Telephone: "",
    Addres: {
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

  async function onSubmitMemberClick() {
    if (!validateRequiredFields()) return;

    const response = await fetch(`http://localhost:3000/createMember/`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newMember),
    });

    // Handle response (e.g., show success message or error)
    console.log("Member creation response:", response);
  }

  const validateRequiredFields = () => {
    const requiredFields = [
      "First_name",
      "Last_name",
      "Id",
      "Mobile_phon",
      "Telephone",
      "Addres.city",
      "Addres.street",
      "Addres.number",
    ];

    const missingFields = requiredFields.filter((field) => !newMember[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(", ")}`);
      return false;
    }

    return true; // All required fields filled
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddVaccination = () => {
    if (newMember.covid_info.vaccinations.length >= 4) {
      alert("You can only add up to 4 vaccinations.");
      return;
    }
  
    setNewMember({
      ...newMember,
      covid_info: {
        ...newMember.covid_info,
        vaccinations: [...newMember.covid_info.vaccinations, { date: "", manufacturer: "" }],
      },
    });
  };

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
      <input type="text" id="city" name="Addres.city" value={newMember.Addres.city} onChange={handleInputChange} />
      <br />

      <label htmlFor="street">Street:</label>
      <input type="text" id="street" name="Addres.street" value={newMember.Addres.street} onChange={handleInputChange} />
      <br />

      <label htmlFor="number">Number:</label>
      <input type="text" id="number" name="Addres.number" value={newMember.Addres.number} onChange={handleInputChange} />
      <br />

      <h2>COVID Information: (Optional)</h2>
      <label htmlFor="positiveDate">Positive Date:</label>
      <input type="text" id="positiveDate" name="covid_info.covidPositiveDate" value={newMember.covid_info.covidPositiveDate} onChange={handleInputChange}/>
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
}

export default CreateMember;
