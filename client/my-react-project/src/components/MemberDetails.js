import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/MemberDetails.css';


function MemberDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState(null);

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
            } catch (error) {
                console.error('Error fetching member:', error);
            }
        }
        fetchMember();
    }, [id]);

    function onDeleteMemberClick(id) {
        console.log('Deleting member with id:', id);
        async function deleteMember() {
            const response = await fetch(`http://localhost:3000/member/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting member: ${response.status}`);
            }
            console.log('Deleting member with id', id, 'succed');
        }

        deleteMember();
    }

    if (!member) {
        return <div>Loading...</div>;
    }
    const hasCovidInfo = member.covid_info && Object.keys(member.covid_info).length > 0;

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
                <p>Positive Date: {new Date(member.covid_info.covidPositiveDate.$date).toLocaleString()}</p>
            )}

            {hasCovidInfo && member.covid_info && member.covid_info.covidRecoveryDate && (
                <p>Recovery Date: {new Date(member.covid_info.covidRecoveryDate.$date).toLocaleString()}</p>
            )}

            {hasCovidInfo && (
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
                                    {new Date(vaccination.date.$date).toLocaleDateString()} - {vaccination.manufacturer}
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

}

export default MemberDetails;
