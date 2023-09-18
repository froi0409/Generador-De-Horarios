const Router = require('express');
const classScheduleController = require('../controllers/classScheduleController');

const router = Router();

router.get('/classSchedule', classScheduleController.classSchedule);


module.exports = router;
