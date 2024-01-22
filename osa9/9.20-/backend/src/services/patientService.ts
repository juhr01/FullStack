import patientsData from '../data/patients.ts';
import { NonSensitivePatientEntry, Patient, NewPatientEntry, Gender, Entry } from '../types.ts';
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData
//const patients: NonSensitivePatientEntry[] = patientsData as NonSensitivePatientEntry[];

const getEntries = (): Patient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
        ssn,
        occupation,
        entries: entries as Entry[]
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

const findById = (id: string): NonSensitivePatientEntry | undefined => {
    return patients.find(p => p.id === id)
  };

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
    addPatient,
    findById
}
