import patientsData from '../data/patients.ts';
import { NonSensitivePatientEntry, Patient } from '../types.ts';

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

export default {
    getEntries,
    getNonSensitiveEntries
}
