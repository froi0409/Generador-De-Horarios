const Router = require('express');
const classScheduleController = require('../controllers/classScheduleController');

const router = Router();

router.post('/classSchedule', classScheduleController.classSchedule);


module.exports = router;
