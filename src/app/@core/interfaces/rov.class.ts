import {Subject} from 'rxjs';

export class Rov {
    name: Subject<String> = new Subject<String>();
    connected: Subject<boolean> = new Subject<boolean>();
    drive: Drive = new Drive();
    sensitivity: Sensitivity = new Sensitivity();
    meeSensors: MEESensors = new MEESensors();
    drq1: DRQ = new DRQ();
    drq2: DRQ = new DRQ();
}

export class Drive {
    horizontal: ThrusterSet;
    vertical: ThrusterSet;
}

export class ThrusterSet {
    constructor() {
        this.t1 = new Subject<number>();
        this.t2 = new Subject<number>();
        this.t3 = new Subject<number>();
        this.t4 = new Subject<number>();
    }
    t1: Subject<number>;
    t2: Subject<number>;
    t3: Subject<number>;
    t4: Subject<number>;
}

export class Sensitivity {
    constructor() {
        this.x = new Subject<number>();
        this.y = new Subject<number>();
        this.z = new Subject<number>();
    }
    x: Subject<number>;
    y: Subject<number>;
    z: Subject<number>;
}

export class MEESensors {
    constructor() {
        this.depth = new Subject<number>();
        this.pressure = new Subject<number>();
        this.temperature = new Subject<number>();
    }
    depth: Subject<number>; // Depth of ROV in meters
    pressure: Subject<number>; // Pressure in atm
    temperature: Subject<number>; // Temperature in celsius
}

export class DRQ {
    constructor() {
        this.Vin = new Subject<number>();
        this.Vout = new Subject<number>();
        this.Iout = new Subject<number>();
        this.Pout = new Subject<number>();
        this.temperature = new Subject<number>();
    }
    Vin: Subject<number>;
    Vout: Subject<number>;
    Iout: Subject<number>;
    Pout: Subject<number>;
    temperature: Subject<number>;
}

export abstract class RovData {
    abstract initializeRosConnection(): boolean;
    abstract initializeRov(): boolean;
}
