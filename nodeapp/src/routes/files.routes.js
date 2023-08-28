const Router = require('express');
const multer = require('multer');
const filesController = require('../controllers/filesController');

const router = Router();
// Configuramos el almacenamiento de los archivos con multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ruta en la que recibimos n archivos
router.post('/sendFiles', upload.array('files', 2), filesController.proccessCsvFiles);

module.exports = router;
