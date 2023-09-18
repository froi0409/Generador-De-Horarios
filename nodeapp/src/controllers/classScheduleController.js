const dataManager = require('../services/dataManagement');
const iehCalculator = require('../services/iehManager');

const classSchedule = async (req, res) => {
    let classSchedule = await dataManager.buildClassSchedule();
    classSChedule = await dataManager.verifyColorWarning(classSchedule);
    const IEH = await iehCalculator.getIEH(classSchedule); // Calculamos el IEH

    console.log('Se generó un horario', IEH);
    res.json({
        message: IEH,
        classSchedule: classSchedule
    });
}

module.exports = {
    classSchedule
} 
 