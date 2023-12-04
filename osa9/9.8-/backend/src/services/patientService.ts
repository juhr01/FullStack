import patientsData from '../data/patients.ts';
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from '../types.ts';
import { v1 as uuid } from "uuid";

const patients: NonSensitivePatientEntry[] = patientsData as NonSensitivePatientEntry[];

const getEntries = (): Patient[] => {
    return patientsData;
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = ( entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }

    patients.push(newPatientEntry)
    return newPatientEntry
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
}
