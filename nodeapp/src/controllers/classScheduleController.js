const dataManager = require('../services/dataManagement');

const classSchedule = async (req, res) => {
    const classSchedule = await dataManager.buildClassSchedule();

    console.log('Se generó un horario');
    res.json({
        message: 'Horario generado con éxito',
        classSchedule: classSchedule
    });
}

module.exports = {
    classSchedule
}
