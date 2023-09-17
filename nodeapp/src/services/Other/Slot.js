class Slot {
    
    constructor(startTime, endTime, classroom) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.classroom = classroom;

        this.courseId = undefined;
        this.courseName = undefined;
        this.professorId = undefined;
        this.professorName = undefined,

        this.warningMessage = undefined;
        this.warningPriority = undefined;
    }

    print() {
        return `Inicio: ${this.startTime}\nFin: ${this.endTime}\nClase: ${this.classroom}\nCurso: ${this.course}`;
    }

    setWarningMessage(warningMessage, warningPriority) {
        this.warningMessage = warningMessage;
        this.warningPriority = warningPriority
    }

    setCourse(course) {
        this.course = course;
    }
}

module.exports = Slot;
