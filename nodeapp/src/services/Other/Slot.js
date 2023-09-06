class Slot {
    
    constructor(startTime, endTime, classroom) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.classroom = classroom;

        this.course = undefined;
    }

    print() {
        return `Inicio: ${this.startTime}\nFin: ${this.endTime}\nClase: ${this.classroom}\nCurso: ${this.course}`;
    }
}

module.exports = Slot;
