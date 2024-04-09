import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/MemberDetails.css';


function MemberDetails() {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    //#region fetchMember
    useEffect(() => {
        async function fetchMember() {
            try {
                const response = await fetch(`http://localhost:3000/member/${id}`, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' }
                });
                console.error('response:', response); // לצורך בדיקת תגובת השרת
                if (!response.ok) {
                    throw new Error(`Member not found: ${response.status}`);
                }
                const json = await response.json();
                setMember(json);
                console.log("member", member);
            } catch (error) {
                console.error('Error fetching member:', error);
            }
        }
        fetchMember();
    }, [id]);
    //#endregion

    //#region delete member function
    function onDeleteMemberClick(id) {
        console.log('Deleting member with id:', id);
        async function deleteMember() {
            const response = await fetch(`http://localhost:3000/member/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting member: ${response.status}`);
            }
            alert(`Member with id:${id} deleted successfully!`);

            navigate('/members');// Navigate back to members list after successful deleting
        }

        deleteMember();
    }
    //#endregion

    //#region  format date function
    function formatDate(dateString) {
        console.log("dateString", dateString);
        // Initialize a date object
        const date = new Date(dateString);

        // Split the date string on 'T' to separate date and time
        const [datePart] = dateString.split('T');

        // Create a new Date object from the date part
        const dateWithoutTime = new Date(datePart);

        // Get the day, month, and year
        const day = dateWithoutTime.getDate();
        const month = dateWithoutTime.getMonth() + 1; // Months are zero-based
        const year = dateWithoutTime.getFullYear();

        // Return the formatted date
        return `${day}/${month}/${year}`;
    }
    //#endregion

    //#region print member details
    if (!member) {
        return <div>Loading...</div>;
    }
    const hasCovidInfo = member.covid_info && (
        member.covid_info.covidPositiveDate ||
        member.covid_info.covidRecoveryDate ||
        (member.covid_info.vaccinations && member.covid_info.vaccinations.length > 0)
    );

    return (
        <div className="MemberDetails">
            <h1>Name: {member.First_name} {member.Last_name}</h1>
            <h2>ID:</h2> <p>{member.Id}</p>
            <h2>Address:</h2>
            <ul>
                <li>city: {member.Address.city}</li>
                <li>street: {member.Address.street}</li>
                <li>number: {member.Address.number}</li>
            </ul>
            <h2>Mobile_phon:</h2> <p>{member.Mobile_phon}</p>
            <h2>Telephone:</h2> <p>{member.Telephone}</p>
            <br></br>

            {hasCovidInfo && (
                <h2>COVID Information</h2>
            )}

            {hasCovidInfo && member.covid_info && member.covid_info.covidPositiveDate && (
                <p> Positive Date: {formatDate(member.covid_info.covidPositiveDate)}</p>
            )}

            {hasCovidInfo && member.covid_info && member.covid_info.covidRecoveryDate && (
                <p>Recovery Date: {formatDate(member.covid_info.covidRecoveryDate)}</p>
            )}

            {hasCovidInfo && member.covid_info.vaccinations.length > 0 && (
                <div>
                    <h3>Vaccinations</h3>
                    <ul>
                        {member.covid_info.vaccinations.map((vaccination, index) => {
                            const hasBothData = !!vaccination.date && !!vaccination.manufacturer;
                            const hasOnlyOneData = !!vaccination.date || !!vaccination.manufacturer;

                            if (!hasBothData) {
                                return hasOnlyOneData ? (
                                    <li key={index}>Some vaccination details are missing.</li>
                                ) : null;
                            }

                            return (
                                <li key={index}>
                                    {formatDate(vaccination.date)} - {vaccination.manufacturer}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            <div className="buttons">
                <button onClick={() => navigate("/edit-member/" + member.Id, { state: { member } })}>Edit</button>
                <button onClick={() => onDeleteMemberClick(member.Id)}>Delete</button>
            </div>
        </div>
    );
    //#endregion
}
export default MemberDetails;
