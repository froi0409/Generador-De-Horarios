class Slot {
    
    constructor(startTime, endTime, classroom, classroomCapacity) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.classroom = classroom;
        this.classroomCapacity = classroomCapacity;

        this.sectionLetter = undefined;

        this.courseId = undefined;
        this.courseName = undefined;
        this.semesterNumber = undefined;
        this.career = undefined;
        this.professorId = undefined;
        this.professorFirstName = undefined;
        this.professorLastName = undefined;

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
