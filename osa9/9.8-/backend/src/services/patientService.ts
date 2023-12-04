import patientsData from '../data/patients.ts';
import { NonSensitivePatientEntry, Patient, NewPatientEntry, Gender } from '../types.ts';
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData

const getEntries = (): Patient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, ssn, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
        ssn,
        occupation,
      }));
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
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
