const mongoose = require('mongoose');
const { Member } = require('./db'); // Import the Member model



// const getMemberById = async (id) => {
//   return await Member.findById(id);
// };

const testing = async () => {
  // return "hello world";
  return await Member.find(); 
};




module.exports = {
  // getMemberById,
  testing,
};