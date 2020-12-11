const express = require('express');
const router = express.Router();

const habitController = require('../controllers');

router.get('/', habitController.home);
router.get('/all-habits', habitController.allhabits);
router.get('/delete-habit', habitController.deleteHabit);
router.get('/change-status', habitController.changeStatus);

router.post('/create-habit', habitController.createHabit);

module.exports = router;