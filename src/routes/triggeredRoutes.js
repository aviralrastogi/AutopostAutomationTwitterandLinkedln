const express = require('express');
const router = express.Router();
const { triggerController } = require('../controllers/automationnode');

router.post('/trigger', triggerController);

module.exports = router;
