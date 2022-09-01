const {sendMessage, getAllMessages} = require('../controllers/messageController');

const router = require('express').Router();

router.post('/sendMessage', sendMessage);
router.post('/getAllMessages', getAllMessages);

module.exports = router;