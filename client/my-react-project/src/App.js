import React from "react";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import MembersList from './components/MembersList';
import MemberDetails from './components/MemberDetails';
import CreateMember from './components/CreateMember';
import EditMember from './components/EditMember';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/members" element={<MembersList />} />
        <Route path="/member/:id" element={<MemberDetails />} />
        <Route path="/edit-member/:id" element={<EditMember />} />
        <Route path="/createMember" element={<CreateMember />} />
      </Routes>
    </BrowserRouter>
  );
}
