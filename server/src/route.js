const express = require('express');
const router = express.Router(); 

const memberService = require('./services/memberService');

// GET /members/:id
// router.get('/members/:id', async (req, res) => {
//     const member = await memberService.getMemberById(req.params.id);
//     res.json(member);
//   });

router.post('/members', async (req, res) => {
    const member = await memberService.testing();
    res.json(member);
});

router.get('/', async (req, res) => {
    const member = await memberService.testing();
    res.json(member);
});

module.exports = router;