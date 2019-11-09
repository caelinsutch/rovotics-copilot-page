export interface RovInterface {
    name: string;
    drive: Drive;
    sensitivity: Sensitivity;
    meeSensors: MEESensors;
    drq1: DRQ;
    drq2: DRQ;
}

export interface Drive {
    horizontal: ThrusterSet,
    vertical: ThrusterSet,
}

export interface ThrusterSet {
    t1: number,
    t2: number,
    t3: number,
    t4: number,
}

export interface Sensitivity {
    x: number;
    y: number;
    z: number;
}

export interface MEESensors {
    depth: number; // Depth of ROV in meters
    pressure: number; // Pressure in atm
    temperature: number; // Temperature in celsius
}

export interface DRQ {
    Vin: number
    Vout: number
    Iout: number
    Pout: number
    tempurature: number
}

export abstract class RovData {
    abstract initializeRosConnection(): boolean;
    abstract initializeRov(): boolean;
}
