const mongoose = require('mongoose');
const express = require('express');
const { Member } = require('./db'); // Import the Member model



//Create Member (POST)
const createMember = async (newMember) => {
  let member = new Member();
  member = newMember;
  member.save();
  return readMember(member.id);
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
  // try {
  //   const member = await Member.findById(req.body._id);
  //   if (!member) {
  //     throw new Error("Member not found");
  //   }
  //   await member.update(req.body);
  //   console.log("Member updated successfully");
  // } catch (error) {
  //   console.error(error);
  // }
  // const updatedMember = await Member.updateOne({ _id: req.body._id }, req.body);
  
  try {
    const Member = mongoose.model('Member', memberSchema); // Define model within the function
    const result = await Member.updateOne({ _id: req.body._id }, req.body);
    // ... handle result
  } catch (error) {
    console.error(error);
  }
  
  
  
  // const { ObjectId } = require('mongoose'); // Destructure to get the ObjectId constructor

  // Member.updateOne(
  //   { _id: ObjectId(req.body._id) },  // Use ObjectId constructor
  //   { $set: { First_name: req.body.First_name } },
  //   // { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }  // Optional
  //   // { new: true }                                                     // Optional
  // )
  // .then(result => {
  //   if (result.nModified === 1) {
  //     console.log('Member updated successfully');
  //   } else {
  //     console.log('No changes made to the member record');
  //   }
  // })
  // .catch(error => {
  //   console.error("Error updating member:", error.message);
  // });
  
  

    // טיפול בשגיאה

  
  // return updatedMember;
  
  //  return await Member.updateOne(
  //   { _id: req.body._id },
  //   req.body,
  //   { new: true })
  //   console.log("req.body.",req.body);

  // const result = await Member.findAndModify(
  //   { _id: req.body._id },
  //   { $set: req.body },
  //   { new: true }
  // );
  

    // return updatetdUser;

  // let member = new Member();
  // member.id="12345" 
  // member.First_name = memberData.First_name;
  // member.Last_name = memberData.Last_name;

  // member.save();
  // console.log("member",member);

  // return readMember(member.id);
  // const id=memberData._id;
  // console.log("id",id);
  // console.log("memberData",memberData);

  // return await Member.findByIdAndUpdate(id, { First_name: 'jason bourne' });
  
  // const filter = { First_name: 'efrat' };
  // const update = { Id: 59 };

  // let doc = await Member.findOne({ First_name: 'efrat' });

  // Document changed in MongoDB, but not in Mongoose
  // await Member.updateOne(filter, { First_name: 'Will Riker' });

  // This will update `doc` age to `59`, even though the doc changed.
  // doc.Id = update.Id;
  // await doc.save();
  // const updateMember = new Member({
  //   Id: memberData.Id,
  //   First_name: memberData.First_name,
  //   Last_name: memberData.Last_name
  // });
  // await updateMember.save();

  // let updatetdUser = await Member.updateOne(
  //   { _id: req.body._id },
  //   req.body,
  //   { new: true })
};



// Delete Member (DELETE)
const deleteMember = async (id) => {
  await Member.deleteOne({ Id: id })
  // await Member.findByIdAndDelete(id);
  return { success: true };
};


module.exports = {
  createMember,
  readMember,
  readMembers,
  updateMember,
  deleteMember
};