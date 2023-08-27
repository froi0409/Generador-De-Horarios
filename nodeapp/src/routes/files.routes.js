const Router = require('express');
const filesController = require('../controllers/filesController');

const router = Router();

router.post('/sendFiles', filesController.proccessCsvFiles);

module.exports = router;
