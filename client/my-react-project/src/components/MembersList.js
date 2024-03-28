import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/MembersList.css';

function MembersList() {
    const [allMembers, setAllMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch('http://localhost:3000/members', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' }
                });
                const json = await response.json();
                setAllMembers(json.slice(0).reverse());
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        }
        fetchMembers();
    }, []);

    const handleAddMember = () => {
        navigate('/createMember'); // Use navigate to redirect to CreateMember
    };

    return (
        <div className='MembersList'>
            <ul>
                {allMembers.map((member) => (
                    <li key={member.Id}>
                        <Link to={`/member/${member.Id}`}>{member.First_name} {member.Last_name}</Link>
                    </li>
                ))}
            </ul>
            <button className='add-member-button' onClick={handleAddMember}>Add a new Member</button>
        </div>
    );
}

export default MembersList;
