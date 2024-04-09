const mongoose = require('mongoose');
const express = require('express');
const { Member } = require('./db'); // Import the Member model


//Create Member (POST)
const createMember = async (newMember) => {
  try {
    const member = new Member({
      _id: new mongoose.Types.ObjectId(),
      First_name: newMember.First_name,
      Last_name: newMember.Last_name,
      Id: newMember.Id,
      Mobile_phon: newMember.Mobile_phon,
      Telephone: newMember.Telephone,
      Address: {
        city: newMember.Address.city,
        street: newMember.Address.street,
        number: newMember.Address.number,
      },
      covid_info: {
        covidPositiveDate: newMember.covid_info.covidPositiveDate,
        covidRecoveryDate: newMember.covid_info.covidRecoveryDate,
        vaccinations: newMember.covid_info.vaccinations,
      },
    });
    const createdMember = await member.save();
    return createdMember;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating member');
  }
};

//Read Member by ID (GET) 
const readMember = async (id) => {
  try {
    return await Member.findOne({ Id: id });
  } catch (error) {
    console.error('Error finding member:', error);
    return {}; // Return empty object on error
  }
};

//Read All Members (GET)
const readMembers = async () => {
  return await Member.find();
};

// Update Member (PUT)
const updateMember = async (req) => {
  const { _id, Address, covid_info, ...rest } = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      _id,
      {
        $set: { ...rest },
        $merge: {
          Address,
          covid_info: {
            // Handle potential changes to vaccinations array:
            $set: { ...covid_info.covidPositiveDate, ...covid_info.covidRecoveryDate },
            $addToSet: { vaccinations: { $each: covid_info.vaccinations } }, // Add new vaccinations, preserving existing ones
          },
        },
      },
      { new: true }
    );

    return updatedMember;
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
};

// Delete Member (DELETE)
const deleteMember = async (id) => {
  await Member.deleteOne({ Id: id })
  return { success: true };
};


module.exports = {
  createMember,
  readMember,
  readMembers,
  updateMember,
  deleteMember
};