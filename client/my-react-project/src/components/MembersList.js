import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/MembersList.css';

function MembersList() {
    const [allMembers, setAllMembers] = useState([]);

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

    return (
        <div className='MembersList'>
            <ul>
                {allMembers.map((member) => (
                    <li key={member.Id}>
                        <Link to={`/member/${member.Id}`}>{member.First_name} {member.Last_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MembersList;
