const express = require('express');
const router = express.Router();
const { Member } = require('./services/db'); 

const memberService = require('./services/memberService');

//Create Member (POST)
router.post('/createMember', async (req, res) => {
    try {
        const newMember = req.body
        const createdMember = await memberService.createMember(newMember);
        res.status(201).json(createdMember); // Created status code
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating member' }); // Internal Server
    }
});

//Read All Members (GET)
router.get('/members', async (req, res) => {
    try {
        const members = await memberService.readMembers();
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading members' }); // Internal Server Error
    }
});

//Read Member by ID (GET)
router.get('/member/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const member = await memberService.readMember(id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' }); // Not Found
        }
        res.json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading member' }); // Internal Server Error
    }
});

// Update Member (PUT)
router.put('/member/:id', async (req, res) => {
    try {  
        const memberData = req.body
        const updatedMember = await memberService.updateMember(req);
        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' }); // Not Found
        }
        res.json(updatedMember);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating member' }); // Internal Server Error
    }
});

// Delete Member (DELETE)
router.delete('/member/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await memberService.deleteMember(id);
        res.status(204).json({ message: 'Member deleted' }); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting member' }); // Internal Server Error
    }
});

module.exports = router;