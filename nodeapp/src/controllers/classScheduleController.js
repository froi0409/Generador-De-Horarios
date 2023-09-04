const dataManager = require('../services/dataManagement');

const classSchedule = async (req, res) => {
    dataManager.buildClassSchedule();

    res.json({
        message: 'Horario generado con éxito'
    })
}

module.exports = {
    classSchedule
}
